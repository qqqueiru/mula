class LoadingScreen extends GameScreen {
    #progress;
    constructor() {
        super();
        this.#progress = 0;

        ImageManager.loadImages();
    }

    handleInputs() {

    }

    update() {
        this.#progress = ImageManager.imgsLoaded();
        // this.#progress += 0.01;
        if (this.#progress >= 1) {
            GameScreen.currentScreen = new PressAnyKey();
        }
    }

    draw() {
        GameScreen.ctx.beginPath();

        GameScreen.ctx.clearRect(0, 0, GameScreen.width, GameScreen.height);
        GameScreen.ctx.rect(0, 0, GameScreen.width, GameScreen.height);
        GameScreen.ctx.fillStyle = "rgb(0, 0, 0)";
        GameScreen.ctx.fill();
    
        const fontSize = 50;
        GameScreen.ctx.font = `bold ${fontSize}px Arial`;
        GameScreen.ctx.textAlign = "right";

        GameScreen.ctx.fillStyle = "rgb(255, 255, 0)";
        const percentage = Math.floor(this.#progress * 100);
        GameScreen.ctx.fillText(`${percentage} %`, GameScreen.width / 2 + 75, GameScreen.height * 0.8);

        // ctx.endPath();
    }
}