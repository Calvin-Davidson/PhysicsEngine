class Circle implements Drawable, VelocityObject{
    position: Vector2;
    radius : number;
    color : string;
    draggable : boolean;
    isDragging : boolean;
    velocity : Vector2;

    constructor(pos, radius, color = "black", draggable = false) {
        this.position = pos;
        this.radius = radius;
        this.color = color;
        this.draggable = draggable
        this.isDragging = false;
        this.velocity = new Vector2(0,0);

        if (this.draggable) {
            this.initEvents();
        }
    }

    public update() {

    }

    public draw() {
        Engine.Instance.context.beginPath();

        Engine.Instance.context.fillStyle = this.color;
        Engine.Instance.context.strokeStyle = this.color;

        Engine.Instance.context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        Engine.Instance.context.stroke();
        Engine.Instance.context.fill();


        Engine.Instance.context.closePath();
    }


    public wallCollision(width, height) {
        if (this.position.x - this.radius <= 0) {
            this.velocity.x = Math.abs(this.velocity.x);
        }
        if (this.position.x + this.radius >= width) {
            this.velocity.x = -Math.abs(this.velocity.x);
        }
        if (this.position.y - this.radius <= 0) {
            this.velocity.y = Math.abs(this.velocity.y);
        }
        if (this.position.y + this.radius >= height) {
            this.velocity.y = -Math.abs(this.velocity.y);
        }
    }

    public CircleBorder(xCenter, yCenter, radius, points, offset = 0) {
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

    private initEvents() {
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
