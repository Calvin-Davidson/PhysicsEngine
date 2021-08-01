const engine = new Engine();
const context = engine.context;

const width = window.innerWidth;
const height = window.innerHeight;


let polygon = new Polygon(new Vector2(width/2, height/2));
let cube = new Cube(new Vector2(150, 150), 100, 100);

let a,b,c,d;

a = new Vector2(50, 50);
b = new Vector2(-50, 50);
c = new Vector2(-50, -50);
d = new Vector2(50, -50);

polygon.addPoints(a, b, c, d);
polygon.rotation = Mathf.DegreeToRadian(45);
cube.rotation = Mathf.DegreeToRadian(45);


function update() {
    context.clearRect(0,0,width,height);

    cube.rotation += 0.01;

    cube.draw();
    polygon.draw();
    requestAnimationFrame(update);
}

update();