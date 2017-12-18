const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    const instructions = data.split('\n').map((x) => x.trim().split(' '));
    const machines = [
        {
            id: 0,
            registers: { p: 0 },
            offset: 0,
            queue: [],
            count: 0,
            await: false,
            active: true,
        },
        {
            id: 1,
            registers: { p: 1 },
            offset: 0,
            queue: [],
            count: 0,
            await: false,
            active: true,
        },
    ];
    const active = (e) => e.active;
    const deadlock = (e) => e.await;

    while(!machines.every(deadlock) && machines.some(active)) {
        for(const machine of machines) {
            while(machine.active && !machine.await) {
                const [op, a, b] = instructions[machine.offset];
                switch(op) {
                    case 'snd':
                        const target = (machine.id + 1) % machines.length;
                        machines[target].queue.push(getValue(a, machine.registers));
                        machines[target].await = false;
                        machine.count++;
                    break;
                    case 'set':
                        machine.registers[a] = getValue(b, machine.registers);
                    break;
                    case 'add':
                        machine.registers[a] = getValue(a, machine.registers) + getValue(b, machine.registers);
                    break;
                    case 'mul':
                        machine.registers[a] = getValue(a, machine.registers) * getValue(b, machine.registers);
                    break;
                    case 'mod':
                        machine.registers[a] = getValue(a, machine.registers) % getValue(b, machine.registers);
                    break;
                    case 'rcv':
                        if(!machine.queue.length) {
                            machine.await = true;
                            machine.offset--;
                        } else {
                            machine.registers[a] = machine.queue.shift();
                        }
                    break;
                    case 'jgz':
                        if(getValue(a, machine.registers) > 0) {
                            machine.offset += getValue(b, machine.registers) - 1;
                        }
                    break;
                }
                machine.offset++;
                machine.active = machine.offset >= 0 && machine.offset < instructions.length;
            }
        }
    }

    console.log(machines[1].count);
});

function getValue(value, registers) {
    if(value.match(/[a-z]/)) {
        return registers[value] || 0;
    }
    return Number(value);
}
