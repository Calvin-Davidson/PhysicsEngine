class Engine {
    scenes: Scene2d[];

    OnUpdate: EventSystem;
    OnLateUpdate: EventSystem;

    constructor() {
        console.log("Setting up Engine");

        this.scenes = [];
        this.OnUpdate = new EventSystem();
        this.OnLateUpdate = new EventSystem();

        setInterval((me = this) => this.update(), 1);

        console.log("The engine is ready to be used");
    }


    update() {
        this.OnUpdate.Invoke();

        for (let i = 0; i < this.scenes.length; i++) {
            this.scenes[i].update();
        }

        for (let i = 0; i < this.scenes.length; i++) {
            this.scenes[i].render();
        }

        for (let i = 0; i < this.scenes.length; i++) {
            this.scenes[i].lateUpdate();
        }
    }

    createScene(zIndex = 0) {
        for (let i = 0; i < this.scenes.length; i++) {
            if (this.scenes[i].zIndex >= zIndex) {
                let scene = new Scene2d(zIndex);
                this.scenes.splice(i, 0, scene);
                return scene;
            }
        }
        this.scenes.push(new Scene2d(zIndex));
        return this.scenes[this.scenes.length - 1];
    }
}


const engine = new Engine();