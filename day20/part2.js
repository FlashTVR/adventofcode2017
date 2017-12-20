const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    let particles = data.split('\n').map((l, i) => {
        const [ , px, py, pz, vx, vy, vz, ax, ay, az] = l.match(/p=<(.+),(.+),(.+)>, v=<(.+),(.+),(.+)>, a=<(.+),(.+),(.+)>/).map(Number);
        return {
            id: i,
            p: { x: px, y: py, z: pz },
            v: { x: vx, y: vy, z: vz },
            a: { x: ax, y: ay, z: az },
        };
    });
    const collide = (a, b) => a.p.x === b.p.x && a.p.y === b.p.y && a.p.z === b.p.z;
    const remove = new Set();
    const filter = (e) => !remove.has(e.id);

    for(let i = 0; i < 1000; i++) {
        for(const particle of particles) {
            particle.v.x += particle.a.x;
            particle.v.y += particle.a.y;
            particle.v.z += particle.a.z;
            particle.p.x += particle.v.x;
            particle.p.y += particle.v.y;
            particle.p.z += particle.v.z;
        }
        remove.clear();
        for(let j = 0; j < particles.length - 1; j++) {
            for(let k = j + 1; k < particles.length; k++) {
                if(collide(particles[j], particles[k])) {
                    remove.add(particles[j].id).add(particles[k].id);
                }
            }
        }
        particles = particles.filter(filter);
    }

    console.log(particles.length);
});
