const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    const grid = data.trim().split('\n').map((l) => [...l.trim()].map((c) => c === '#'));
    const dirs = [
        { r: -1, c: 0 },
        { r: 0, c: 1 },
        { r: 1, c: 0 },
        { r: 0, c: -1 },
    ];
    const pos = { r: Math.floor(grid.length / 2), c: Math.floor(grid[0].length / 2) };
    let dir = 0, count = 0;
    for(let i = 0; i < 10000; i++) {
        if(grid[pos.r][pos.c]) {
            dir = (dir + 1) % 4;
            grid[pos.r][pos.c] = false;
        } else {
            dir = (dir === 0) ? 3 : dir - 1;
            grid[pos.r][pos.c] = true;
            count++;
        }
        pos.r += dirs[dir].r;
        pos.c += dirs[dir].c;
        if(!grid[pos.r]) {
            grid[pos.r] = [];
        }
    }

    console.log(count);
});
