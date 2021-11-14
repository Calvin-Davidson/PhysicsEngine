document.getElementById("AddCircleObject").addEventListener("mousedown", function (e) {
    addCircle(width/2, height/2, Math.min(width, height) * 0.2);
})

document.getElementById("AddBigCircleObject").addEventListener("mousedown", function (e) {
    addCircle(width/2, height/2, Math.min(width, height) * 0.3);
})

document.getElementById("AddHugeCircleObject").addEventListener("mousedown", function (e) {
    addCircle(width/2, height/2, Math.min(width, height) * 0.4);
})

document.getElementById("AddCubeObject").addEventListener("mousedown", function (e) {
    let size = Math.min(width, height) * 0.4;
    addCube(width/2-size/2, height/2-size/2, size, size);
})

document.getElementById("AddBigCubeObject").addEventListener("mousedown", function (e) {
    let size = Math.min(width, height) * 0.6;
    addCube(width/2-size/2, height/2-size/2, size, size);
})

document.getElementById("AddHugeCubeObject").addEventListener("mousedown", function (e) {
    let size = Math.min(width, height) * 0.8;
    addCube(width/2-size/2, height/2-size/2, size, size);
})


document.getElementById("ClearObjects").addEventListener("mousedown", function (e) {
    for (let i = obstacles.length - 1; i >= 0; i--) obstacles.splice(i, 1);
    for (let i = obstaclesScene.gameObjects.length - 1; i >= 0; i--) obstaclesScene.gameObjects.splice(i, 1);
    pathFinding.blockingObjects = obstacles;
    pathFinding.updatePath();
})

document.getElementById("ResetButton").addEventListener("mousedown", function (e) {
    window.location.reload();
})

document.getElementById("ShowAndHideGrid").addEventListener("mousedown", function (e) {
   let Button = document.getElementById("ShowAndHideGrid").children[0];
   if (Button.innerHTML === "ShowGrid") {
       Button.innerHTML = "HideGrid";
       ShowGrid = true;
   } else {
       Button.innerHTML = "ShowGrid";
        ShowGrid = false;
   }
});


document.getElementById("MovementDelay1").addEventListener("mousedown", function (e) {
    moveDelay = 0;
});

document.getElementById("MovementDelay2").addEventListener("mousedown", function (e) {
    moveDelay = 2;
});

document.getElementById("MovementDelay3").addEventListener("mousedown", function (e) {
    moveDelay = 4;
});