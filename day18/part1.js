const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    data = data.trim();
    const instructions = data.split('\n').map((x) => x.trim().split(' '));
    const registers = {};
    let offset = 0, last = 0;
    while(offset >= 0 && offset < instructions.length) {
        const [op, a, b] = instructions[offset];
        switch(op) {
            case 'snd':
                last = getValue(a, registers);
            break;
            case 'set':
                registers[a] = getValue(b, registers);
            break;
            case 'add':
                registers[a] = getValue(a, registers) + getValue(b, registers);
            break;
            case 'mul':
                registers[a] = getValue(a, registers) * getValue(b, registers);
            break;
            case 'mod':
                registers[a] = getValue(a, registers) % getValue(b, registers);
            break;
            case 'rcv':
                if(getValue(a, registers) !== 0) {
                    console.log(last);
                    offset = -2;
                }
            break;
            case 'jgz':
                if(getValue(a, registers) > 0) {
                    offset += getValue(b, registers) - 1;
                }
            break;
        }
        offset++;
    }
});

function getValue(value, registers) {
    if(value.match(/[a-z]/)) {
        return registers[value] || 0;
    }
    return Number(value);
}
