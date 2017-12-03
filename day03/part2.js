const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    data = parseInt(data);
    var x, y, matrix;
    x = y = 0;
    matrix = {};
    matrix[x + ',' + y] = 1;
    while(true) {
        var val = getValue(matrix, x, y);
        if (val >= data) {
            console.log(val);
            break;
        }
        matrix[x + ',' + y] = val;

        if ((x !== y || x >= 0) && Math.abs(x) <= Math.abs(y)) {
            x += y >= 0 ? 1 : -1;
        } else {
            y += x >= 0 ? -1 : 1;
        }
    }
});

function getValue(matrix, posX, posY) {
    var sum = 0;
    for (var x = posX - 1; x <= posX + 1; x++) {
        for(var y = posY - 1; y <= posY + 1; y++) {
            if (matrix[x + ',' + y]) {
                sum += matrix[x + ',' + y];
            }
        }
    }
    return sum;
}
