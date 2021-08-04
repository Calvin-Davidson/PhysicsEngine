const scene = engine.createScene();

const width = window.innerWidth;
const height = window.innerHeight;

let cube = new Cube(new Vector2(150, 150), 100, 100);

cube.rotation = Mathf.DegreeToRadian(45);

scene.addGameObjects(cube);


let tween = new TweenPosition2d(cube, new Vector2(window.innerWidth/2, 150), 0.001, EasingMethode.EaseInBounce)

TweenController.Instance().ActiveTweens.push(tween)