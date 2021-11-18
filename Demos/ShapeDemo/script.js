const scene = engine.createScene();

const width = window.innerWidth;
const height = window.innerHeight;

const speed = 1;

let shape = new RegularPolygon(new Vector2(width/2, height/2), Mathf.Min(width, height) * .1, 5);
let shape2 = new RegularPolygon(new Vector2(width/2, height/2), Mathf.Min(width, height) * .1, 5);

shape2.velocity = new Vector2(speed, 0);

shape2.OnUpdate.AddListener(() => {
    ConfineInScreen.ConfineRegularPolygonInScreen(shape2);
})

scene.addGameObjects(shape, shape2);

scene.OnUpdate.AddListener(() => {
    if (RegularPolygonCollider2d.RegularPolygonCollision(shape2, shape)) {
        shape2.color = "red";
    } else {
        shape2.color = "green";
    }
});