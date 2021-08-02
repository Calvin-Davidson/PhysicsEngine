const scene = engine.createScene();

let biggestD = 0.0;
const earth = new Circle(new Vector2(innerWidth / 2, innerHeight / 2), 150, "green", false);
const moon = new Circle(new Vector2(innerWidth / 3 - 100, innerHeight / 2 - 100), 50, "red", false)
moon.velocity = new Vector2(0, 5);
moon.acc = new Vector2(0,0);

const earthImage = new Image();
earthImage.src = "./Images/planet_03.png";
const moonImage = new Image();
moonImage.src = "./Images/planet_02.png";

scene.addGameObjects(earth, moon);

function update() {
    moon.acc.differenceVector(earth.position, moon.position);
    let distance = moon.acc.magnitude;
    moon.acc.magnitude = (distance*distance) * 0.0000009;

    moon.velocity.x += moon.acc.x;
    moon.velocity.y += moon.acc.y;
}

function render() {
    scene.context.drawImage(moonImage, moon.position.x - moon.radius * 1.20, moon.position.y - moon.radius * 1.20, moon.radius * 2.5, moon.radius * 2.5)
    scene.context.drawImage(earthImage, earth.position.x - earth.radius * 1.20, earth.position.y - earth.radius * 1.20, earth.radius * 2.5, earth.radius * 2.5)
}

scene.OnUpdate.AddListener(update);
scene.OnLateUpdate.AddListener(render);