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

    let groups = 0;
    const stack = [];
    while(nodes.size) {
        stack.push(nodes.keys().next().value);
        while(stack.length) {
            const current = stack.pop();
            const recipients = nodes.get(current);
            if(!recipients) {
                continue;
            }
            for(const recipient of recipients) {
                stack.push(recipient);
            }
            nodes.delete(current);
        }
        groups++;
    }

    console.log(groups);
});
