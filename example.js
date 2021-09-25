const $bar = new (require('./index.js')).base({
   'name':'testbar',
   'max' : 40
});
const $stdio = new (require('consolestdiorc')).base();
const _wait_time = 10; // sec
const _w = _wait_time * 1000;

$bar.add({
    'id'    : '1',
    'title'  : 'test bar blue',
    'color' : 'blue'
    }
);
$bar.add({
    'id'    : '2',
    'title' : 'test bar green',
    'color' : 'green'
    }
);
$bar.add({
    'id'    : '3',
    'title' : 'test bar red',
    'color' : 'red'
    }
);
$stdio.cursorHide();
let _randomBarI = 0;

function randomBar(){
    $bar.update({
        'name'   : 'testbar',
        'update' : {
            '1' : Math.floor(Math.random()*40),
            '2' : Math.floor(Math.random()*40),
            '3' : Math.floor(Math.random()*40)
        }});
    $stdio.clear();
    $stdio.cursorUp(3);
    $stdio.print(
         $bar.draw()
    );
    _randomBarI++;
    if(_randomBarI > 100){
        $stdio.cursorShow();
        process.exit(0);
    }
    setTimeout(randomBar,100)
}
randomBar();
