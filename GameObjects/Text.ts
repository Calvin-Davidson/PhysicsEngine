class Text2d implements GameObject2d {
    position: Vector2;
    color : string;

    velocity : Vector2;
    rotation : number;
    scene : Scene2d;
    zIndex : number;

    font : string;
    text : string;

    OnLateUpdate: EventSystem;
    OnRender: EventSystem;
    OnUpdate: EventSystem;

    constructor(pos : Vector2, text : string, color = "black") {
        this.position = pos;
        this.color = color;

        this.text = text;
        this.font = "30px Arial";

        this.rotation = 0;
        this.velocity = new Vector2(0,0);
        this.zIndex = 0;

        this.OnLateUpdate = new EventSystem();
        this.OnRender = new EventSystem();
        this.OnUpdate = new EventSystem();

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
        context.translate(this.position.x, this.position.y);
        context.rotate(this.rotation);


        context.fillStyle = this.color;
        context.strokeStyle = this.color;

        context.font = this.font;
        context.strokeText(this.text, 0,0);
        context.fillText(this.text, 0,0);

        context.restore();
        context.closePath();
    }



    lateUpdate() {
        this.OnLateUpdate.Invoke();
    }

}
