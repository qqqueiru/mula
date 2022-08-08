const canvas = document.getElementById("mula-canvas");
const ctx = canvas.getContext("2d");

// const GameScreens = {
// 	StartMenu: 0,
// 	Play: 1,
// 	GameOver: 2,
// }

// const GameOverOptions = {
//     Restart: 0,
//     Help: 1,
//     About: 2,
// }

const inputs = {
    up: false,
    down: false,
    left: false,
    right: false,
    enter: false,
    exit: false,
    upResetted: true,
    downResetted: true,
    leftResetted: true,
    rightResetted: true,
    enterResetted: true,
    exitResetted: true,
}
let gameState;  // TODO trasladar a la pantalla 
function resetGameState() {
    gameState = {
        mula: new Mula(300, 900, ctx),
        villain: new Villain(ctx),
        fallingItems: [],
        difficulty: 0,
        score: 0,
        // screen: GameScreens.Play,
        // gameOverMenu: new Menu(),
        // gameOverOption: GameOverOptions.Restart,
    }
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
});

window.addEventListener("keyup", (event) => {
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

function updateGameOver() {
    if (inputs.up) {
        if (gameState.game)
        gameState.gameOverOption--;
        if (gameState.gameOverOption < 0) {
            gameState.gameOverOption = Object.keys(GameOverOptions).length - 1;
        }
        inputs.up = false;
    }
    if (inputs.down) {
        gameState.gameOverOption++;
        if (gameState.gameOverOption > (Object.keys(GameOverOptions).length - 1)) {
            gameState.gameOverOption = 0;
        }
        inputs.down = false;
    }
    if (inputs.enter) {

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
            updateGameOver();
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
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
    }
}
function loop() {
    // readInputs();
    // updateState();
    // draw();

    GameScreen.currentScreen.runIteration();

    window.requestAnimationFrame(loop);
}
function init() {
    resetGameState();
    window.requestAnimationFrame(loop);
    // setInterval(loop, 1000 / 60);
}
init();
