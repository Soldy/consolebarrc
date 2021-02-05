# consolebarrc

## init

```javascript

const bar = new (require('consolebarrc')).base()

```


## add line / bar 

```javascript
bar.addLine({
    'bar'   : 'bar name',
    'id'    : 'id',
    'title' : 'bar title',
    'color' : 'bar color'
    }
);
```


## update

```javascript
bar.update({
    'name'   : 'bar name',
    'update' : {
        'id' : size // integer
    }
});

```


## draw

```javascript
bar.draw('bar name');

```
