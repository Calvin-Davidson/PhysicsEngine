class TweenPosition2d extends TweenData {

    protected startPos : Vector2;
    protected targetPos : Vector2;
    protected direction : Vector2;

    constructor(gameobject, targetPos, speed, methode) {
        super(gameobject, speed, methode);

        this.targetPos = targetPos;
        this.startPos = gameobject.position;
        this.direction = new Vector2(targetPos.x - this.startPos.x, targetPos.y - this.startPos.y);
    }

    protected Complete() {
        this.gameObject.position = this.targetPos;
    }

    protected Update(easingValue) {
        let newPosition = new Vector2(this.direction.x * easingValue, this.direction.y * easingValue);
        newPosition.add(this.startPos);
        this.gameObject.position = newPosition;
    }

}