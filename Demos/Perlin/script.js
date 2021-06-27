const engine = new Engine();

let simplex = new SimplexNoise();

const width = window.innerWidth;
const height = window.innerHeight;

console.time("duration");
for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        engine.context.beginPath();
        let alpha = simplex.noise(y/20, x/20);
        let r = Math.abs(simplex.noise(y/200, x/200) * 255);
        let g = Math.abs(simplex.noise(y/20, x/20) * 255);
        let b = Math.abs(simplex.noise(y/2, x/20) * 255);
        engine.context.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        engine.context.fillRect(x, y, 1, 1);
        engine.context.fill();
    }
}

console.timeEnd("duration");