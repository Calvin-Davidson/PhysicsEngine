const engine = new Engine();
const context = engine.context;

let width = window.innerWidth;
let height = window.innerHeight;

let A, B, C, ab, bc, ca, D, E, F, ha, hb, hc, CenterPoint, OutherCircle;

A = new Circle(new Vector2(100, 101), 15, 'rgb(255,0,0)', true);
B = new Circle(new Vector2(305, 100), 15, 'rgb(0,0,255)', true);
C = new Circle(new Vector2(305, 300), 15, 'rgb(0,255,0)',  true);
D = new Circle(new Vector2(300, 300), 5, 'rgb(0,1,0)', false);
E = new Circle(new Vector2(300, 300), 5, 'rgb(0,1,0)', false);
F = new Circle(new Vector2(300, 300), 5, 'rgb(0,1,0)', false);

CenterPoint = new Circle(new Vector2(300, 300), 5, 'rgb(5,5,5)', false);
OutherCircle = new Circle(new Vector2(10, 10), 0, 'rgb(255, 255, 0, 0.3)', false);

ab = new LinearFunction(0, 0, 'rgb(255, 1, 255)');
bc = new LinearFunction(0, 0, 'rgb(255, 1, 255)');
ca = new LinearFunction(0, 0, 'rgb(255, 1, 255)');

ha = new LinearFunction(0, 0, 'rgb(255, 1, 255)');
hb = new LinearFunction(0, 0, 'rgb(255, 1, 255)');
hc = new LinearFunction(0, 0, 'rgb(255, 1, 255)');

let Circles = [A, B, C, D, E, F, CenterPoint, OutherCircle];
let Lines = [ab, bc, ca];

function update() {
    context.clearRect(0, 0, width, height);

    ab.slope = getSlope(B.position, A.position);
    ab.intercept = B.position.y - B.position.x * ab.slope

    bc.slope = getSlope(C.position, B.position);
    bc.intercept = C.position.y - C.position.x * bc.slope

    ca.slope = getSlope(A.position, C.position);
    ca.intercept = A.position.y - A.position.x * ca.slope


    //Middele points
    D.position.x = (A.position.x + B.position.x) / 2;
    D.position.y = (A.position.y + B.position.y) / 2;
    E.position.x = (B.position.x + C.position.x) / 2;
    E.position.y = (B.position.y + C.position.y) / 2;
    F.position.x = (C.position.x + A.position.x) / 2;
    F.position.y = (C.position.y + A.position.y) / 2;

    ha.slope = -1/ab.slope;
    ha.intercept = D.position.y - D.position.x*ha.slope;
    ha.draw(context);
    hb.slope = -1/bc.slope;
    hb.intercept = E.position.y - E.position.x*hb.slope;
    hb.draw(context);
    hc.slope = -1/ca.slope;
    hc.intercept = F.position.y - F.position.x*hc.slope;
    hc.draw(context);

    CenterPoint.position.x = ha.lineIntersection(hb).x;
    CenterPoint.position.y = ha.lineIntersection(hb).y;

    OutherCircle.position = CenterPoint.position;
    OutherCircle.radius = OutherCircle.position.distanceTo(A.position);

    // Drawing and updating the draggables
    Circles.forEach(value => value.draw(context));
    Circles.forEach(value => value.update());
    Lines.forEach(value => value.draw(context));
}

setInterval(update, 1);

function getSlope(pos1, pos2) {
    return (pos2.y - pos1.y) / (pos2.x - pos1.x);
}
