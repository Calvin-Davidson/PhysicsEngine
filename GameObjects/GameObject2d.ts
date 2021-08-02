abstract class GameObject2d implements Renderable, VelocityObject {
    zIndex : number;
    velocity : Vector2;
    position : Vector2;
    scene : Scene2d;

    OnLateUpdate : EventSystem;
    OnRender : EventSystem;
    OnUpdate : EventSystem;

    abstract update();
    abstract render();
    abstract lateUpdate();
}