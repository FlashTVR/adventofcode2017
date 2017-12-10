const fs = require('fs');

const SIZE = 256;

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    data = data.trim();
    const list = [...Array(SIZE).keys()];
    let pos = 0, skip = 0, span = [];
    for(let len of data.split(',')) {
        len = Number(len);
        if(len > SIZE) {
            continue;
        }
        for(let i = pos; i < pos + len; i++) {
            span.push(list[i % SIZE]);
        }
        for(let i = pos; i < pos + len; i++) {
            list[i % SIZE] = span.pop();
        }
        pos = (pos + len + skip++) % SIZE;
    }

    console.log(list[0] * list[1]);
});
