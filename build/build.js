class Engine {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.body.appendChild(this.canvas);
        Engine.Instance = this;
        console.log(Engine.Instance);
    }
}
class Circle {
    constructor(pos, radius, color = "black", draggable = false) {
        this.position = pos;
        this.radius = radius;
        this.color = color;
        this.draggable = draggable;
        this.isDragging = false;
        this.velocity = new Vector2(0, 0);
        if (this.draggable) {
            this.initEvents();
        }
    }
    update() {
    }
    draw() {
        Engine.Instance.context.beginPath();
        Engine.Instance.context.fillStyle = this.color;
        Engine.Instance.context.strokeStyle = this.color;
        Engine.Instance.context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        Engine.Instance.context.stroke();
        Engine.Instance.context.fill();
        Engine.Instance.context.closePath();
    }
    wallCollision(width, height) {
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
    initEvents() {
        const circle = this;
        console.log("events are initing");
        document.addEventListener("mouseup", function (e) {
            circle.isDragging = false;
        });
        document.addEventListener("mousemove", function (e) {
            if (!circle.isDragging || !circle.draggable)
                return;
            circle.position.x = e.pageX;
            circle.position.y = e.pageY;
        });
        document.addEventListener("mousedown", function (e) {
            console.log("mouse down");
            if (new Vector2(e.pageX, e.pageY).distanceTo(circle.position) <= circle.radius) {
                circle.isDragging = true;
            }
        });
    }
}
class Cube {
    constructor(pos, width, height, color = "black", draggable = false) {
        this.position = pos;
        this.position = pos;
        this.width = width;
        this.height = height;
        this.color = color;
        this.draggable = draggable;
        this.isDragging = false;
        this.velocity = new Vector2(0, 0);
        if (this.draggable) {
            this.initEvents();
        }
    }
    update() {
    }
    draw() {
        Engine.Instance.context.beginPath();
        Engine.Instance.context.fillStyle = this.color;
        Engine.Instance.context.strokeStyle = this.color;
        Engine.Instance.context.fillRect(this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);
        Engine.Instance.context.stroke();
        Engine.Instance.context.fill();
        Engine.Instance.context.closePath();
    }
    wallCollision(width, height) {
        if (this.position.x - this.width / 2 <= 0)
            this.velocity.x = Math.abs(this.velocity.x);
        if (this.position.x + this.width / 2 >= width)
            this.velocity.x = -Math.abs(this.velocity.x);
        if (this.position.y - this.height / 2 <= 0)
            this.velocity.y = Math.abs(this.velocity.y);
        if (this.position.y + this.height / 2 >= height)
            this.velocity.y = -Math.abs(this.velocity.y);
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
    initEvents() {
        const cube = this;
        document.addEventListener("mouseup", function (e) {
            cube.isDragging = false;
        });
        document.addEventListener("mousemove", function (e) {
            if (!cube.isDragging || !cube.draggable)
                return;
            cube.position.x = e.pageX;
            cube.position.y = e.pageY;
        });
        document.addEventListener("mousedown", function (e) {
            if (cube.position.x + cube.width / 2 < e.pageX)
                return console.log(1);
            if (cube.position.x - cube.width / 2 > e.pageX)
                return console.log(2);
            if (cube.position.y + cube.height / 2 < e.pageY)
                return console.log(3);
            if (cube.position.y - cube.height / 2 > e.pageY)
                return console.log(4);
            cube.isDragging = true;
            cube.position.x = e.pageX;
            cube.position.y = e.pageY;
        });
    }
}
class polygon {
    constructor(points, color = "blue") {
        this.points = points;
        this.color = color;
        this.stokeStyle = "black";
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
class LinearFunction {
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
    lineIntersection(Line) {
        let x = (Line.intercept - this.intercept) / (this.slope - Line.slope);
        let y = (x * this.slope) + this.intercept;
        return new Vector2(x, y);
    }
    getSlope(pos1, pos2) {
        return (pos2.dy - pos1.dy) / (pos2.dx - pos1.dx);
    }
    getIntercept(Position) {
        return Position.dy, Position.dx * this.slope;
    }
}
class Mathf {
    static Abs(value) {
        return Math.abs(value);
    }
    static Acos(value) {
        return Math.acos(value);
    }
    static Approximately(a, b) {
        return Mathf.Abs(b - a) < Mathf.Max(1E-06 * Mathf.Max(Mathf.Abs(a), Mathf.Abs(b)), Mathf.Epsilon * 8);
    }
    static Asin(value) {
        return Math.asin(value);
    }
    static Atan(value) {
        return Math.atan(value);
    }
    static Atan2(a, b) {
        return Math.atan2(a, b);
    }
    static Ceil(f) {
        return Math.ceil(f);
    }
    static Clamp(value, min, max) {
        if (value < min)
            value = min;
        else if (value > max)
            value = max;
        return value;
    }
    static Clamp01(value) {
        if (value < 0.0) {
            return 0.0;
        }
        if (value > 1.0) {
            return 1;
        }
        else {
            return value;
        }
    }
    static Cos(value) {
        return Math.cos(value);
    }
    static Exp(value) {
        return Math.exp(value);
    }
    static Floor(value) {
        return Math.floor(value);
    }
    static Lerp(a, b, t) {
        return a + (b - a) * Mathf.Clamp01(t);
    }
    static Max(a, b) {
        if (a > b) {
            return a;
        }
        else {
            return b;
        }
    }
    static Min(a, b) {
        if (a > b) {
            return b;
        }
        else {
            return a;
        }
    }
    static Pow(a, b) {
        return Math.pow(a, b);
    }
    static Repeat(t, length) {
        return Mathf.Clamp(t - Mathf.Floor(t / length) * length, 0.0, length);
    }
    static Round(value) {
        return Math.round(value);
    }
    static Sign(value) {
        return (value >= 0) ? 1 : -1;
    }
    static Sin(value) {
        return Math.sin(value);
    }
    static Sqrt(value) {
        return Math.sqrt(value);
    }
    static Tan(value) {
        return Math.tan(value);
    }
    static DeltaAngle(current, target) {
        let num = Mathf.Repeat(target - current, 360);
        if (num > 180.0)
            num -= 360;
        return num;
    }
    static InverseLerp(a, b, value) {
        return a !== b ? Mathf.Clamp01(((value - a) / (b - a))) : 0.0;
    }
    static LerpAngle(a, b, t) {
        let num = Mathf.Repeat(b - a, 360);
        if (num > 180.0)
            num -= 360;
        return a + num * Mathf.Clamp01(t);
    }
    static LerpUnclamped(a, b, t) {
        return a + (b - a) * t;
    }
    static MoveTowards(current, target, maxDelta) {
        return Mathf.Abs(target - current) <= maxDelta ? target : current + Mathf.Sign(target - current) * maxDelta;
    }
    static PingPong(t, length) {
        t = Mathf.Repeat(t, length * 2);
        return length - Mathf.Abs(t - length);
    }
    static SmoothDamp(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime) {
        smoothTime = Mathf.Max(0.0001, smoothTime);
        let num1 = 2 / smoothTime;
        let num2 = num1 * deltaTime;
        let num3 = (1.0 / (1.0 + num2 + 0.479999989271164 * num2 * num2 + 0.234999999403954 * num2 * num2 * num2));
        let num4 = current - target;
        let num5 = target;
        let max = maxSpeed * smoothTime;
        let num6 = Mathf.Clamp(num4, -max, max);
        target = current - num6;
        let num7 = (currentVelocity + num1 * num6) * deltaTime;
        let num8 = target + (num6 + num7) * num3;
        if (num5 - current > 0.0 === num8 > num5) {
            num8 = num5;
        }
        return num8;
    }
    static SmoothStep(from, to, t) {
        t = Mathf.Clamp01(t);
        t = (-2.0 * t * t * t + 3.0 * t * t);
        return (to * t + from * (1.0 - t));
    }
    static MoveTowardsAngle(current, target, maxDelta) {
        let num = Mathf.DeltaAngle(current, target);
        if (-maxDelta < num && num < maxDelta)
            return target;
        target = current + num;
        return Mathf.MoveTowards(current, target, maxDelta);
    }
    static SmoothDampAngle(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime) {
        target = current + Mathf.DeltaAngle(current, target);
        return Mathf.SmoothDamp(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime);
    }
    static DegreeToRadian(degree) {
        return degree * this.PI / 180;
    }
    static RadianToDegree(radian) {
        return radian * 180 / this.PI;
    }
    static random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    static average(...values) {
        let v = 0;
        values.forEach(value => v += value);
        return v / values.length;
    }
}
Mathf.Epsilon = 1.175494E-38;
Mathf.Infinity = 1.0 / 0.0;
Mathf.Deg2Rad = 0.01745329;
Mathf.NegativeInfinity = -1.0 / 0.0;
Mathf.PI = 3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342;
Mathf.Rad2Deg = 57.29578;
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
class SpriteSheetRenderer {
    constructor(image, image_rows, image_columns, totalImages) {
        this.Image = image;
        this.imageRows = image_rows;
        this.imageColumns = image_columns;
        this.totalImages = totalImages;
        this.spriteWidth = this.Image.width / image_rows;
        this.spriteHeight = this.Image.height / image_columns;
    }
    DrawSprite(context, x, y, spriteNumber) {
        if (this.totalImages < spriteNumber) {
            throw new Error("InvalidArgumentException, spriteNumber is to big");
        }
        let spriteRow, spriteColumn;
        spriteRow = spriteNumber % this.imageRows;
        spriteColumn = Math.floor(spriteNumber / this.imageRows);
        let sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight;
        sx = (spriteRow * this.spriteWidth);
        sy = (spriteColumn * this.spriteHeight);
        sWidth = this.spriteWidth;
        sHeight = this.spriteHeight;
        dx = x;
        dy = y;
        dWidth = this.spriteWidth;
        dHeight = this.spriteHeight;
        return context.drawImage(this.Image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }
    GetSpriteDrawData(spriteNumber) {
        let spriteRow = spriteNumber % this.imageRows;
        let spriteColumn = Math.floor(spriteNumber / this.imageRows);
        let Data = {
            sx: undefined,
            sy: undefined,
            sWidth: undefined,
            sHeight: undefined,
            dWidth: undefined,
            dHeight: undefined
        };
        Data.sx = (spriteRow * this.spriteWidth);
        Data.sy = (spriteColumn * this.spriteHeight);
        Data.sWidth = this.spriteWidth;
        Data.sHeight = this.spriteHeight;
        Data.dWidth = this.spriteWidth;
        Data.dHeight = this.spriteHeight;
        return Data;
    }
}
class Vector2 {
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
        this.x = newMagnitude * Math.cos(angle);
        this.y = newMagnitude * Math.sin(angle);
    }
    equals(vector) {
        this.x = vector.x;
        this.y = vector.y;
    }
    static draw(context, x, y, angle) {
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
        context.moveTo(0, 0);
        context.lineTo(0, sh);
        context.lineTo(sw, sh);
        context.lineTo(sw, hh);
        context.lineTo(sw + hw, 0);
        context.lineTo(sw, -hh);
        context.lineTo(sw, -sh);
        context.lineTo(0, -sh);
        context.closePath();
        context.stroke();
        context.fill();
        context.restore();
    }
    draw(context, x, y, angle) {
        Vector2.draw(context, x, y, angle);
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
class Vector2d {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    differenceVector(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
    }
    sumVector(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
    }
    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
    }
    scalMul(scal) {
        this.x *= scal;
        this.y *= scal;
        this.z *= scal;
    }
    dot(vector) {
        return (this.x * vector.x + this.y * vector.y + this.z + vector.z);
    }
    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    get angle() {
        return Math.atan2(this.y, this.x);
    }
    equals(vector) {
        this.x = vector.x;
        this.y = vector.y;
        this.z = vector.z;
    }
    distanceTo(position2) {
        let pos1 = this.x - position2.x;
        let pos2 = this.y - position2.y;
        let pos3 = this.z - position2.z;
        return Math.sqrt(pos1 * pos1 + pos2 * pos2 + pos3 * pos3);
    }
    perpendicular(vector) {
        this.x = -vector.y;
        this.y = vector.x;
    }
    vectorSum(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
    }
    VectorCenter(a, b) {
        this.x = (a.x + b.y) / 2;
        this.y = (a.y + b.y) / 2;
        this.z = (a.z + b.z) / 2;
    }
}
//# sourceMappingURL=build.js.map