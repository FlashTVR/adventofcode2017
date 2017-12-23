const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    const instructions = data.trim().split('\n').map((x) => x.trim().split(' '));
    const registers = {};
    let offset = 0, count = 0;
    while(offset >= 0 && offset < instructions.length) {
        const [op, a, b] = instructions[offset];
        switch(op) {
            case 'set':
                registers[a] = getValue(b, registers);
            break;
            case 'sub':
                registers[a] = getValue(a, registers) - getValue(b, registers);
            break;
            case 'mul':
                registers[a] = getValue(a, registers) * getValue(b, registers);
                count++;
            break;
            case 'jnz':
                if(getValue(a, registers) !== 0) {
                    offset += getValue(b, registers) - 1;
                }
            break;
        }
        offset++;
    }

    console.log(count);
});

function getValue(value, registers) {
    if(value.match(/[a-z]/)) {
        return registers[value] || 0;
    }
    return Number(value);
}
