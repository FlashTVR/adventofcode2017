const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    data = data.trim();
    const disks = new Set();
    const branches = new Set();
    data.split('\n').forEach((line) => {
        const parts = line.split(' -> ');
        disks.add(parts[0].split(' ')[0].trim());
        if(parts.length > 1) {
            parts[1].split(',').map((x) => branches.add(x.trim()));
        }
    });

    branches.forEach((x) => disks.delete(x));

    console.log(disks.values().next().value);
});
