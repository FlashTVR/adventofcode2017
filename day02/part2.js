const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    data = data.trim();
    var sum = 0;
    data.split('\n').forEach((line) => {
        line = line.trim();
        var cols = line.split(/\s+/).map(Number);
        cols.sort((a, b) => a - b);
        for (var i = cols.length - 1; i > 0; i--) {
            for (var j = i - 1; j >= 0; j--) {
                if (cols[i] % cols[j] === 0) {
                    sum += cols[i] / cols[j];
                    i = j = -1;
                }
            }
        }
    });

    console.log(sum);
});
