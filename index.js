/*
 *  @Soldy\consolestylerc\2021.02.04\GPL3
 */
'use strict';
const $stylerc = new (require('consolestylerc')).base();
const $setuprc = (require('setuprc')).base;


const barrcBase=function(settings){
    this.add = function(inp){
        return _add(inp);
    };
    this.update = function(inp){
        return _upDate(inp);
    };
    this.draw = function(){
        return _draw();
    };
    let _bars = [];
    /*
     *  @private
     *  @const {object}
     */
    const _setup = new $setuprc({
        'max':{
            'type'    : 'int',
            'default' : 40
        },
        'autoSize':{
            'type'    : 'bool',
            'default' : true
        },
        'size':{
            'type'    : 'int',
            'default' : 10
        },
    });
    const _add = function(inp){
        if(
            (typeof inp.id  === 'undefined')||
            (typeof inp.title === 'undefined')
        )
            return false;
        if(
            (typeof inp.value === 'undefined')||
            (0 > inp.value)||
            (
                (_setup.get('autoSize'))&&
                (inp.value > _setup.get('max'))
            )
        )
            inp.value = _setup.get('max');
        if(typeof inp.color === 'undefined')
            inp.color = 'white';
        if(inp.title.toString().length+2 > _setup.get('size'))
            _setup.set('size', inp.title.length+2);
        _bars[inp.id] = {
            title:inp.title,
            color:inp.color,
            value:inp.value
        };
        return true;
    };
    const _upDate = function(inp){
        for(let i in inp.update){
            if(typeof _bars[i] === 'undefined')
                continue;
            _bars[i].value = inp.update[i];
        }
        return true;
    };
    const _draw = function(){
        let siz = _setup.get('size'),
            out = '',
            max = _setup.get('max');
        for (let i in _bars){
            out += (
                _title(
                    siz,
                    _bars[i].title
                )+' \u2502'+
                 _line(
                     _bars[i].color,
                     _bars[i].value, 
                     max
                 )+'\n'
            );
        }
        return (out);
    };
    const _title = function(size,title){
        return title.padStart(
            size,
            ' '
        );
    };
    const _line = function(color,size,max){
        const siz = Math.floor(size*(35/max));
        return (
            $stylerc.style(
                ('').padStart(
                    siz,
                    '█'
                ),
                [{
                    'color'      : color,
                    'background' : color
                }]
            )+$stylerc.style(
                ('').padStart(
                    (35-siz),
                    ' '
                ),
            )
        );
    };
    if ( typeof settings !== 'undefined' )
        _setup.setup(settings);
};


exports.base = barrcBase;
