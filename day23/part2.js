const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    const b = Number(data.split('\n')[0].split(' ')[2]) * 100 + 100000;

    let h = 0;
    for(let i = b; i <= b + 17000; i += 17) {
        for(let j = 2; j < i; j++) {
            if(i % j === 0) {
                h++;
                break;
            }
        }
    }

    console.log(h);
});
