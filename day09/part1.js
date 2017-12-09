const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    data = data.trim();
    data = [...data];
    var [inGarbage, score, total] = [false, 0, 0];
    for(var i = 0; i < data.length; i++) {
        if(data[i] === '!') {
            i++;
            continue;
        }
        if(data[i] === '<') {
            inGarbage = true;
            continue;
        }
        if(data[i] === '>') {
            inGarbage = false;
            continue;
        }
        if(inGarbage) {
            continue;
        }
        if(data[i] === '{') {
            score++;
        } else if(data[i] === '}') {
            total += score--;
        }
    }

    console.log(total);
});
