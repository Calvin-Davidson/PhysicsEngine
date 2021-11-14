const scene = engine.createScene(0);
const obstaclesScene = engine.createScene(1);

const navbarOffset = document.getElementsByClassName("navbar")[0].offsetHeight;
const width = window.innerWidth;
const height = window.innerHeight;

const Player = new Circle(new Vector2(50, 50), 25);
const PlayerArrayPosition = new Vector2(4, 4);

const obstacles = [];

let ShowGrid = false;
let path;

scene.addGameObjects(Player);

const pathFinding = new PathFinding.AstarPath(Player, Mathf.Ceil(width / (Player.radius)), Mathf.Ceil(height / (Player.radius)), width, height, obstacles);

scene.OnUpdate.AddListener(() => {
    if (path == null || path.length === 0) return;
    Player.position = path[path.length-1].position;
    PlayerArrayPosition.x = path[path.length-1].arrayPosition.x;
    PlayerArrayPosition.y = path[path.length-1].arrayPosition.y;
    path.splice(path.indexOf(path.length-1), 1)
});

obstaclesScene.OnLateUpdate.AddListener(() => pathFinding.updatePath());

scene.OnLateUpdate.AddListener(() => {
    if (!ShowGrid) return;
    pathFinding.cells.forEach(cellList => {
        cellList.forEach(cell => {
            cell.show(scene.context)
        });
    })
})

obstaclesScene.canvas.addEventListener("mousedown", function (e) {
    path = pathFinding.GetPath(PlayerArrayPosition.x, PlayerArrayPosition.y, getClosestCellFrom(e.clientX, e.clientY).arrayPosition.x, getClosestCellFrom(e.clientX, e.clientY).arrayPosition.y);
    if (path === undefined) return console.log("NoPath found");
})

Player.position.x = pathFinding.cells[4][4].position.x;
Player.position.y = pathFinding.cells[4][4].position.y;

function getClosestCellFrom(dx, dy) {
    let closest = pathFinding.cells[0][0];
    let currentClosestDist = 10000000;

    for (let y = pathFinding.cells.length - 1; y >= 0; y--) {
        for (let x = pathFinding.cells[y].length - 1; x >= 0; x--) {
            let cell = pathFinding.cells[y][x];

            let pos1 = (dx) - cell.position.x;
            let pos2 = (dy) - cell.position.y;

            let distanceTo = Math.sqrt(pos1 * pos1 + pos2 * pos2);
            if (distanceTo < currentClosestDist) {
                closest = cell;
                currentClosestDist = distanceTo;
            }
        }
    }
    return closest;
}

function addCube(x, y, w, h) {
    let cube = new Cube(new Vector2(x,y), w, h, "black", true);
    addObstacle(cube);
}

function addCircle(x, y, r) {
    let circle = new Circle(new Vector2(x, y), r, "black", true);
    addObstacle(circle)
}

function addObstacle(obj) {
    obstacles.push(obj);
    pathFinding.blockingObjects = obstacles;
    pathFinding.updatePath();
    obstaclesScene.addGameObject(obj);

    obj.OnRender.AddListener(() => console.log("rendering spawned object"))
}