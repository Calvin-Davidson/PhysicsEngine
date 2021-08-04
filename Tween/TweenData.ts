abstract class TweenData {
    protected gameObject : GameObject2d;
    protected speed : number;
    protected tweenFunction : Function;
    protected started : boolean;

    onComplete : EventSystem;
    onStart : EventSystem;
    onUpdate : EventSystem;

    private percentage : number;

    constructor(gameObject, speed, methode) {
        this.gameObject = gameObject;
        this.speed = speed;
        this.tweenFunction = methode;
    }

    get isFinished() {
        return (this.percentage >= 1);
    }

    public UpdateTween() {
        if (!this.started) {
            this.started = true;
            this.onStart.Invoke();
        }

        this.onUpdate?.Invoke();
        if (this.percentage < 1)
        {
            this.percentage += this.speed;
            let easingstep = this.tweenFunction(this.percentage);
            this.Update(easingstep);
            return;
        }

        this.Complete();
        this.onComplete.Invoke();
    }

    protected abstract Complete();
    protected abstract Update(easingValue);
}