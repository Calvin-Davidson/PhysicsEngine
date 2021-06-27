const engine = new Engine();

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

LA = new LinearFunction(2,0, "blue");
LB = new LinearFunction(2,0, "red");
LC = new LinearFunction(2,0, "orange");

let Points = [A, B, C, D, E, F];

function update() {
    engine.context.fillStyle = "rgba(0,0,0,0.8)";
    engine.context.fillRect(0,0,innerWidth,innerHeight);


    for (let i = 0; i < Points.length; i++) {
        Points[i].draw();
    }
    engine.context.beginPath();

    engine.context.strokeStyle = "orange";
    engine.context.moveTo(A.position.x, A.position.y);
    engine.context.lineTo(B.position.x, B.position.y);
    engine.context.lineTo(C.position.x, C.position.y);
    engine.context.lineTo(A.position.x, A.position.y);
    engine.context.stroke();
    engine.context.closePath();

    LA.slope = getSlope(A.position, E.position);
    LA.intercept = -(LA.slope * A.position.x - A.position.y);
    LA.draw(engine.context);

    LB.slope = getSlope(B.position, F.position);
    LB.intercept = -(LB.slope * B.position.x - B.position.y);
    LB.draw(engine.context);

    LC.slope = getSlope(C.position, D.position);
    LC.intercept = -(LC.slope * C.position.x - C.position.y);
    LC.draw(engine.context);

    D.position = new Vector2((A.position.x + B.position.x) / 2, (A.position.y + B.position.y) / 2);
    E.position = new Vector2((B.position.x + C.position.x) / 2, (B.position.y + C.position.y) / 2);
    F.position = new Vector2((A.position.x + C.position.x) / 2, (A.position.y + C.position.y) / 2);
}

setInterval(update, 1)

function getSlope(pos1, pos2) {
    return (pos2.y - pos1.y) / (pos2.x - pos1.x);
}


