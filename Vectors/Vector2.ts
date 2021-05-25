class Vector2 {
    x : number;
    y : number;
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    differenceVector(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
    }

    sumVector(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    scalMul(scal) {
        this.x *= scal;
        this.y *= scal;
    }

    dot(vector) {
        return (this.x * vector.x + this.y * vector.y);
    }

    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    get angle() {
        return Math.atan2(this.y, this.x);
    }

    set magnitude(newMagnitude) {
        let angle = this.angle;
        //polar coordinates
        this.x = newMagnitude * Math.cos(angle);
        this.y = newMagnitude * Math.sin(angle);
    }

    equals(vector) {
        this.x = vector.x;
        this.y = vector.y;
    }

    static draw(context, x,y,angle){
        let sh = 15;
        let sw = 100;
        let hh = 20;
        let hw = 30;

        context.save();
        context.beginPath();
        context.fillStyle = "black";
        context.strokeStyle = "orange";
        context.translate(x, y);
        context.rotate(angle);

        context.moveTo(0,0);
        context.lineTo(0,sh);
        context.lineTo(sw,sh);
        context.lineTo(sw,hh);
        context.lineTo(sw + hw ,0);
        context.lineTo(sw,-hh);
        context.lineTo(sw,-sh);
        context.lineTo(0,-sh);
        context.closePath();
        context.stroke();
        context.fill();
        context.restore();
    }

    draw(context, x,y,angle){
        Vector2.draw(context,x,y,angle);
    }


    distanceTo(position2) {
        let pos1 = this.x - position2.x;
        let pos2 = this.y - position2.y;

        return Math.sqrt(pos1 * pos1 + pos2 * pos2);
    }

    perpendicular(vector) {
        this.x = -vector.y;
        this.y = vector.x;
    }

    vectorSum(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
    }

    vectorCenter(a, b) {
        this.x = (a.x + b.y) / 2;
        this.y = (a.y + b.y) / 2;
    }
}