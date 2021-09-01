let rightMouseInCanvas = false;
let prevX = 0;
let prevY = 0;

let canvasOffsetX = 0;
let canvasOffsetY = 0;

canvasOverlay.addEventListener("mousedown", function(e) {
    e.preventDefault();
    if (e.button === 2) rightMouseInCanvas = true;
})

document.addEventListener("mouseup", function(e) {
    e.preventDefault();
    if (e.button === 2) rightMouseInCanvas = false;
})


document.addEventListener("mousemove", function(e) {
    // Client is dragging after right clicking in the canvas, moving the canvas.
    if (rightMouseInCanvas && prevX !== e.pageX && prevY !== e.pageY) {
        let deltaX = -(prevX - e.pageX) * moveSpeed;
        let deltaY = -(prevY - e.pageY) * moveSpeed;

        canvasOffsetX += deltaX;
        canvasOffsetY += deltaY;

        canvasOverlay.style.backgroundPosition = canvasOffsetX + "px " + canvasOffsetY + "px";
        engineScene.offset = new Vector2(canvasOffsetX, canvasOffsetY);
    }
    prevX = e.pageX;
    prevY = e.pageY;
})


document.addEventListener('contextmenu', event => event.preventDefault());
