const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    data = data.trim();
    const registers = {};
    const ops = {
        '==': (a, b) => a === b,
        '!=': (a, b) => a !== b,
        '<': (a, b) => a < b,
        '>': (a, b) => a > b,
        '<=': (a, b) => a <= b,
        '>=': (a, b) => a >= b,
    };
    data.split('\n').forEach((line) => {
        var [r, inst, delta, , treg, top, tval] = line.trim().split(' ');
        delta = (inst === 'inc') ? Number(delta) : -Number(delta);
        if(ops[top](getValue(treg, registers), Number(tval))) {
            registers[r] = getValue(r, registers) + delta;
        }
    });

    var largest = 0;
    for(const r in registers) {
        largest = Math.max(largest, registers[r]);
    }
    console.log(largest);
});

function getValue(register, registers) {
    return (registers[register] === undefined) ? 0 : registers[register];
}
