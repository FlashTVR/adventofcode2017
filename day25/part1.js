const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    data = data.trim().replace(/\r/g, '').split('\n\n');
    const init = data.shift().split('\n');

    const ops = {};
    while(data.length) {
        const block = data.shift().split('\n');
        const blockState = block.shift().match(/In state ([A-Z]):/)[1];
        ops[blockState] = [];
        while(block.length) {
            const idx = Number(block.shift().trim().match(/If the current value is ([0-9]+):/)[1]);
            const write = Number(block.shift().trim().match(/- Write the value ([0-9]+)\./)[1]);
            const move = (block.shift().trim().match(/- Move one slot to the (right|left)\./)[1] === 'right') ? 1 : -1;
            const next = block.shift().trim().match(/- Continue with state ([A-Z])\./)[1];
            ops[blockState][idx] = ((write, move, next) => {
                return (tape, pos) => {
                    tape.set(pos, write);
                    return [pos + move, next];
                };
            })(write, move, next);
        }
    }

    const tape = new Map();
    let pos = 0, state = init[0].match(/Begin in state ([A-Z])\./)[1];
    const check = Number(init[1].match(/Perform a diagnostic checksum after ([0-9]+) steps\./)[1]);
    for(let i = 0; i < check; i++) {
        [pos, state] = ops[state][tape.get(pos) || 0](tape, pos);
    }

    console.log([...tape.values()].reduce((a, b) => a + b));
});
