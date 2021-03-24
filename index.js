/*
 *  @Soldy\consolestylerc\2021.02.04\GPL3
 */
'use strict';
const styler = new (require('consolestylerc')).base();


const barrcBase=function(){
    this.init = function(inp){
        return _init(inp);
    }
    this.addLine = function(inp){
        return _addLine(inp);
    }
    this.update = function(inp){
        return _upDate(inp);
    }
    this.draw = function(bar){
        return _draw(bar);
    }
    let _bars = {};
    const _init = function(inp){
        if(typeof inp.name === 'undefined')
            return false;
        if(typeof inp.max === 'undefined')
            inp.max = 10;
        if(typeof inp.lines === 'undefined')
            inp.lines = {};
        _bars[inp.name]={
            size  : 10,
            max   : inp.max,
            lines : inp.lines
        };
        return true;
    };
    const _addLine = function(inp){
        if(
            (typeof inp.bar === 'undefined')||
            (typeof _bars[inp.bar] === 'undefined')||
            (typeof inp.id  === 'undefined')||
            (typeof inp.title === 'undefined')
        )
            return false;
        if(
            (typeof inp.value === 'undefined')||
            (0 > inp.value)||
            (
                (_bars[inp.bar].max !== 'auto')&&
                (inp.value > bars[inp.bar].max)
            )
        )
            inp.value = 0;
        if(typeof inp.color === 'undefined')
            inp.color = 'white';
        if(inp.title.toString().length+2 > _bars[inp.bar].size)
            _bars[inp.bar].size = inp.title.length+2;
        _bars[inp.bar].lines[inp.id] = {
            title:inp.title,
            color:inp.color,
            value:inp.value
        };
        return true;
    };
    const _upDate = function(inp){
        if(
            (typeof _bars[inp.name] === 'undefined')||
            (typeof _bars[inp.name].lines === 'undefined')
        )
            return false;
        for(let i in inp.update){
            if(typeof _bars[inp.name].lines[i] === 'undefined')
                continue;
            _bars[inp.name].lines[i].value = inp.update[i];
        }
        return true;
    };
    const _draw = function(bar){
        if(
            (typeof bar === 'undefined')||
            (typeof _bars[bar] === 'undefined')
        )
            return false;
        let siz = _bars[bar].size,
            out = '',
            max = _bars[bar].max,
            lines = _bars[bar].lines;
        for (let i in lines){
            out += (
                _title(
                    siz,
                    lines[i].title
                )+' \u2502'+
                 _line(
                    lines[i].color,
                    lines[i].value, 
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
            styler.style(
                ('').padStart(
                    siz,
                    '█'
                ),
                [{color}]
            )+styler.style(
                ('').padStart(
                    (35-siz),
                    ' '
                ),
            )
        );
    };
};


exports.base = barrcBase;
