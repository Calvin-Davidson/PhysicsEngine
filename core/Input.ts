class Input {

    private static instance;
    private keysDown : string[];
    private keys : string[]
    private keysUp : string[]
    constructor() {
        Input.instance = this;

        this.keysDown = [];
        this.keys = [];
        this.keysUp = [];

        this.initEvents();
    }

    update() {
        this.keysDown = [];
        this.keysUp = [];
    }

    static get Instance() {
        return Input.instance != null ? Input.instance : new Input();
    }

    static getKeyDown(key) {
        return (Input.Instance.keysDown.includes(key))
    }

    static getKeyUp(key) {
        return (Input.Instance.keysUp.includes(key))
    }

    static getKey(key) {
        return (Input.Instance.keys.includes(key))
    }

    private initEvents() {
        document.addEventListener("keyup", function (e) {
            if (!Input.Instance.keys.includes(e.key)) return;
            const index = Input.Instance.keys.indexOf(e.key);
            Input.Instance.keys.splice(index, 1);
            Input.Instance.keysUp.push(e.key);
        })
        document.addEventListener("keydown", function (e) {
            if (e.repeat) return;
            if (Input.Instance.keys.includes(e.key)) return;
            Input.Instance.keys.push(e.key);
            Input.Instance.keysDown.push(e.key);
        })

    }
}

new Input();