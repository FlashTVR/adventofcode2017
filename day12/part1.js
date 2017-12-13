const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    data = data.trim();
    const nodes = new Map();
    for(const line of data.split('\n')) {
        let [node, recipients] = line.split('<->');
        node = Number(node);
        recipients = recipients.split(',').map(Number);
        if(!nodes.has(node)) {
            nodes.set(node, new Set());
        }
        for(const recipient of recipients) {
            if(!nodes.has(recipient)) {
                nodes.set(recipient, new Set());
            }
            nodes.get(node).add(recipient);
            nodes.get(recipient).add(node);
        }
    }

    const visited = new Set();
    const stack = [0];
    while(stack.length) {
        const current = stack.pop();
        visited.add(current);
        for(const recipient of nodes.get(current)) {
            if(visited.has(recipient)) {
                continue;
            }
            stack.push(recipient);
        }
    }

    console.log(visited.size);
});
