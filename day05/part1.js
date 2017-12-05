const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    data = data.trim();
    data = data.split('\n').map(Number);
    var count = 0;
    var offset = 0;
    while(offset >= 0 && offset < data.length) {
        offset += data[offset]++;
        count++;
    }

    console.log(count);
});
