class Cube {

    constructor(pos, width, height, color = "black", draggable = false) {
        this.position = pos;
        this.width = width;
        this.height = height;
        this.color = color;
        this.draggable = draggable
        this.isDragging = false;
        this.VelSpeed = 0;

        if (this.draggable) {
            this.#initEvents();
        }
    }

    update() {
        if (this.VelSpeed !== 0) {
            for (let i = 0; i < this.VelSpeed; i++) {
                let X = this.position.x + this.VelX;
                let Y = this.position.y + this.VelY;

                this.position = new Vector2(X, Y);
            }
        }
    }

    draw(context) {
        //hier komt de code om een cirkel te tekenen
        context.beginPath();

        context.fillStyle = this.color;
        context.strokeStyle = this.color;

        context.fillRect(this.position.x-this.width/2, this.position.y-this.height/2, this.width, this.height);
        context.stroke();
        context.fill();


        context.closePath();
    }


    wallCollision(width, height) {
        if (this.position.x - this.width / 2 <= 0)
            this.VelX = Math.abs(this.VelX)
        if (this.position.x + this.width / 2 >= width)
            this.VelX = -Math.abs(this.VelX);
        if (this.position.y - this.height / 2 <= 0)
            this.VelY = Math.abs(this.VelY);
        if (this.position.y + this.height / 2 >= height)
            this.VelY = -Math.abs(this.VelY);
    }

    CircleBorder(radius, points, offset = 0) {
        let Positions = [];

        let slice = 2 * Math.PI / points;
        for (let i = 0; i < points; i++) {
            let angle;
            angle = slice * i + offset;

            let newX = (this.position.x + radius * Math.cos(angle));
            let newY = (this.position.y + radius * Math.sin(angle));

            Positions.push(new Vector2(newX, newY));
        }

        return Positions;
    }

    #initEvents() {
        const cube = this;
        document.addEventListener("mouseup", function (e) {
            cube.isDragging = false;
        });

        document.addEventListener("mousemove", function (e) {
            if (!cube.isDragging || !cube.draggable) return;
            cube.position.x = e.pageX;
            cube.position.y = e.pageY;
        });

        document.addEventListener("mousedown", function (e) {
            if (cube.position.x + cube.width/2 < e.pageX) return console.log(1);
            if (cube.position.x - cube.width/2 > e.pageX) return console.log(2);
            if (cube.position.y + cube.height/2 < e.pageY) return console.log(3);
            if (cube.position.y - cube.height/2 > e.pageY) return console.log(4);
            cube.isDragging = true;
            cube.position.x = e.pageX;
            cube.position.y = e.pageY;
        });

    }

}
