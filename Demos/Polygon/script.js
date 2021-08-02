const scene = engine.createScene();

const width = window.innerWidth;
const height = window.innerHeight;

let rotate = false;

let poly = new polygon(new Vector2(width/2, height/2));
let cube = new Cube(new Vector2(150, 150), 100, 100);

let a,b,c,d;

a = new Vector2(50, 50);
ab = new Vector2(50, 175);
b = new Vector2(-50, 50);
c = new Vector2(-50, -50);
cd = new Vector2(-50, -175);
d = new Vector2(50, -50);

poly.addPoints(a, ab, b, c, cd, d);
poly.rotation = Mathf.DegreeToRadian(45);
cube.rotation = Mathf.DegreeToRadian(45);

scene.addGameObjects(poly, cube);



scene.OnUpdate.AddListener(function() {
    if (rotate) {
        poly.rotation += 0.005;
        cube.rotation += 0.005;
    }
});

document.addEventListener("mousedown", ev => {
    rotate = true;
})

document.addEventListener("mouseup", ev => {
    rotate = false;
})