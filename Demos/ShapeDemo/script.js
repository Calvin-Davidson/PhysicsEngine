const scene = engine.createScene();

const width = window.innerWidth;
const height = window.innerHeight;

let shape = new CircleInscription(new Vector2(width/2, height/2), Mathf.Min(width, height) * .4, 5);

let delay = 0;
scene.OnUpdate.AddListener(() => {
    delay += 1;
    if (delay < 60) return;
    delay = 0;
    shape.points > 6 ? shape.points = 3 : shape.points += 1
})

scene.addGameObjects(shape);