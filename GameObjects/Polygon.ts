class polygon {
    private points : Vector2[];
    color : string;
    stokeStyle : string;

    constructor(points, color = "blue") {
        this.points = points;
        this.color = color;
        this.stokeStyle = "black"
    }

    draw(context) {
        context.beginPath();
        context.fillStyle = this.color;
        context.strokeStyle = this.stokeStyle;
        context.moveTo(this.points[0].x, this.points[0].y);

        for (let i = 0; i < this.points.length; i++) {
            context.lineTo(this.points[i].x, this.points[i].y);
        }
        context.lineTo(this.points[0].x, this.points[0].y);

        context.fill();
        context.stroke();
        context.closePath();
    }

    addPoint(vector2) {
        this.points.push(vector2);
    }

    addPoints(...values) {
        values.forEach(value => this.points.push(value));
    }

    removePoint(vector2) {
        this.points = this.points.filter(el => el !== vector2);
    }
}