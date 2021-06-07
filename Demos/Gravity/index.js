const engine = new Engine();

let biggestD = 0.0;
const earth = new Circle(new Vector2(innerWidth / 2, innerHeight / 2), 150, "green", false);
const moon = new Circle(new Vector2(innerWidth / 3, innerHeight / 2), 50, "red", false)
moon.velocity = new Vector2(0, 5);
moon.acc = new Vector2(0,0);

const earthImage = new Image();
earthImage.src = "./Images/planet_03.png";
const moonImage = new Image();
moonImage.src = "./Images/planet_02.png";

function update() {
    requestAnimationFrame(update);
    engine.context.fillStyle = "rgba(0,0,0,0.8)";
    engine.context.fillRect(0,0,innerWidth,innerHeight);


    moon.acc.differenceVector(earth.position, moon.position);
    let distance = moon.acc.magnitude;
    moon.acc.magnitude = (distance*distance) * 0.000001;

    earth.draw();
    moon.update();
    moon.draw();
    engine.context.drawImage(moonImage, moon.position.x - moon.radius * 1.25, moon.position.y - moon.radius * 1.25, moon.radius * 2.5, moon.radius * 2.5)
    engine.context.drawImage(earthImage, earth.position.x - earth.radius * 1.25, earth.position.y - earth.radius * 1.25, earth.radius * 2.5, earth.radius * 2.5)

    moon.acc.draw(engine.context, moon.position.x, moon.position.y, moon.acc.angle);
}

update();