const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    const ends = [], nodes = [[0, 0]];
    data.trim().split('\n').forEach((l, i) => {
        const parts = l.split('/').map(Number);
        nodes.push(parts);
        parts.forEach((e) => {
            ends[e] = ends[e] || new Set();
            ends[e].add(i + 1);
        });
    });

    console.log(search(ends, nodes, new Set(), 0, 0, 0));
});

function search(ends, nodes, used, current, end, strength) {
    const used2 = new Set(used).add(current);
    const next = nodes[current][(nodes[current].indexOf(end) + 1) % 2];
    let max = strength;
    for(const e of ends[next]) {
        if(used2.has(e)) {
            continue;
        }
        max = Math.max(max, search(ends, nodes, used2, e, next, strength + nodes[e][0] + nodes[e][1]));
    }
    return max;
}
