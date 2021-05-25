class Engine {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    constructor() {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext('2d');

        document.body.style.margin = "0px";
        document.body.style.overflowY = "hidden";
        this.canvas.style.margin = '0px';
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        document.body.appendChild(this.canvas)
        Engine.Instance = this;

        console.log(Engine.Instance);

        document.addEventListener("resize", () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }

    public static Instance : Engine;
}