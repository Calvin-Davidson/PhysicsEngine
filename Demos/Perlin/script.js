const scene = engine.createScene();
const cellSize = 16;

let simplex = new SimplexNoise();

const width = window.innerWidth;
const height = window.innerHeight;


let t = 0;

scene.OnRender.AddListener(function() {
    t += 0.1;
    for (let y = 0; y < height/cellSize; y++) {
        for (let x = 0; x < width/cellSize; x++) {
            scene.context.beginPath();

            let pX = x + t;
            let pY = y + t;

            let alpha = simplex.noise(pY/20, pX/20);
            let r = Math.abs(simplex.noise(pY/200, pX/200) * 255);
            let g = Math.abs(simplex.noise(pY/20, pX/20) * 255);
            let b = Math.abs(simplex.noise(pY/2, pX/20) * 255);
            scene.context.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            scene.context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            scene.context.fill();
        }
    }
});