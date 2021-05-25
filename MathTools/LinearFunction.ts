class LinearFunction {
    slope : number;
    color : string;
    intercept : number;

    constructor(slope, intercept, color) {
        this.slope = slope;
        this.color = color;
        this.intercept = intercept;
    }


    y(x) {
        return x * this.slope + this.intercept;
    }

    draw(context) {
        context.beginPath();
        context.strokeStyle = this.color;
        context.fillStyle = this.color;
        context.moveTo(0, this.y(0));
        context.lineTo(Engine.Instance.canvas.width, this.y(Engine.Instance.canvas.width));
        context.stroke();
    }

    lineIntersection(Line) : Vector2 {
        let x = (Line.intercept - this.intercept)/(this.slope-Line.slope);
        let y = (x * this.slope) + this.intercept
        return new Vector2(x,y);
    }

    getSlope(pos1, pos2) {
        return (pos2.dy - pos1.dy) / (pos2.dx - pos1.dx);
    }

    getIntercept(Position) {
        return Position.dy, Position.dx * this.slope;
    }
}
