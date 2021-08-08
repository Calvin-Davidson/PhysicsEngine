class Sprite implements Renderable, VelocityObject, GameObject2d {
    position: Vector2;
    velocity: Vector2;
    scene : Scene2d;
    zIndex : number;
    image : HTMLImageElement;

    width : number;
    height : number;

    OnLateUpdate: EventSystem;
    OnRender: EventSystem;
    OnUpdate: EventSystem;

    constructor(pos: Vector2, image, width, height) {
        this.position = pos;
        this.velocity = new Vector2(0, 0);

        this.image = image;
        this.width = width;
        this.height = height;

        this.zIndex = 0;

        this.OnLateUpdate = new EventSystem();
        this.OnRender = new EventSystem();
        this.OnUpdate = new EventSystem();
    }

    render() {
        this.OnRender.Invoke();

        this.scene.context.beginPath();

        this.scene.context.drawImage(this.image, this.position.x + this.scene.offset.x, this.position.y + this.scene.offset.y, this.width, this.height);

        this.scene.context.closePath();
    }

   set Scene(scene : Scene2d) {
        this.scene = scene;
   }

    set ZIndex(zIndex : number) {
        this.zIndex = zIndex;
    }

    public update() {
        this.OnUpdate.Invoke();

        this.position.add(this.velocity);
    }



    lateUpdate() {
        this.OnLateUpdate.Invoke();
    }
}
