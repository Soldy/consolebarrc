const bar = new (require('./index.js')).base();
const stdio = new (require('consolestdiorc')).base();
const waittime = 10; // sec
const w = waittime * 1000;

bar.init({
   'name':'testbar',
   'max' : 40
})
bar.addLine({
    'bar'   : 'testbar',
    'id'    : '1',
    'title'  : 'test bar blue',
    'color' : 'blue'
    }
);
bar.addLine({
    'bar'   : 'testbar',
    'id'    : '2',
    'title' : 'test bar green',
    'color' : 'green'
    }
);
bar.addLine({
    'bar'   : 'testbar',
    'id'    : '3',
    'title' : 'test bar red',
    'color' : 'red'
    }
);
stdio.cursorHide();
let randomBarI = 0;
function randomBar(){
    bar.update({
        'name'   : 'testbar',
        'update' : {
            '1' : Math.floor(Math.random()*40),
            '2' : Math.floor(Math.random()*40),
            '3' : Math.floor(Math.random()*40)
        }});
    stdio.clear();
    stdio.cursorUp(3);
    stdio.print(
         bar.draw('testbar')
    );
    randomBarI++;
    if(randomBarI > 2000){
        stdio.cursorShow();
        process.exit(1);
    }
    setTimeout(function(){
       randomBar();
    },10)
}
randomBar();
