const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    let [a, b] = data.split('\n').map((x) => Number(x.split(' ').pop()));
    const fa = 16807, fb = 48271, d = 2147483647, ma = 4, mb = 8;
    const mask = (1 << 16) - 1;
    let matches = 0;
    for(let i = 0; i < 5000000; i++) {
        do {
            a = (a * fa) % d;
        } while(a % ma !== 0);
        do {
            b = (b * fb) % d;
        } while(b % mb !== 0);
        if((a & mask) === (b & mask)) {
            matches++;
        }
    }

    console.log(matches);
});
