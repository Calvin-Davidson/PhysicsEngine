let scene = engine.createScene();

let circle = new Circle(new Vector2(160, 54), 25, "rgb(49, 201, 137)", true);
scene.addGameObject(circle);

let cube = new Cube(new Vector2(window.innerWidth/2, window.innerHeight/2), Mathf.Min(window.innerWidth/2, window.innerHeight/2), Mathf.Min(window.innerWidth/2, window.innerHeight/2));
cube.rotation = Mathf.DegreeToRadian(45);
cube.position.x -= cube.width/2;
cube.position.y -= cube.height/2;

scene.addGameObject(cube);

scene.OnUpdate.AddListener(function() {
    let areColliding = CircleCollider2d.CircleCubeCollision(circle, cube);
    cube.rotation += 0.001;

    if (areColliding) {
        cube.color = "rgb(96,54,179)";
        circle.color = "rgb(96,54,179)";
    } else {
        cube.color = "rgb(49,201,137)";
        circle.color = "rgb(49,201,137)";
    }
});