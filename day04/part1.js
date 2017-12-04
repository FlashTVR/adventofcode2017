const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    data = data.trim();
    var invalid = 0;
    var lines = data.split('\n');
    lines.forEach((line) => {
        line = line.trim();
        var words = line.split(' ');
        words.sort();
        for (var i = words.length - 1; i > 0; i--) {
            if (words[i] === words[i - 1]) {
                invalid++;
                break;
            }
        }
    });

    console.log(lines.length - invalid);
});
