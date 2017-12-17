const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    const steps = Number(data);
    const slock = [0];
    let pos = 0;
    for(let i = 1; i <= 2017; i++) {
        pos = ((pos + steps) % slock.length) + 1;
        slock.splice(pos, 0, i);
    }

    console.log(slock[(pos + 1) % slock.length]);
});
