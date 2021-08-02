let scene = engine.createScene();

let circle = new Circle(new Vector2(160, 54), 25);
scene.addGameObject(circle);

let cube = new Cube(new Vector2(151, 100), 50, 50);
cube.rotation = Mathf.DegreeToRadian(45);
scene.addGameObject(cube);

console.log(CircleCollider2d.CircleCubeCollision(circle, cube));
