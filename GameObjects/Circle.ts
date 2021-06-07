class Circle implements Drawable, VelocityObject {
    position: Vector2;
    radius: number;
    color: string;
    draggable: boolean;
    isDragging: boolean;
    velocity: Vector2;
    acc: Vector2;
    collideWithSceneBorders: boolean

    constructor(pos: Vector2, radius, color = "black", draggable = false) {
        this.position = pos;
        this.radius = radius;
        this.color = color;
        this.draggable = draggable
        this.isDragging = false;
        this.velocity = new Vector2(0, 0);
        this.acc = new Vector2(0, 0);
        this.collideWithSceneBorders = false;

        if (this.draggable) {
            this.initEvents();
        }
    }

    public update() {
        this.velocity.add(this.acc);
        if (this.velocity.x !== 0 && this.velocity.y !== 0) {
            if (this.collideWithSceneBorders) this.wallCollision(window.innerWidth, window.innerHeight);

            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }


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

    static resolveCollision(circle1, circle2) {
        function rotate(velocity, angle) {
            return {
                x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
                y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
            };
        }

        const xVelocityDiff = circle1.velocity.x - circle2.velocity.x;
        const yVelocityDiff = circle1.velocity.y - circle2.velocity.y;

        const xDist = circle2.position.x - circle1.position.x;
        const yDist = circle2.position.y - circle1.position.y;

        // Prevent accidental overlap of circle1s
        if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

            // Verkrijg de hoek tussen de 2 circles.
            const angle = -Math.atan2(circle2.position.y - circle1.position.y, circle2.position.x - circle1.position.x);

            // Rotate beide circles met de angle tussen ze.
            const u1 = rotate(circle1.velocity, angle);
            const u2 = rotate(circle2.velocity, angle);

            // Flip de 2 velocities.
            const v1 = {x: u2.x, y: u1.y};
            const v2 = {x: u1.x, y: u2.y};

            // Rotate de velocities terug.
            const vFinal1 = rotate(v1, -angle);
            const vFinal2 = rotate(v2, -angle);


            // Apply velocities
            circle1.velocity.x = vFinal1.x;
            circle1.velocity.y = vFinal1.y;

            circle2.velocity.x = vFinal2.x;
            circle2.velocity.y = vFinal2.y;
        }
    }
}
