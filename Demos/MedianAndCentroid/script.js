const scene = engine.createScene();

let width = window.innerWidth;
let height = window.innerHeight;

let A, B, C;

A = new Circle(new Vector2(100, 100), 10, "rgb(255, 0,0)", true);
B = new Circle(new Vector2(500, 100), 10, "rgb(0,255,0)", true);
C = new Circle(new Vector2(250, 500), 10, "rgb(0,0,255)", true);

let D, E, F;
D = new Circle(new Vector2(250, 500), 10, "rgb(0,255, 255)", false);
E = new Circle(new Vector2(250, 500), 10, "rgb(255,255, 0)", false);
F = new Circle(new Vector2(250, 500), 10, "rgb(255,0, 255)", false);

let LA, LB, LC;

LA = new Line();
LA.color = "blue";
LB = new Line();
LB.color = "red";
LC = new Line();
LC.color = "orange";

scene.addGameObjects(A, B, C, D, E, F, LA, LB, LC);

function update() {
    LA.slope = LA.getSlope(A.position, E.position);
    LA.intercept = -(LA.slope * A.position.x - A.position.y);

    LB.slope = LB.getSlope(B.position, F.position);
    LB.intercept = -(LB.slope * B.position.x - B.position.y);

    LC.slope = LC.getSlope(C.position, D.position);
    LC.intercept = -(LC.slope * C.position.x - C.position.y);

    D.position = new Vector2((A.position.x + B.position.x) / 2, (A.position.y + B.position.y) / 2);
    E.position = new Vector2((B.position.x + C.position.x) / 2, (B.position.y + C.position.y) / 2);
    F.position = new Vector2((A.position.x + C.position.x) / 2, (A.position.y + C.position.y) / 2);
}

function render() {
    scene.context.beginPath();
    scene.context.strokeStyle = "orange";
    scene.context.fillStyle = "rgba(187,44,44,0.5)";
    scene.context.moveTo(A.position.x, A.position.y);
    scene.context.lineTo(B.position.x, B.position.y);
    scene.context.lineTo(C.position.x, C.position.y);
    scene.context.lineTo(A.position.x, A.position.y);
    scene.context.stroke();
    scene.context.fill();
    scene.context.closePath();
}

scene.OnUpdate.AddListener(update);
scene.OnRender.AddListener(render);

