const engine = new Engine();

const width = window.innerWidth;
const height = window.innerHeight;



let line1Punt1 = new Circle(new Vector2(Mathf.random(0, width - 10), Mathf.random(0, height - 10)), 10, "blue", true);
let line1Punt2 = new Circle(new Vector2(Mathf.random(0, width - 10), Mathf.random(0, height - 10)), 10, "blue", true);

let line2Punt1 = new Circle(new Vector2(Mathf.random(0, width - 10), Mathf.random(0, height - 10)), 10, "red", true);
let line2Punt2 = new Circle(new Vector2(Mathf.random(0, width - 10), Mathf.random(0, height - 10)), 10, "red", true);

let line3Punt1 = new Circle(new Vector2(Mathf.random(0, width - 10), Mathf.random(0, height - 10)), 10, "green", true);
let line3Punt2 = new Circle(new Vector2(Mathf.random(0, width - 10), Mathf.random(0, height - 10)), 10, "green", true);


let line1 = new LinearFunction(getSlope(line1Punt1.position, line1Punt2.position), 0);
let line2 = new LinearFunction(getSlope(line2Punt1.position, line2Punt2.position), 0);
let line3 = new LinearFunction(getSlope(line3Punt1.position, line3Punt2.position), 0);

const lines = [line1, line2, line3];
const points = [line1Punt1, line1Punt2, line2Punt1, line2Punt2, line3Punt1, line3Punt2];

setInterval(update, 1);
setInterval(update, 1);

function update() {
    engine.context.fillStyle = "rgba(0,0,0,0.9)"
    engine.context.fillRect(0,0,width,height);
    for (let i = 0; i < points.length; i++) {
        points[i].draw(engine.context);
        points[i].update();
    }

    line1.slope = getSlope(line1Punt1.position, line1Punt2.position);
    line2.slope = getSlope(line2Punt1.position, line2Punt2.position);
    line3.slope = getSlope(line3Punt1.position, line3Punt2.position);
    {
        for (let i = 0; i < lines.length; i++) {
            for (let j = lines.length - 1; j > 0; j--) {
                let x = lines[i].lineIntersection(lines[j]).x;
                let y = lines[i].lineIntersection(lines[j]).y;

                engine.context.beginPath();
                engine.context.arc(x, y, 10, 0, 2 * Math.PI);
                engine.context.stroke();
                engine.context.closePath();
            }
        }
    }

    line1.intercept = -(line1.slope * line1Punt1.position.x - line1Punt1.position.y);
    line2.intercept = -(line2.slope * line2Punt1.position.x - line2Punt1.position.y);
    line3.intercept = -(line3.slope * line3Punt1.position.x - line3Punt1.position.y);

    for (let i = 0; i < lines.length; i++) {
        lines[i].draw(engine.context);
    }
}

function getSlope(pos1, pos2) {
    return (pos2.y - pos1.y) / (pos2.x - pos1.x);
}

