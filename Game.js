const canvas = document.getElementById("mula-canvas");
const ctx = canvas.getContext("2d");

const GameScreens = {
	StartMenu: 0,
	Play: 1,
	GameOver: 2,
}

const inputs = {
    left: false,
    right: false,
    leftResetted: true,
    rightResetted: true,
    start: false,
    exit: false,
}
let gameState;
function resetGameState() {
    gameState = {
        mula: new Mula(300, 900, ctx),
        villain: new Villain(ctx),
        fallingItems: [],
        difficulty: 0,
        score: 0,
        screen: GameScreens.Play,
    }
}


// TODO Rehabilitar en producción
// window.onbeforeunload = function() {
//     return "MULA";
// };

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

function updatePlay() {
    if (inputs.left) {
        gameState.mula.commandToLeft();
        inputs.left = false;
    }
    if (inputs.right) {
        gameState.mula.commandToRight();
        inputs.right = false;
    }

    // Actualización de entidades
    gameState.mula.updatePos();
    const newFallingItem = gameState.villain.update();
    if (newFallingItem) {
        gameState.fallingItems.push(newFallingItem);
    }
    for (let i = 0; i < gameState.fallingItems.length; ++i) {
        gameState.fallingItems[i].updatePos();
    }

    // Eliminación de objetos que se pueden eliminar
    for (let i = (gameState.fallingItems.length - 1); i >= 0; --i) {
        [x, y] = gameState.fallingItems[i].getPoint();
        const isInside = gameState.mula.catchesGoody(x, y);
        if (isInside) {
            gameState.fallingItems[i].canBeDeleted = true;
            gameState.score++;
        }

        if (gameState.fallingItems[i].fallen) {
            gameState.screen = GameScreens.GameOver;
        }

        if (gameState.fallingItems[i].canBeDeleted) {
            gameState.fallingItems.splice(i, 1);
        }
    }
}

function updateState() {
    switch (gameState.screen) {
        case (GameScreens.StartMenu): {
            // TODO
            break;
        }
        case (GameScreens.Play): {
            updatePlay();
            break;
        }
        case (GameScreens.GameOver): {
            // TODO
            break;
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

    gameState.mula.drawDebugGoodBounding();
    gameState.villain.drawDebugPoint();
    for (let i = 0; i < gameState.fallingItems.length; ++i) {
        gameState.fallingItems[i].drawDebugPoint();
    }


    ctx.font = "60px Arial";
    ctx.fillStyle = "rgb(150, 0, 0)";
    ctx.fillText(`${gameState.score}`, 1800, 80);

    if (gameState.screen == GameScreens.GameOver) {
        ctx.rect(
            canvas.width / 4, canvas.height / 4,
            canvas.width / 2, canvas.height / 2
        );
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fill();
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
    }
}
function loop() {
    readInputs();
    updateState();
    draw();
    window.requestAnimationFrame(loop);
}
function init() {
    resetGameState();
    window.requestAnimationFrame(loop);
}
init();
