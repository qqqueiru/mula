class StartMenu extends GameScreen {
    #menus;
    constructor() {
        super();
        this.#menus = {
            currentMenu: "mainMenu",
            mainMenu: {
                currentOptionIndex: 0,
                drawHandle: (optIdx)=>{this.#drawMainMenu(optIdx)},
                options: [
                    {
                        name: "START",
                        updateHandle: ()=>{this.#startGame()},
                    },
                    {
                        name: "HELP",
                        updateHandle: ()=>{this.#openHelpMenu()},
                    },
                    {
                        name: "ABOUT",
                        updateHandle: ()=>{this.#openAboutMenu()},
                    },
                ],
            },
            helpMenu: {
                currentOptionIndex: 0,
                drawHandle: (optIdx)=>{this.#drawHelpMenu(optIdx)},
                options: [
                    {
                        name: "BACK",
                        updateHandle: ()=>{this.#backToMainMenu()},
                    },
                ],
            },
            aboutMenu: {
                currentOptionIndex: 0,
                drawHandle: (optIdx)=>{this.#drawAboutMenu(optIdx)},
                options: [
                    {
                        name: "BACK",
                        updateHandle: ()=>{this.#backToMainMenu()},
                    },
                ],
            },
        };
    }

    #playEnterAudio() {
        const newEnterAudio = new Audio();
        newEnterAudio.src = AudioManager.getAudio("enter").src;
        newEnterAudio.play();
    }

    #playBackAudio() {
        const newBackAudio = new Audio();
        newBackAudio.src = AudioManager.getAudio("back").src;
        newBackAudio.play();
    }

    #playSelectionAudio(direction) {
        const newSelectionAudio = new Audio();
        newSelectionAudio.src = AudioManager.getAudio(direction).src;
        newSelectionAudio.play();
    }

    #startGame() {
        this.#playEnterAudio();
        GameScreen.currentScreen = new Play();
    }

    #openHelpMenu() {
        this.#playEnterAudio();
        this.#menus.currentMenu = "helpMenu";
    }

    #openAboutMenu() {
        this.#playEnterAudio();
        this.#menus.currentMenu = "aboutMenu";
    }

    #backToMainMenu() {
        this.#playBackAudio();
        this.#menus.currentMenu = "mainMenu";
    }

    #drawMainMenu(currentOptionIndex) {
        GameScreen.ctx.fillStyle = "rgb(0, 0, 0)";
        GameScreen.ctx.textAlign = "center";
        GameScreen.ctx.font = `bold ${Math.floor(0.055 * GameScreen.height)}px SigmarOne`;
        GameScreen.ctx.fillText("MULA", Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.4));
        GameScreen.ctx.font = `bold ${Math.floor(0.028 * GameScreen.height)}px SigmarOne`;
        const optionsHeight = 0.54;
        const optionsSpacing = 0.04;
        GameScreen.ctx.fillText("START", Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 0)));
        GameScreen.ctx.fillText("HELP", Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 1)));
        GameScreen.ctx.fillText("ABOUT", Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 2)));

        // Rectangulito para indicar seleccion actual
        GameScreen.ctx.beginPath();
        GameScreen.ctx.rect(
            Math.floor(GameScreen.width * 0.40), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex - 0.02)),
            Math.floor(GameScreen.width * 0.01), Math.floor(GameScreen.height * 0.02)
        );
        GameScreen.ctx.fillStyle = "rgb(255, 0, 0)";
        GameScreen.ctx.fill();
    }

    #drawHelpMenu(currentOptionIndex) {
        GameScreen.ctx.fillStyle = "rgb(0, 0, 0)";
        GameScreen.ctx.textAlign = "center";
        GameScreen.ctx.font = `bold ${Math.floor(0.028 * GameScreen.height)}px SigmarOne`;
        const optionsHeight = 0.54;
        const optionsSpacing = 0.04;
        GameScreen.ctx.fillText("BACK", Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 0)));

        // Rectangulito para indicar seleccion actual
        GameScreen.ctx.beginPath();
        GameScreen.ctx.rect(
            Math.floor(GameScreen.width * 0.40), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex - 0.02)),
            Math.floor(GameScreen.width * 0.01), Math.floor(GameScreen.height * 0.02)
        );
        GameScreen.ctx.fillStyle = "rgb(255, 0, 0)";
        GameScreen.ctx.fill();
    }

    #drawAboutMenu(currentOptionIndex) {
        GameScreen.ctx.fillStyle = "rgb(0, 0, 0)";
        GameScreen.ctx.textAlign = "center";
        GameScreen.ctx.font = `bold ${Math.floor(0.028 * GameScreen.height)}px SigmarOne`;
        const optionsHeight = 0.54;
        const optionsSpacing = 0.04;
        GameScreen.ctx.fillText("BACK", Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 0)));

        // Rectangulito para indicar seleccion actual
        GameScreen.ctx.beginPath();
        GameScreen.ctx.rect(
            Math.floor(GameScreen.width * 0.40), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex - 0.02)),
            Math.floor(GameScreen.width * 0.01), Math.floor(GameScreen.height * 0.02)
        );
        GameScreen.ctx.fillStyle = "rgb(255, 0, 0)";
        GameScreen.ctx.fill();
    }

    handleInputs() {

    }

    update() {
        if (
            GameScreen.inputs.get("ArrowUp")?.consumeIfActivated() ||
            GameScreen.inputs.get("ArrowLeft")?.consumeIfActivated()
        ) {
            const currentOptionIndex = --this.#menus[this.#menus.currentMenu].currentOptionIndex;
            const optionsLength = this.#menus[this.#menus.currentMenu].options.length;
            if (currentOptionIndex < 0) {
                this.#menus[this.#menus.currentMenu].currentOptionIndex = optionsLength - 1;
            }
            this.#playSelectionAudio("left");
        }
        if (
            GameScreen.inputs.get("ArrowDown")?.consumeIfActivated() ||
            GameScreen.inputs.get("ArrowRight")?.consumeIfActivated()
        ) {
            const currentOptionIndex = ++this.#menus[this.#menus.currentMenu].currentOptionIndex;
            const optionsLength = this.#menus[this.#menus.currentMenu].options.length;
            if (currentOptionIndex >= optionsLength) {
                this.#menus[this.#menus.currentMenu].currentOptionIndex = 0;
            }
            this.#playSelectionAudio("right");
        }

        if (
            GameScreen.inputs.get("Enter")?.consumeIfActivated() ||
            GameScreen.inputs.get(" ")?.consumeIfActivated()
        ) {
            const currentMenu = this.#menus.currentMenu;
            const currentOptionIndex = this.#menus[currentMenu].currentOptionIndex;
            const updateHandleFunction = this.#menus[currentMenu].options[currentOptionIndex].updateHandle;
            updateHandleFunction();
        }

        if (
            GameScreen.inputs.get("Backspace")?.consumeIfActivated() ||
            GameScreen.inputs.get("Escape")?.consumeIfActivated()
        ) {
            this.#backToMainMenu();
        }
    }

    draw() {
        GameScreen.ctx.beginPath();
        GameScreen.ctx.clearRect(0, 0, GameScreen.width, GameScreen.height);
        GameScreen.ctx.rect(0, 0, GameScreen.width, GameScreen.height);
        GameScreen.ctx.fillStyle = "rgb(150, 150, 150)";
        GameScreen.ctx.fill();

        GameScreen.ctx.beginPath();
        GameScreen.ctx.rect(
            Math.floor(GameScreen.width / 4), Math.floor(GameScreen.height / 4),
            Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height / 2)
        );
        GameScreen.ctx.fillStyle = "rgb(255, 255, 255)";
        GameScreen.ctx.fill();

        const currentMenu = this.#menus.currentMenu;
        const drawHandleFunction = this.#menus[currentMenu].drawHandle;
        const currentOptionIndex = this.#menus[currentMenu].currentOptionIndex;
        drawHandleFunction(currentOptionIndex);
    }
}
