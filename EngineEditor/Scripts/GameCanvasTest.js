const canvasCenterX = canvasOverlay.offsetWidth/2 + canvasOverlay.getBoundingClientRect().x;
const canvasCenterY = canvasOverlay.offsetHeight/2 + canvasOverlay.getBoundingClientRect().y;


engineScene.addGameObject(new Circle(new Vector2(canvasCenterX, canvasCenterY), 50, "red", true));