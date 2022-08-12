class PressAnyKey extends GameScreen {
    constructor() {
        super();
        this.t = 0;
    }

    handleInputs() {

    }

    update() {
        if (inputs.anyKey) {
            GameScreen.currentScreen = new Menu();
            inputs.anyKey = false;
        }
    }

    draw() {
        GameScreen.ctx.beginPath();

        GameScreen.ctx.clearRect(0, 0, GameScreen.width, GameScreen.height);
        GameScreen.ctx.rect(0, 0, GameScreen.width, GameScreen.height);
        GameScreen.ctx.fillStyle = "rgb(0, 0, 0)";
        GameScreen.ctx.fill();
    
        this.t += 0.15;
        const fontSize = 50 + 5 * Math.sin(this.t);
        GameScreen.ctx.font = `bold ${fontSize}px Arial`;
        GameScreen.ctx.textAlign = "center";

        GameScreen.ctx.fillStyle = "rgb(255, 255, 0)";
        GameScreen.ctx.fillText(`PRESS ANY KEY`, GameScreen.width / 2, GameScreen.height * 0.8);

        // ctx.endPath();
    }
}