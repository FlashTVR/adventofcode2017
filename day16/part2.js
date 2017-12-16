const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    data = data.trim();
    let programs = [...'abcdefghijklmnop'];
    const permutations = [programs.join('')];
    let offset = -1;
    while(offset === -1) {
        for(const move of data.split(',')) {
            const [type, a, b] = parseMove(move, programs);
            if(type === 's') {
                programs = programs.slice(-a).concat(programs.slice(0, programs.length - a));
            } else {
                [programs[a], programs[b]] = [programs[b], programs[a]];
            }
        }

        const result = programs.join('');
        offset = permutations.indexOf(result);
        if(offset === -1) {
            permutations.push(result);
        }
    }

    const end = permutations.slice(offset)[(1000000000 - offset) % permutations.length];

    console.log(end);
});

function parseMove(move, programs) {
    const type = move.charAt(0);
    if(type === 's') {
        return [type, Number(move.substr(1))];
    } else {
        let [a, b] = move.substr(1).split('/');
        [a, b] = (type === 'x') ? [a, b].map(Number) : [a, b].map((x) => programs.indexOf(x));
        return [type, a, b];
    }
}
