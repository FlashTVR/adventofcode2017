const fs = require('fs');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    const particles = data.split('\n').map((l, i) => {
        const [ , px, py, pz, vx, vy, vz, ax, ay, az] = l.match(/p=<(.+),(.+),(.+)>, v=<(.+),(.+),(.+)>, a=<(.+),(.+),(.+)>/).map(Number);
        return {
            id: i,
            p: { x: px, y: py, z: pz },
            v: { x: vx, y: vy, z: vz },
            a: { x: ax, y: ay, z: az },
        };
    });

    for(let i = 0; i < 1000; i++) {
        for(const particle of particles) {
            particle.v.x += particle.a.x;
            particle.v.y += particle.a.y;
            particle.v.z += particle.a.z;
            particle.p.x += particle.v.x;
            particle.p.y += particle.v.y;
            particle.p.z += particle.v.z;
        }
    }

    const dist = (o) => Math.abs(o.x) + Math.abs(o.y) + Math.abs(o.z);
    particles.sort((a, b) => dist(a.p) - dist(b.p));

    console.log(particles[0].id);
});
