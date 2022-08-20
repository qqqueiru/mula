const canvas = document.getElementById("mula-canvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

const inputs = new Map();

GameScreen.inputs = inputs;
GameScreen.ctx = ctx;
GameScreen.currentScreen = new LoadingScreen();
GameScreen.width = canvas.width;
GameScreen.height = canvas.height;


// TODO Rehabilitar en producción
// window.onbeforeunload = function() {
//     return "MULA";
// };

// Desaparición del cursor cuando está inactivo sobre el canvas
{
    let mouseTimer = null;
    let cursorVisible = true;
    function disappearCursor() {
        mouseTimer = null;
        canvas.style.cursor = "none";
        cursorVisible = false;
    }
    canvas.onmousemove = function() {
        if (mouseTimer) {
            clearTimeout(mouseTimer);
        }
        if (!cursorVisible) {
            canvas.style.cursor = "default";
            cursorVisible = true;
        }
        mouseTimer = setTimeout(disappearCursor, 2500);
    };
}


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
    inputs.get(event.key)?.reset();
    inputs.get("AnyKey")?.reset();
});

function loop() {
    GameScreen.currentScreen.runIteration();
    window.requestAnimationFrame(loop);
    for (const input of GameScreen.inputs.values()) {
        input.consumeIfActivated();  // Si la iteración actual no consumió el input, hay que consumirlo para que no se malinterprete en la próxima iteración
    }
}
function init() {
    window.requestAnimationFrame(loop);
    // setInterval(loop, 1000 / 60);
}
init();
