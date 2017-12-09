const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    data = data.trim();
    data = [...data];
    var [inGarbage, total] = [false, 0];
    for(var i = 0; i < data.length; i++) {
        if(data[i] === '!') {
            i++;
            continue;
        }
        if(data[i] === '<' && !inGarbage) {
            inGarbage = true;
            continue;
        }
        if(data[i] === '>') {
            inGarbage = false;
            continue;
        }
        if(inGarbage) {
            total++;
        }
    }

    console.log(total);
});
