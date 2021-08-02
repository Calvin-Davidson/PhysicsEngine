class Cube implements Renderable, VelocityObject, GameObject2d {
    position: Vector2;
    width : number;
    height : number;
    color : string;
    draggable : boolean;
    isDragging : boolean;
    velocity : Vector2;
    rotation : number;
    scene : Scene2d;
    zIndex : number;

    OnLateUpdate: EventSystem;
    OnRender: EventSystem;
    OnUpdate: EventSystem;

    constructor(pos : Vector2, width, height, color = "black", draggable = false) {
        this.position = pos;
        this.position = pos;
        this.width = width;
        this.height = height;
        this.color = color;
        this.draggable = draggable
        this.isDragging = false;
        this.velocity = new Vector2(0,0);
        this.rotation = 0;

        this.zIndex = 0;

        this.OnLateUpdate = new EventSystem();
        this.OnRender = new EventSystem();
        this.OnUpdate = new EventSystem();

        if (this.draggable) {
            this.initEvents();
        }
    }

    public update() {
        this.OnUpdate.Invoke();
        this.position.add(this.velocity);
    }

    set Scene(scene : Scene2d) {
        this.scene = scene;
    }


    set ZIndex(zIndex : number) {
        this.zIndex = zIndex;
    }

    public render() {
        let context = this.scene.context;
        //hier komt de code om een cirkel te tekenen
        context.beginPath();
        context.save();
        context.translate(this.position.x + this.width/2, this.position.y + this.height/2);
        context.rotate(this.rotation);


        context.fillStyle = this.color;
        context.strokeStyle = this.color;

        context.fillRect(-this.width/2, -this.height/2, this.width, this.height);
        context.stroke();
        context.fill();

        context.restore();
        context.closePath();
    }


    public wallCollision(width, height) {
        if (this.position.x - this.width / 2 <= 0)
            this.velocity.x = Math.abs(this.velocity.x)
        if (this.position.x + this.width / 2 >= width)
            this.velocity.x = -Math.abs(this.velocity.x);

        if (this.position.y - this.height / 2 <= 0)
            this.velocity.y = Math.abs(this.velocity.y);
        if (this.position.y + this.height / 2 >= height)
            this.velocity.y = -Math.abs(this.velocity.y);
    }

    public CircleBorder(radius, points, offset = 0) {
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

    private initEvents() {
        const cube = this;
        document.addEventListener("mouseup", function (e) {
            cube.isDragging = false;
        });

        document.addEventListener("mousemove", function (e) {
            if (!cube.isDragging || !cube.draggable) return;
            cube.position.x = e.pageX;
            cube.position.y = e.pageY;
        });

        document.addEventListener("mousedown", function (e) {
            if (cube.position.x + cube.width/2 < e.pageX) return;
            if (cube.position.x - cube.width/2 > e.pageX) return;
            if (cube.position.y + cube.height/2 < e.pageY) return;
            if (cube.position.y - cube.height/2 > e.pageY) return;
            cube.isDragging = true;
            cube.position.x = e.pageX;
            cube.position.y = e.pageY;
        });

    }

    lateUpdate() {
        this.OnLateUpdate.Invoke();
    }

}
