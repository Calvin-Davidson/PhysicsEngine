class TweenController {

    static tweenController : TweenController;

    ActiveTweens : TweenData[];

    constructor() {
        TweenController.tweenController = this;
        this.ActiveTweens = [];
    }

    public UpdateTweens() {
        for (let i = this.ActiveTweens.length - 1; i >= 0; i--) {
            this.ActiveTweens[i].UpdateTween();
            if (!this.ActiveTweens[i].isFinished) continue;
            this.ActiveTweens.splice(i, 1);
        }
    }

    static Instance() : TweenController {
        return TweenController.tweenController == null ? new TweenController() : TweenController.tweenController;
    }
}