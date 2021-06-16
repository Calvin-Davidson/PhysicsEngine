const engine = new Engine();


const a = new Circle(new Vector2(innerWidth / 2, innerHeight / 2), 125, "green", false);
const b = new Circle(new Vector2(innerWidth / 3, innerHeight / 2), 125, "red", false)
a.velocity = new Vector2(-5,5);
b.velocity = new Vector2(5,4);

a.collideWithSceneBorders = true;
b.collideWithSceneBorders = true;

function update() {
    requestAnimationFrame(update);
    engine.context.fillStyle = "rgba(0,0,0,0.8)";
    engine.context.fillRect(0,0,innerWidth,innerHeight);

    a.position.add(a.velocity);
    b.position.add(b.velocity);

    a.update();
    b.update();

    a.draw();
    b.draw();

    if (a.position.distanceTo(b.position) < a.radius + b.radius) {
        Circle.resolveCollision(a,b);
    }
}

update();