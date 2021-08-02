class Line implements Renderable, GameObject2d {
    zIndex: number;
    slope: number;
    intercept: number;
    color: string;
    scene: Scene2d;

    // Unused but required for the engine to work properly.
    velocity : Vector2;
    position : Vector2;

    OnLateUpdate: EventSystem;
    OnRender: EventSystem;
    OnUpdate: EventSystem;

    constructor() {
        this.zIndex = 0;
        this.slope = 0;
        this.intercept = 0;
        this.color = "black";

        this.OnLateUpdate = new EventSystem();
        this.OnRender = new EventSystem();
        this.OnUpdate = new EventSystem();
    }


    set Scene(scene: Scene2d) {
        this.scene = scene;
    }

    set ZIndex(zIndex: number) {
        this.zIndex = zIndex;
    }

    render() {
        this.OnRender.Invoke();

        this.scene.context.beginPath();
        this.scene.context.strokeStyle = this.color;
        this.scene.context.fillStyle = this.color;
        this.scene.context.moveTo(0, this.intercept);
        this.scene.context.lineTo(this.scene.canvas.width, this.y(this.scene.canvas.width));
        this.scene.context.stroke();
        this.scene.context.closePath();
    }


    public update() {
        this.OnUpdate.Invoke();
    }

    lateUpdate() {
        this.OnLateUpdate.Invoke();
    }


    y(x) {
        return x * this.slope + this.intercept;
    }

    lineIntersection(Line) : Vector2 {
        let x = (Line.intercept - this.intercept)/(this.slope-Line.slope);
        let y = (x * this.slope) + this.intercept
        return new Vector2(x,y);
    }

    getSlope(pos1, pos2) {
        return (pos2.y - pos1.y) / (pos2.x - pos1.x);
    }

    getIntercept(Position) {
        return Position.y, Position.x * this.slope;
    }
}
