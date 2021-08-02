const scene = engine.createScene();

const width = window.innerWidth;
const height = window.innerHeight;


let line1Punt1 = new Circle(new Vector2(Mathf.random(0, width - 10), Mathf.random(0, height - 10)), 10, "blue", true);
let line1Punt2 = new Circle(new Vector2(Mathf.random(0, width - 10), Mathf.random(0, height - 10)), 10, "blue", true);

let line2Punt1 = new Circle(new Vector2(Mathf.random(0, width - 10), Mathf.random(0, height - 10)), 10, "red", true);
let line2Punt2 = new Circle(new Vector2(Mathf.random(0, width - 10), Mathf.random(0, height - 10)), 10, "red", true);

let line3Punt1 = new Circle(new Vector2(Mathf.random(0, width - 10), Mathf.random(0, height - 10)), 10, "green", true);
let line3Punt2 = new Circle(new Vector2(Mathf.random(0, width - 10), Mathf.random(0, height - 10)), 10, "green", true);

let line4Punt1 = new Circle(new Vector2(Mathf.random(0, width - 10), Mathf.random(0, height - 10)), 10, "orange", true);
let line4Punt2 = new Circle(new Vector2(Mathf.random(0, width - 10), Mathf.random(0, height - 10)), 10, "orange", true);

let line5Punt1 = new Circle(new Vector2(Mathf.random(0, width - 10), Mathf.random(0, height - 10)), 10, "purple", true);
let line5Punt2 = new Circle(new Vector2(Mathf.random(0, width - 10), Mathf.random(0, height - 10)), 10, "purple", true);


let line1 = new Line();
let line2 = new Line();
let line3 = new Line();
let line4 = new Line();
let line5 = new Line();

let lines = [line1, line2, line3, line4, line5];

scene.addGameObjects(line1, line2, line3, line4, line5, line1Punt1, line1Punt2, line2Punt1, line2Punt2, line3Punt1, line3Punt2, line4Punt1, line4Punt2, line5Punt1, line5Punt2);

function update() {
    line1.slope = line1.getSlope(line1Punt1.position, line1Punt2.position);
    line2.slope = line1.getSlope(line2Punt1.position, line2Punt2.position);
    line3.slope = line1.getSlope(line3Punt1.position, line3Punt2.position);
    line4.slope = line1.getSlope(line4Punt1.position, line4Punt2.position);
    line5.slope = line1.getSlope(line5Punt1.position, line5Punt2.position);

    line1.intercept = -(line1.slope * line1Punt1.position.x - line1Punt1.position.y);
    line2.intercept = -(line2.slope * line2Punt1.position.x - line2Punt1.position.y);
    line3.intercept = -(line3.slope * line3Punt1.position.x - line3Punt1.position.y);
    line4.intercept = -(line4.slope * line4Punt1.position.x - line4Punt1.position.y);
    line5.intercept = -(line5.slope * line5Punt1.position.x - line5Punt1.position.y);
}

function render() {
    for (let i = 0; i < lines.length; i++) {
        for (let j = lines.length - 1; j > 0; j--) {
            let x = lines[i].lineIntersection(lines[j]).x;
            let y = lines[i].lineIntersection(lines[j]).y;

            scene.context.beginPath();
            scene.context.arc(x, y, 10, 0, 2 * Math.PI);
            scene.context.stroke();
            scene.context.closePath();
        }
    }

}

scene.OnUpdate.AddListener(update);
scene.OnRender.AddListener(render);
