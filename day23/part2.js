let b = 79, h = 0;

b = b * 100 + 100000;
for(let i = b; i <= b + 17000; i += 17) {
    for(let j = 2; j < i; j++) {
        if(i % j === 0) {
            h++;
            break;
        }
    }
}

console.log(h);
