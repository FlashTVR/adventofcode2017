const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    data = data.trim();
    let count = 0;
    for(let i = 0; i < 128; i++) {
        count += hash(data + '-' + i).replace(/0+/g, '').length;
    }

    console.log(count);
});

function hash(input) {
    const SIZE = 256;
    const data = [...input].map((c) => c.charCodeAt(0)).concat(17, 31, 73, 47, 23);
    const list = [...Array(SIZE).keys()];
    let pos = 0, skip = 0, span = [];
    for (let i = 0; i < 64; i++) {
        for (const len of data) {
            if(len > SIZE) {
                continue;
            }
            for(let j = pos; j < pos + len; j++) {
                span.push(list[j % SIZE]);
            }
            for(let j = pos; j < pos + len; j++) {
                list[j % SIZE] = span.pop();
            }
            pos = (pos + len + skip++) % SIZE;
        }
    }

    const result = [];
    for(let i = 0; i < SIZE; i += 16) {
        result.push(('0000000' + list.slice(i, i + 16).reduce((a, b) => a ^ b).toString(2)).substr(-8));
    }

    return result.join('');
}
