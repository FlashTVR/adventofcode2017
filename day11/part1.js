const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    data = data.trim();
    const dirs = {
        n: [0, 1, -1],
        ne: [1, 0, -1],
        se: [1, -1, 0],
        s: [0, -1, 1],
        sw: [-1, 0, 1],
        nw: [-1, 1, 0],
    };
    const childPos = [0, 0, 0];
    for(const step of data.split(',')) {
        childPos[0] += dirs[step][0];
        childPos[1] += dirs[step][1];
        childPos[2] += dirs[step][2];
    }

    console.log(Math.max(...childPos.map(Math.abs)));
});
