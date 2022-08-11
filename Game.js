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
    anyKey: false,
    upResetted: true,
    downResetted: true,
    leftResetted: true,
    rightResetted: true,
    enterResetted: true,
    exitResetted: true,
    anyKeyResetted: true,
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

function readInputs() {
    // TODO borrar
}

function updatePlay() {

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
