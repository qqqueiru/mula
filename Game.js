const canvas = document.getElementById("mula-canvas");
const ctx = canvas.getContext("2d");

const inputs = {
    left: false,
    right: false,
    leftResetted: true,
    rightResetted: true,
    start: false,
    exit: false,
}
const gameState = {
    mula: new Mula(150, 900, ctx),
    fallingItems: [],
    difficulty: 0,
    score: 0,
    framesUntilNextFallingItem: 60,
};

window.addEventListener("keydown", (event) => {
    if (event.keyCode == 70 || event.keyCode == 37)  // F or "ArrowLeft"
    {
        if (inputs.leftResetted) {
            inputs.left = true;
            inputs.leftResetted = false;
        }
    }
    if (event.keyCode == 74 || event.keyCode == 39)  // J or "ArrowRight"
    {
        if (inputs.rightResetted) {
            inputs.right = true;
            inputs.rightResetted = false;
        }
    }
});

window.addEventListener("keyup", (event) => {
    if (event.keyCode == 70 || event.keyCode == 37)  // F or "ArrowLeft"
    {
        inputs.leftResetted = true;
    }
    if (event.keyCode == 74 || event.keyCode == 39)  // J or "ArrowRight"
    {
        inputs.rightResetted = true;
    }
});

function readInputs() {
    // TODO borrar
}
function updateState() {
    if (inputs.left) {
        gameState.mula.commandToLeft();
        inputs.left = false;
    }
    if (inputs.right) {
        gameState.mula.commandToRight();
        inputs.right = false;
    }

    // Actualización de posiciones
    gameState.mula.updatePos();
    for (let i = 0; i < gameState.fallingItems.length; ++i) {
        gameState.fallingItems[i].updatePos();
    }

    // Gestión de los objetos en caída libre.
    gameState.framesUntilNextFallingItem--;
    if (gameState.framesUntilNextFallingItem <= 0) {
        const fallingItemTest = new FallingItem(600 + Math.random() * 600, 150 + Math.random() * 30, 4, ctx);
        gameState.fallingItems.push(fallingItemTest);
        gameState.framesUntilNextFallingItem = 60;
    }
    // Eliminación de objetos que se pueden eliminar
    for (let i = (gameState.fallingItems.length - 1); i >= 0; --i) {
        if (gameState.fallingItems[i].canBeDeleted) {
            gameState.fallingItems.splice(i, 1);
        }
    }


}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(150, 150, 150)";
    ctx.fill();

    // const p = new Path2D('m 32.423215,101.64019 17.226952,-34.041938 40.65784,-0.107456 14.574913,33.595634 5.69533,-33.778278 9.57132,-29.303957 17.40239,18.23567 8.70119,-1.966633 L 119.79987,14.366847 103.67653,41.180492 43.336938,37.059475 19.922809,60.216901 41.754898,49.8471 Z');
    // ctx.stroke(p);

    for (let i = 0; i < gameState.fallingItems.length; ++i) {
        gameState.fallingItems[i].drawDebugPoint();
    }
    gameState.mula.drawDebugGoodBounding();
}
function loop() {
    readInputs();
    updateState();
    draw();
    window.requestAnimationFrame(loop);
}
function init() {
    window.requestAnimationFrame(loop);
}
init();