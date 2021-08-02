class polygon implements GameObject2d {
    private points : Vector2[];
    color : string;
    stokeStyle : string;
    scene : Scene2d;
    zIndex : number;

    OnLateUpdate: EventSystem;
    OnRender: EventSystem;
    OnUpdate: EventSystem;


    private points: Vector2[];
    color: string;
    stokeStyle: string;
    position: Vector2;
    velocity : Vector2;
    rotation : number;

    constructor(position, points = []) {
        this.points = points;
        this.position = position;
        this.color = "#A6E0FF";
        this.stokeStyle = "black"
		
        this.rotation = 0;

        this.zIndex = 0;

        this.OnLateUpdate = new EventSystem();
        this.OnRender = new EventSystem();
        this.OnUpdate = new EventSystem();
    }

    set Scene(scene : Scene2d) {
        this.scene = scene;
    }

    set ZIndex(zIndex : number) {
        this.zIndex = zIndex;
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

    position: Vector2;
    velocity: Vector2;

    render() {
        this.OnRender.Invoke();

        const context = this.scene.context;

        context.beginPath();
        context.save();

        context.translate(this.position.x, this.position.y);
        context.rotate(this.rotation);

        context.fillStyle = this.color;
        context.strokeStyle = this.stokeStyle;

        context.moveTo(this.points[0].x, this.points[0].y);

        for (let i = 0; i < this.points.length; i++) {
            context.lineTo(this.points[i].x, this.points[i].y);
        }
        context.lineTo(this.points[0].x, this.points[0].y);

        context.fill();
        context.stroke();
        context.restore();
        context.closePath();
    }

    lateUpdate() {
        this.OnLateUpdate.Invoke();
    }

    update() {
        this.OnUpdate.Invoke();
        this.position.add(this.velocity);
    }
}