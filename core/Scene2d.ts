class Scene2d {
    gameObjects: GameObject2d[];

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    zIndex: number;


    OnUpdate: EventSystem;
    OnRender: EventSystem;
    OnLateUpdate: EventSystem;

    constructor(zIndex: number = 0) {
        this.zIndex = zIndex;

        this.gameObjects = [];

        this.canvas = document.createElement("canvas");
        this.canvas.style.position = "absolute";

        this.context = this.canvas.getContext('2d');

        this.canvas.style.margin = '0px';
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;


        this.OnUpdate = new EventSystem();
        this.OnRender = new EventSystem();
        this.OnLateUpdate = new EventSystem();

        document.addEventListener("resize", () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });

        document.body.appendChild(this.canvas)
    }


    update() {
        this.OnUpdate.Invoke();

        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].update();
        }
    }

    render() {
        this.context.clearRect(0,0,window.innerWidth, window.innerHeight);

        this.OnRender.Invoke();

        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].render();
        }
    }

    lateUpdate() {
        this.OnLateUpdate.Invoke();

        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].lateUpdate();
        }
    }

    addGameObject(gameObject: GameObject2d) {
        gameObject.scene = this;
        for (let i = 0; i < this.gameObjects.length; i++) {
            if (this.gameObjects[i].zIndex >= gameObject.zIndex) {
                this.gameObjects.splice(i, 0, gameObject);
                return;
            }
        }

        this.gameObjects.push(gameObject);
    }

    addGameObjects(...values) {
        values.forEach(value => this.addGameObject(value));
    }

}