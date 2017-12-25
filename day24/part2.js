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

    const longest = { longest: 0, strength: 0 };
    search(ends, nodes, new Set(), 0, 0, 0, longest);
    console.log(longest.strength);
});

function search(ends, nodes, used, current, end, strength, longest) {
    const used2 = new Set(used).add(current);
    const next = nodes[current][(nodes[current].indexOf(end) + 1) % 2];
    if(used2.size >= longest.longest) {
        longest.strength = Math.max(longest.strength, strength);
    }
    longest.longest = Math.max(longest.longest, used2.size);
    for(const e of ends[next]) {
        if(used2.has(e)) {
            continue;
        }
        search(ends, nodes, used2, e, next, strength + nodes[e][0] + nodes[e][1], longest);
    }
}
