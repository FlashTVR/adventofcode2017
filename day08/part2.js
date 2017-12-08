const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    data = data.trim();
    const registers = {};
    var largest = 0;
    data.split('\n').forEach((line) => {
        const inst = line.trim().split(' ');
        if(eval(getValue(inst[4], registers) + inst[5] + inst[6])) {
            var delta = Number(inst[2]);
            if(inst[1] === 'dec') {
                delta = -delta;
            }
            registers[inst[0]] = getValue(inst[0], registers) + delta;
            largest = Math.max(largest, registers[inst[0]]);
        }
    });

    console.log(largest);
});

function getValue(register, registers) {
    return (registers[register] === undefined) ? 0 : registers[register];
}
