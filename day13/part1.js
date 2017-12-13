const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    data = data.trim();
    const layers = [];
    for(const line of data.split('\n')) {
        const [d, r] = line.split(':').map(Number);
        layers[d] =  r;
    }

    let severity = 0;
    for(let i = 0; i < layers.length; i++) {
        if(layers[i] === undefined) {
            continue;
        }
        if(i % ((layers[i] - 1) * 2) === 0) {
            severity += layers[i] * i;
        }
    }

    console.log(severity);
});
