const canvas = document.getElementById("mula-canvas");
const ctx = canvas.getContext("2d");

const inputs = new Map();

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
    if (inputs.has(event.key)) {
        const input = inputs.get(event.key);
        if (input.isResetted()) {
            input.activate();
        }
    } else {
        inputs.set(event.key, new Input());
    }

    if (inputs.has("AnyKey")) {
        if (Input.anyKey.isResetted()) {
            Input.anyKey.activate();
        }
    } else {
        inputs.set("AnyKey", Input.anyKey);
    }
});

window.addEventListener("keyup", (event) => {
    inputs.get(event.key).reset();
    inputs.get("AnyKey").reset();
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
