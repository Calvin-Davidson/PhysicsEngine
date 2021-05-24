class Circle {

    constructor(pos, radius, color = "black", draggable = false) {
        this.position = pos;
        this.radius = radius;
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

        context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        context.stroke();
        context.fill();


        context.closePath();
    }


    wallCollision(width, height) {
        // als hij buiten de muur zit.
        if (this.position.x - this.radius <= 0) {
            this.VelX = Math.abs(this.VelX);
        }
        if (this.position.x + this.radius >= width) {
            this.VelX = -Math.abs(this.VelX);
        }
        if (this.position.y - this.radius <= 0) {
            this.VelY = Math.abs(this.VelY);
        }
        if (this.position.y + this.radius >= height) {
            this.VelY = -Math.abs(this.VelY);
        }
    }

    CircleBorder(xCenter, yCenter, radius, points, offset = 0) {
        let Positions = [];

        let slice = 2 * Math.PI / points;
        for (let i = 0; i < points; i++) {
            let angle;
            angle = slice * i + offset;

            let newX = (xCenter + radius * Math.cos(angle));
            let newY = (yCenter + radius * Math.sin(angle));

            Positions.push(new Vector2(newX, newY));
        }

        return Positions;
    }

    #initEvents() {
        const circle = this;
        document.addEventListener("mouseup", function (e) {
            circle.isDragging = false;
        });

        document.addEventListener("mousemove", function (e) {
            if (!circle.isDragging || !circle.draggable) return;
            circle.position.x = e.pageX;
            circle.position.y = e.pageY;
        });

        document.addEventListener("mousedown", function (e) {
            if (new Vector2(e.pageX, e.pageY).distanceTo(circle.position) <= circle.radius) {
                circle.isDragging = true;
            }
        });

    }

}
