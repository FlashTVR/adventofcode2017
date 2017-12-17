const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    const steps = Number(data);
    let pos = 0, value = 0;
    for(let i = 1; i <= 50000000; i++) {
        pos = ((pos + steps) % i) + 1;
        if(pos === 1) {
            value = i;
        }
    }

    console.log(value);
});
