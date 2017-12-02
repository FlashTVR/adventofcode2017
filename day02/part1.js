const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    data = data.trim();
    var sum = 0;
    data.split('\n').forEach((line) => {
        line = line.trim();
        var min = Infinity;
        var max = 0;
        line.split(/\s+/).forEach((col) => {
            min = Math.min(min, col);
            max = Math.max(max, col);
        });
        sum += max - min;
    });

    console.log(sum);
});
