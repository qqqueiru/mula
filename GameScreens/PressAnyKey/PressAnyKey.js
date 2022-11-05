class PressAnyKey extends GameScreen {
    constructor() {
        super();
        this.t = 0;
    }

    handleInputs() {

    }

    update() {
        if (GameScreen.inputs.get("AnyKey")?.consumeIfActivated()) {
            GameScreen.currentScreen = new StartMenu();
        }
    }

    draw() {
        GameScreen.ctx.beginPath();

        GameScreen.ctx.clearRect(0, 0, GameScreen.width, GameScreen.height);
        GameScreen.ctx.rect(0, 0, GameScreen.width, GameScreen.height);
        GameScreen.ctx.fillStyle = "rgb(0, 0, 0)";
        GameScreen.ctx.fill();
    
        this.t += 0.15;
        const fontSize = 50;  // + 5 * Math.sin(this.t);
        GameScreen.ctx.font = `bold ${fontSize}px SigmarOne`;
        GameScreen.ctx.textAlign = "center";

        GameScreen.ctx.fillStyle = "rgb(255, 255, 0)";
        // GameScreen.ctx.strokeStyle = "rgb(255, 0, 0)";
        // GameScreen.ctx.lineWidth = 1;
        GameScreen.ctx.fillText(
            `PRESS ANY KEY`, 
            Math.floor(GameScreen.width / 2 + 20 * Math.sin(this.t)),
            Math.floor(GameScreen.height * 0.5)
        );
        // GameScreen.ctx.strokeText(`PRESS ANY KEY`, GameScreen.width / 2, GameScreen.height * 0.5);

        // ctx.endPath();
    }
}