module PathFinding {
    export class AstarPath {
        ai: GameObject2d;
        columns: number;
        rows: number;
        width: number;
        height: number;

        cells = [];
        blockingObjects = [];

        constructor(AI, rows, columns, width, height, blockingObjects) {
            this.ai = AI;
            this.columns = columns;
            this.rows = rows;
            this.width = width;
            this.height = height;
            this.blockingObjects = blockingObjects;

            this.init();
        }

        public GetPath(currentX, currentY, targetX, targetY) {
            function heuristic(e, t) {
                return Math.abs(e.x - t.x);
            }

            const path: CellData[] = [];
            const openSet: CellData[] = [];
            const closedSet: CellData[] = [];


            openSet.push(this.cells[currentY][currentX]);

            let current;
            let foundPath = false;
            let end = this.cells[targetY][targetX];

            while (openSet.length > 0) {
                let winner = 0;
                for (let i = 0; i < openSet.length; i++) {
                    if (openSet[i].f < openSet[winner].f) winner = i;
                }

                current = openSet[winner];

                if (current === end) {
                    foundPath = true;
                    break;
                }

                openSet.splice(openSet.indexOf(current), 1)
                closedSet.push(current);

                let neighbors = current.neighbors;
                for (let i = 0; i < neighbors.length; i++) {
                    let neighbor = neighbors[i];

                    if (!closedSet.includes(neighbor) && neighbor.isValid === true) {
                        let tempG = heuristic(neighbor, current);
                        let newPath = false;

                        if (openSet.includes(neighbor)) {
                            if (tempG < neighbor.g) {
                                neighbor.g = tempG;
                                newPath = true;
                            }
                        } else {
                            neighbor.g = tempG;
                            newPath = true;
                            openSet.push(neighbor);
                        }

                        if (newPath) {
                            neighbor.h = heuristic(neighbor, end)
                            neighbor.f = neighbor.g + neighbor.h;
                            neighbor.previous = current;
                        }
                    }

                    current.neighbors[i] = neighbor;
                }
            }
            openSet.splice(0, openSet.length)
            closedSet.splice(0, closedSet.length)

            if (!foundPath) {
                return;
            }

            let temp = current;
            path.push(temp);
            while (temp.previous) {
                path.push(temp.previous);
                let t = temp;
                temp = temp.previous;
                t.previous = null;
            }

            return path;
        }

        private init() {
            for (let y = 0; y < this.columns + 1; y++) {
                let array = new Array(this.rows + 1);
                for (let x = 0; x < this.rows + 1; x++) {
                    let position = new Vector2(x * (this.width / this.rows), y * (this.height / this.columns));
                    let arrayPosition = new Vector2(x, y);
                    array[x] = new CellData(position, arrayPosition, this);
                }
                this.cells[y] = array;
            }
            this.updatePath();
        }

        private updatePath() {
            for (let y = this.cells.length - 1; y >= 0; y--) {
                for (let x = this.cells[y].length - 1; x >= 0; x--) {
                    let cellData = this.cells[y][x];
                    cellData.isValid = true;

                    if (this.ai instanceof Circle) {
                        for (let i = 0; i < this.blockingObjects.length; i++) {
                            if (this.blockingObjects[i] instanceof Circle) {
                                if (CircleCollider2d.CircleCollision(this.blockingObjects[i], new Circle(new Vector2(cellData.position.x, cellData.position.y), this.ai.radius))) cellData.isValid = false;
                            }
                            if (this.blockingObjects[i] instanceof Cube) {
                                if (CubeCollider2d.CubeCircleCollision(this.blockingObjects[i], new Circle(new Vector2(cellData.position.x, cellData.position.y), this.ai.radius))) cellData.isValid = false;
                            }
                        }
                    }
                    if (this.ai instanceof Cube) {
                        for (let i = 0; i < this.blockingObjects.length; i++) {
                            if (this.blockingObjects[i] instanceof Circle) {
                                if (CircleCollider2d.CircleCubeCollision(this.blockingObjects[i], new Cube(new Vector2(cellData.position.x, cellData.position.y), this.ai.width, this.ai.height))) cellData.isValid = false;
                            }
                            if (this.blockingObjects[i] instanceof Cube) {
                                if (CubeCollider2d.CubeCollision(this.blockingObjects[i], new Cube(new Vector2(cellData.position.x, cellData.position.y), this.ai.width, this.ai.height))) cellData.isValid = false;
                            }
                        }
                    }
                }
            }


            for (let y = this.cells.length - 1; y >= 0; y--) {
                for (let x = this.cells[y].length - 1; x >= 0; x--) {
                    let cellData = this.cells[y][x];
                    cellData.checkNeighbors();
                }
            }
        }
    }

    class CellData {
        position: Vector2;
        arrayPosition: Vector2;
        isValid: boolean;
        neighbors: any;
        AStarPath: AstarPath;

        f: number;
        g: number;
        h: number;

        constructor(position: Vector2, ArrayPosition: Vector2, AStarPath) {
            this.position = position;
            this.arrayPosition = ArrayPosition;
            this.isValid = true;
            this.neighbors = [];
            this.AStarPath = AStarPath;

            this.f = 0;
            this.g = 0;
            this.h = 0;
        }

        checkNeighbors() {
            this.neighbors = [];
            if (!this.isValid) return;

            let Cells = this.AStarPath.cells;
            let rows = this.AStarPath.rows + 1;
            let columns = this.AStarPath.columns + 1;
            let arrayX = this.arrayPosition.x;
            let arrayY = this.arrayPosition.y;
            let x = this.position.x;
            let y = this.position.y;

            if (arrayX + 1 < rows && Cells[arrayY][arrayX + 1].isValid) this.neighbors.push(Cells[arrayY][arrayX + 1]);
            if (x > 0 && Cells[arrayY][arrayX - 1].isValid) this.neighbors.push(Cells[arrayY][arrayX - 1]);
            if (arrayY + 1 < columns && Cells[arrayY + 1][arrayX].isValid) this.neighbors.push(Cells[arrayY + 1][arrayX]);
            if (arrayY > 0 && Cells[arrayY - 1][arrayX].isValid) this.neighbors.push(Cells[arrayY - 1][arrayX]);

            // diagonals
            if (arrayX + 1 < rows && arrayY + 1 < columns && Cells[arrayY + 1][arrayX + 1].isValid) this.neighbors.push(Cells[arrayY + 1][arrayX + 1]);
            if (arrayX + 1 < rows && arrayY > 0 && Cells[arrayY - 1][arrayX + 1].isValid) this.neighbors.push(Cells[arrayY - 1][arrayX + 1]);

            if (arrayX > 0 && arrayY + 1 < columns && Cells[arrayY + 1][arrayX - 1].isValid) this.neighbors.push(Cells[arrayY + 1][arrayX - 1]);
            if (arrayX > 0 && arrayY > 0 && Cells[arrayY - 1][arrayX - 1].isValid) this.neighbors.push(Cells[arrayY - 1][arrayX - 1]);
        }

        show(context) {
            context.beginPath();
            context.fillStyle = this.isValid ? "green" : "red";
            context.arc(this.position.x, this.position.y, 2, 0, 2 * Math.PI);
            context.fill();
            context.stroke();
            context.closePath();
        }
    }
}