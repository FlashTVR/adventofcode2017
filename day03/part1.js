const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    data = parseInt(data);
    var size = Math.ceil(Math.sqrt(data));
    var center = Math.ceil((size - 1) / 2);
    console.log(Math.max(0, center - 1 + Math.abs(center - data % size)));
});
