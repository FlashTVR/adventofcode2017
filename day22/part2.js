const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    const grid = data.trim().split('\n').map((l) => [...l.trim()].map((c) => (c === '#') ? 1 : 0));
    const dirs = [
        { r: -1, c: 0 },
        { r: 0, c: 1 },
        { r: 1, c: 0 },
        { r: 0, c: -1 },
    ];
    const pos = { r: Math.floor(grid.length / 2), c: Math.floor(grid[0].length / 2) };
    let dir = 0, count = 0;
    const ops = [
        () => {
            grid[pos.r][pos.c] = 2;
            dir = (dir === 0) ? 3 : dir - 1;
        },
        () => {
            grid[pos.r][pos.c] = 3;
            dir = (dir + 1) % 4;
        },
        () => {
            grid[pos.r][pos.c] = 1;
            count++;
        },
        () => {
            grid[pos.r][pos.c] = 0;
            dir = (dir + 2) % 4;
        },
    ];
    for(let i = 0; i < 10000000; i++) {
        ops[grid[pos.r][pos.c] || 0]();
        pos.r += dirs[dir].r;
        pos.c += dirs[dir].c;
        if(!grid[pos.r]) {
            grid[pos.r] = [];
        }
    }

    console.log(count);
});
