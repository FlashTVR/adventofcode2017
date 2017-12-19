const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    const grid = data.split('\n').map((l) => [...l.replace('\r', '')]);
    const pos = { r: 0, c: grid[0].indexOf('|') }, dir = { r: 1, c: 0 }, path = [];
    while(true) {
        if(grid[pos.r][pos.c] === '+') {
            if(dir.r === 0) {
                dir.c = 0;
                dir.r = (grid[pos.r - 1] && grid[pos.r - 1][pos.c] && grid[pos.r - 1][pos.c] !== ' ') ? -1 : 1;
            } else {
                dir.r = 0;
                dir.c = (grid[pos.r][pos.c - 1] && grid[pos.r][pos.c - 1] !== ' ') ? -1 : 1;
            }
        } else if(grid[pos.r][pos.c].match(/[A-Z]/)) {
            path.push(grid[pos.r][pos.c]);
        }
        pos.r += dir.r;
        pos.c += dir.c;
        if(!grid[pos.r] || !grid[pos.r][pos.c] || grid[pos.r][pos.c] === ' ') {
            break;
        }
    }

    console.log(path.join(''));
});
