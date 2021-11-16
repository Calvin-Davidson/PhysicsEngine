class CircleInscription implements Renderable, VelocityObject, GameObject2d {
    OnLateUpdate: EventSystem;
    OnRender: EventSystem;
    OnUpdate: EventSystem;
    position: Vector2;
    scene: Scene2d;
    velocity: Vector2;
    zIndex: number;
    radius: number;
    points: number;

    constructor(position: Vector2, radius: number, points: number) {
        this.position = position;
        this.velocity = new Vector2(0, 0);
        this.radius = radius;
        this.points = points;
        this.OnRender = new EventSystem();
        this.OnLateUpdate = new EventSystem();
        this.OnUpdate = new EventSystem();
    }

    lateUpdate() {
        this.OnLateUpdate.Invoke();
    }

    render() {
        this.OnRender.Invoke();

        this.scene.context.beginPath();

        let slice = 2 * Math.PI / this.points;
        for (let i = 0; i < this.points; i++) {
            let angle = slice * i;

            let newX = (this.position.x + this.radius * Math.cos(angle - Mathf.DegreeToRadian(90)));
            let newY = (this.position.y + this.radius * Math.sin(angle - Mathf.DegreeToRadian(90)));

            if (i == 0) this.scene.context.moveTo(newX, newY);
            else this.scene.context.lineTo(newX, newY);
        }
        let newX = (this.position.x + this.radius * Math.cos(-Mathf.DegreeToRadian(90)));
        let newY = (this.position.y + this.radius * Math.sin(-Mathf.DegreeToRadian(90)));
        this.scene.context.lineTo(newX, newY);


        this.scene.context.fill();
        this.scene.context.lineWidth = 10;
        this.scene.context.strokeStyle = "red";
        this.scene.context.stroke();
        this.scene.context.closePath();
    }

    update() {
        this.OnUpdate.Invoke();
        this.position.add(this.velocity);
    }

}