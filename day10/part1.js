const fs = require('fs');

const SIZE = 256;

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    data = data.trim();
    const list = [...Array(SIZE).keys()];
    var [pos, skip, span] = [0, 0, []];
    for(var len of data.split(',')) {
        len = Number(len);
        if(len > SIZE) {
            continue;
        }
        for(var i = pos; i < pos + len; i++) {
            span.push(list[i % SIZE]);
        }
        for(i = pos; i < pos + len; i++) {
            list[i % SIZE] = span.pop();
        }
        pos = (pos + len + skip++) % SIZE;
    }

    console.log(list[0] * list[1]);
});
