document.getElementById("AddCircleObject").addEventListener("mousedown", function (e) {
})

document.getElementById("AddBigCircleObject").addEventListener("mousedown", function (e) {
})

document.getElementById("AddHugeCircleObject").addEventListener("mousedown", function (e) {
})
document.getElementById("ClearObjects").addEventListener("mousedown", function (e) {
})

document.getElementById("ResetButton").addEventListener("mousedown", function (e) {
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