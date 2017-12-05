const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    data = data.trim();
    var sum = 0;
    for (var i = 0; i < data.length; i++) {
        var next = (i === data.length - 1) ? 0 : i + 1;
        if (data.charAt(i) === data.charAt(next)) {
            sum += Number(data.charAt(i));
        }
    }

    console.log(sum);
});
