class GameOver extends GameScreen {
    constructor() {
        super();
    }

    handleInputs() {

    }

    update() {
        if (GameScreen.inputs.enter) {
            GameScreen.currentScreen = new Play();
            GameScreen.inputs.enter = false;
        }
    }

    draw() {    
        GameScreen.ctx.beginPath();
        GameScreen.ctx.rect(
            GameScreen.width / 4, GameScreen.height / 4,
            GameScreen.width / 2, GameScreen.height / 2
        );
        GameScreen.ctx.fillStyle = "rgb(255, 255, 255)";
        GameScreen.ctx.fill();
        GameScreen.ctx.fillStyle = "rgb(0, 0, 0)";
        GameScreen.ctx.textAlign = "center";
        GameScreen.ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
    }
}