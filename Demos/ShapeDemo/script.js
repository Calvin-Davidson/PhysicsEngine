const scene = engine.createScene();

const width = window.innerWidth;
const height = window.innerHeight;

let shape = new RegularPolygon(new Vector2(width/2, height/2), Mathf.Min(width, height) * .4, 5);

let delay = 0;
let forward = false;
scene.OnUpdate.AddListener(() => {
    shape.rotation += 0.01;
    delay += 1;
    if (delay < 15) return;
    delay = 0;

    if (forward) shape.points += 1
    else shape.points -= 1;

    if (shape.points <= 2 || shape.points >= 20) forward = !forward;
})

scene.addGameObjects(shape);