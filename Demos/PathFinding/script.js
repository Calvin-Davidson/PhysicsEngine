const scene = engine.createScene();

const width = window.innerWidth;
const height = window.innerHeight;

let cube = new Cube(new Vector2(150, 150), 100, 100);
cube.velocity = new Vector2(1,1);

let circle = new Circle(new Vector2(100, 100), 50);
circle.velocity = new Vector2(-5, 1);

scene.addGameObjects(cube, circle);

const blockingObjects = [cube, circle];
const pathFinding = new PathFinding.AstarPath(null, 100,50,window.innerWidth, window.innerHeight, blockingObjects);

scene.OnUpdate.AddListener(function (){
    ConfineInScreen.ConfineCubeInScreen(cube);
    ConfineInScreen.ConfineCircleInScreen(circle);
});

scene.OnLateUpdate.AddListener(function () {
   pathFinding.cells.forEach(cellArray => {
      cellArray.forEach(cell => {
          cell.show(scene.context)
      });
   });


   pathFinding.updatePath()
});