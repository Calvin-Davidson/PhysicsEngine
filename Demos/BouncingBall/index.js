const engine = new Engine();

const moon = new Circle(new Vector2(innerWidth / 3, innerHeight / 2), 50, "red", false)
moon.velocity = new Vector2(0, 1);
moon.acc = new Vector2(0,1);

moon.collideWithSceneBorders = true;


function UpdateBall() {
    requestAnimationFrame(UpdateBall);
    engine.context.fillStyle = "rgba(0,0,0,0.8)";
    engine.context.fillRect(0,0,innerWidth,innerHeight);



    moon.update();
    moon.draw();

    moon.acc.draw(engine.context, moon.position.x, moon.position.y, moon.acc.angle);
}

UpdateBall();