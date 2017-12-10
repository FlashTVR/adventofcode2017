const fs = require('fs');

const SIZE = 256;

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    data = data.trim();
    const list = [...Array(SIZE).fill(0, 0, SIZE - 1).keys()];
    var [pos, skip, span] = [0, 0, []];
    data.split(',').forEach((len) => {
        len = Number(len);
        if(len > SIZE) {
            return;
        }
        for(var i = pos; i < pos + len; i++) {
            span.push(list[i % SIZE]);
        }
        for(i = pos; i < pos + len; i++) {
            list[i % SIZE] = span.pop();
        }
        pos = (pos + len + skip++) % SIZE;
    });

    console.log(list[0] * list[1]);
});
