const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    const checkInt = Number(data.split('\n')[1].split(' ')[5]);

    let state = 'A', pos = 0;
    const tape = new Map();
    const ops = {
        A: [
            () => {
                tape.set(pos++, 1);
                state = 'B';
            },
            () => {
                tape.set(pos--, 0);
                state = 'C';
            },
        ],
        B: [
            () => {
                tape.set(pos--, 1);
                state = 'A';
            },
            () => {
                tape.set(pos--, 1);
                state = 'D';
            },
        ],
        C: [
            () => {
                tape.set(pos++, 1);
                state = 'D';
            },
            () => {
                tape.set(pos++, 0);
                state = 'C';
            },
        ],
        D: [
            () => {
                tape.set(pos--, 0);
                state = 'B';
            },
            () => {
                tape.set(pos++, 0);
                state = 'E';
            },
        ],
        E: [
            () => {
                tape.set(pos++, 1);
                state = 'C';
            },
            () => {
                tape.set(pos--, 1);
                state = 'F';
            },
        ],
        F: [
            () => {
                tape.set(pos--, 1);
                state = 'E';
            },
            () => {
                tape.set(pos++, 1);
                state = 'A';
            },
        ],
    };

    for(let i = 0; i < checkInt; i++) {
        ops[state][tape.get(pos) || 0]();
    }

    console.log([...tape.values()].reduce((a, b) => a + b));
});
