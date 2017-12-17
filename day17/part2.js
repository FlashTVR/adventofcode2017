const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    const steps = Number(data);
    let pos = 0, len = 1, value = 0;
    for(let i = 1; i <= 50000000; i++) {
        pos = ((pos + steps) % len++) + 1;
        if(pos === 1) {
            value = i;
        }
    }

    console.log(value);
});
