module PathFinding {
    export class AstarPath {
        columns : number;
        rows : number;
        width : number;
        height : number;

        openSet = [];
        closedSet = [];
        path = [];
        cells = [];
        blockingObjects = [];

        constructor(AI, rows, columns, width, height, blockingObjects) {
            this.columns = columns;
            this.rows = rows;
            this.width = width;
            this.height = height;
            this.blockingObjects = blockingObjects;

            this.init();
        }

        private init() {
            for (let y = 0; y < this.columns+1; y++) {
                let array = new Array(this.rows+1);
                for (let x = 0; x < this.rows+1; x++) {
                    let position = new Vector2(x * (this.width/this.rows), y * (this.height/this.columns));
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

                    for (let i = 0; i < this.blockingObjects.length; i++) {
                        if (this.blockingObjects[i] instanceof Circle) {
                            if (CircleCollider2d.CirclePointCollision(this.blockingObjects[i], new Vector2(cellData.position.x, cellData.position.y))) cellData.isValid = false;
                        }
                        if (this.blockingObjects[i] instanceof Cube) {
                            if (CubeCollider2d.CubePointCollision(this.blockingObjects[i], new Vector2(cellData.position.x, cellData.position.y))) cellData.isValid = false;
                        }
                    }
                }
            }
        }


    }

    class CellData {
        position : Vector2;
        arrayPosition : Vector2;
        isValid : boolean;
        neighbors : any;
        AStarPath : AstarPath;

        constructor(position : Vector2, ArrayPosition : Vector2, AStarPath) {
            this.position = position;
            this.arrayPosition = ArrayPosition;
            this.isValid = true;
            this.neighbors = [];
            this.AStarPath = AStarPath;
        }

        checkNeighbors() {
            if (!this.isValid) return;

            let Cells = this.AStarPath.cells;
            let rows = this.AStarPath.rows + 1;
            let columns = this.AStarPath.columns + 1;
            let arrayX = this.arrayPosition.x;
            let arrayY = this.arrayPosition.y;
            let x = this.position.x;
            let y = this.position.y;

            if (arrayX + 1 < rows && Cells[arrayY][arrayX + 1].hasCollsion === false) this.neighbors.push(Cells[arrayY][arrayX + 1]);
            if (x > 0 && Cells[arrayY][arrayX - 1].hasCollsion === false) this.neighbors.push(Cells[arrayY][arrayX - 1]);
            if (arrayY + 1 < columns && Cells[arrayY + 1][arrayX].hasCollsion === false) this.neighbors.push(Cells[arrayY + 1][arrayX]);
            if (arrayY > 0 && Cells[arrayY - 1][arrayX].hasCollsion === false) this.neighbors.push(Cells[arrayY - 1][arrayX]);

            // diagonals
            if (arrayX + 1 < rows && arrayY + 1 < columns && !Cells[arrayY +1][arrayX + 1].hasCollsion) this.neighbors.push(Cells[arrayY +1][arrayX + 1]);
            if (arrayX + 1 < rows && arrayY > 0 && !Cells[arrayY - 1][arrayX + 1].hasCollsion) this.neighbors.push(Cells[arrayY - 1][arrayX + 1]);

            if (arrayX > 0 && arrayY + 1 < columns && !Cells[arrayY + 1][arrayX - 1].hasCollsion) this.neighbors.push(Cells[arrayY + 1][arrayX - 1]);
            if (arrayX > 0 && arrayY > 0 && !Cells[arrayY - 1][arrayX - 1].hasCollsion) this.neighbors.push(Cells[arrayY - 1][arrayX - 1]);
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