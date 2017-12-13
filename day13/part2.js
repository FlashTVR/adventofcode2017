const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    data = data.trim();
    const layers = [];
    for(const line of data.split('\n')) {
        const [d, r] = line.split(':').map(Number);
        layers[d] =  r;
    }

    let delay = 0, searching = true;
    while(searching) {
        searching = false;
        for(let i = 0; i < layers.length; i++) {
            if(layers[i] === undefined) {
                continue;
            }
            if((i + delay) % ((layers[i] - 1) * 2) === 0) {
                searching = true;
                delay++;
                break;
            }
        }
    }

    console.log(delay);
});
