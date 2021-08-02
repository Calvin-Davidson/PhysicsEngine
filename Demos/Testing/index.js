let sceneA = engine.createScene(1);

const circles = [];

for (let i = 0; i < Math.floor(window.innerWidth / 30); i++) {
    let circle = (new Circle(new Vector2(window.innerWidth/30 * Mathf.random(1, 30), window.innerHeight/30 * Mathf.random(1, 30)), 25));
    circle.velocity = new Vector2(Mathf.random(-2, 1), Mathf.random(2, 1));
    sceneA.addGameObject(circle);
    circles.push(circle);
}


let cube = new Cube(new Vector2(200, 75), 50, 50);
cube.color = "red";

cube.zIndex = 7;

cube.velocity = new Vector2(1.25, 1);

sceneA.OnLateUpdate.AddListener(CheckAllCubes);
sceneA.OnLateUpdate.AddListener(CheckAllCircles);


function CheckAllCubes() {
    ConfineCubeInScreen(cube);
}

function CheckAllCircles() {
    circles.forEach(value => ConfineCircleInScreen(value));
}


function ConfineCubeInScreen(cube) {
    if (cube.position.x - cube.width / 2 <= 0)
        cube.velocity.x = Math.abs(cube.velocity.x)
    if (cube.position.x + cube.width / 2 >= window.innerWidth)
        cube.velocity.x = -Math.abs(cube.velocity.x);

    if (cube.position.y - cube.height / 2 <= 0)
        cube.velocity.y = Math.abs(cube.velocity.y);
    if (cube.position.y + cube.height / 2 >= window.innerHeight)
        cube.velocity.y = -Math.abs(cube.velocity.y);
}

function ConfineCircleInScreen(circle) {
    if (circle.position.x - circle.radius <= 0) {
        circle.velocity.x = Math.abs(circle.velocity.x);
    }
    if (circle.position.x + circle.radius >= window.innerWidth) {
        circle.velocity.x = -Math.abs(circle.velocity.x);
    }
    if (circle.position.y - circle.radius <= 0) {
        circle.velocity.y = Math.abs(circle.velocity.y);
    }
    if (circle.position.y + circle.radius >= window.innerHeight) {
        circle.velocity.y = -Math.abs(circle.velocity.y);
    }
}