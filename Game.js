const canvas = document.getElementById("mula-canvas");
const ctx = canvas.getContext("2d");

const inputs = {
    up: false,
    down: false,
    left: false,
    right: false,
    enter: false,
    exit: false,
    anyKey: false,
    upResetted: true,
    downResetted: true,
    leftResetted: true,
    rightResetted: true,
    enterResetted: true,
    exitResetted: true,
    anyKeyResetted: true,
}

GameScreen.inputs = inputs;
GameScreen.ctx = ctx;
GameScreen.currentScreen = new PressAnyKey();
GameScreen.width = canvas.width;
GameScreen.height = canvas.height;


// TODO Rehabilitar en producción
// window.onbeforeunload = function() {
//     return "MULA";
// };

window.addEventListener("keydown", (event) => {
    inputs.anyKey = true;
    inputs.anyKeyResetted = false;
    if (event.key == "ArrowLeft")
    {
        if (inputs.leftResetted) {
            inputs.left = true;
            inputs.leftResetted = false;
        }
    }
    if (event.key == "ArrowRight")
    {
        if (inputs.rightResetted) {
            inputs.right = true;
            inputs.rightResetted = false;
        }
    }
    if (event.key == "ArrowUp")
    {
        if (inputs.upResetted) {
            inputs.up = true;
            inputs.upResetted = false;
        }
    }
    if (event.key == "ArrowDown")
    {
        if (inputs.downResetted) {
            inputs.down = true;
            inputs.downResetted = false;
        }
    }
    if (event.key == "Enter")
    {
        if (inputs.enterResetted) {
            inputs.enter = true;
            inputs.enterResetted = false;
        }
    }
});

window.addEventListener("keyup", (event) => {
    inputs.anyKeyResetted = false;
    if (event.key == "ArrowLeft")
    {
        inputs.leftResetted = true;
    }
    if (event.key == "ArrowRight")
    {
        inputs.rightResetted = true;
    }
    if (event.key == "ArrowUp")
    {
        inputs.upResetted = true;
    }
    if (event.key == "ArrowDown")
    {
        inputs.downResetted = true;
    }
    if (event.key == "Enter")
    {
        inputs.enterResetted = true;
    }
});

function loop() {
    GameScreen.currentScreen.runIteration();
    window.requestAnimationFrame(loop);
}
function init() {
    window.requestAnimationFrame(loop);
    // setInterval(loop, 1000 / 60);
}
init();
