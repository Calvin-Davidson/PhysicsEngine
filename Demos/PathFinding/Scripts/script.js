const scene = engine.createScene();

const navbarOffset = document.getElementsByClassName("navbar")[0].offsetHeight;
let ShowGrid = false;

let width = window.innerWidth;
let height = window.innerHeight - navbarOffset;

const Player = new Circle(new Vector2(50, 50), 25);
let centerBlocking = new Circle(new Vector2(width / 2, height / 2), 50);

scene.addGameObjects(Player, centerBlocking);

const pathFinding = new PathFinding.AstarPath(Player, Mathf.Ceil(width / (Player.radius)), Mathf.Ceil(height / (Player.radius)), width, height, [centerBlocking]);

scene.OnLateUpdate.AddListener(() => {
    if (!ShowGrid) return;
    pathFinding.cells.forEach(cellList => {
        cellList.forEach(cell => {
            cell.show(scene.context)
        });
    })
})

const path = pathFinding.GetPath(2, 2, 10, 10);
if (path === undefined) console.log("NoPath found");
else path.forEach(value => {
    scene.addGameObject(new Circle(new Vector2(value.position.x, value.position.y), 10, "orange"))
})