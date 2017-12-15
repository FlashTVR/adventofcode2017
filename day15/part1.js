const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    let [a, b] = data.split('\n').map((x) => Number(x.split(' ').pop()));
    const fa = 16807, fb = 48271, d = 2147483647;
    const mask = (1 << 16) - 1;
    let matches = 0;
    for(let i = 0; i < 40000000; i++) {
        a = (a * fa) % d;
        b = (b * fb) % d;
        if((a & mask) === (b & mask)) {
            matches++;
        }
    }

    console.log(matches);
});
