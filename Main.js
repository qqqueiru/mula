// TODO pensar en una alternativa a canvas, para ver si mejora el rendimiento
const canvas = document.getElementById("mula-canvas");
const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
ctx.imageSmoothingEnabled = false;

const inputs = new Map();

GameScreen.imgScale = 4;  // Las imágenes se han diseñado de modo que 1 px de imagen corresponde a 1 px de una pantalla 480x270 px
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

if (navigator.maxTouchPoints)
{
    window.addEventListener("mousedown", (event) => {
        // NOTE: Tal vez convenga ubicar el criterio de si es enter, left o right en las distintas pantallas de juego
        // Por ahora se añade la escucha a ratón para probar el soporte en pantallas táctiles
        // WARNING: Puede haber bug si se utiliza el teclado al mismo tiempo
        // NOTE: Tal vez convenga que las opciones en los menús se alineen horizontalmente
        let inputToAdd = "Enter";
        const x = event.clientX / document.body.clientWidth;
        if (x < 0.4)
        {
            inputToAdd = "ArrowLeft";
        }
        else if (x > 0.6)
        {
            inputToAdd = "ArrowRight";
        }
        if (inputs.has(inputToAdd)) {
            const input = inputs.get(inputToAdd);
            if (input.isResetted()) {
                input.activate();
            }
        } else {
            inputs.set(inputToAdd, new Input());
        }

        if (inputs.has("AnyKey")) {
            if (Input.anyKey.isResetted()) {
                Input.anyKey.activate();
            }
        } else {
            inputs.set("AnyKey", Input.anyKey);
        }
    });
    window.addEventListener("mouseup", (event) => {
        inputs.get("Enter")?.reset();
        inputs.get("ArrowLeft")?.reset();
        inputs.get("ArrowRight")?.reset();
        inputs.get("AnyKey")?.reset();
    });
}

function loop() {
    GameScreen.currentScreen.runIteration();
    window.requestAnimationFrame(loop);
    for (const input of GameScreen.inputs.values()) {
        input.consumeIfActivated();  // Si la iteración actual no consumió el input, hay que consumirlo para que no se malinterprete en la próxima iteración
    }
}
function init() {
    window.requestAnimationFrame(loop);  // El juego se ha diseñado para que se juegue a 60 FPS. Se espera que esta función cumpla este requisito
    // setInterval(loop, 1000 / 60);
}
init();
