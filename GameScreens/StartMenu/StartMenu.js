class StartMenu extends GameScreen {
    #menus;
    #fadeInCircleRadius = 0;
    #fontColor = "#e91e63";
    #t = 0;
    #selectionSquareX;
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

    #startGame() {
        AudioManager.playSoundEffect("enter");
        GameScreen.currentScreen = new Play();
    }

    #openHelpMenu() {
        AudioManager.playSoundEffect("enter");
        this.#menus.currentMenu = "helpMenu";
    }

    #openAboutMenu() {
        AudioManager.playSoundEffect("enter");
        this.#menus.currentMenu = "aboutMenu";
    }

    #backToMainMenu() {
        AudioManager.playSoundEffect("back");
        this.#menus.currentMenu = "mainMenu";
    }

    #drawMainMenu(currentOptionIndex) {
        GameScreen.ctx.fillStyle = this.#fontColor;
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
            this.#selectionSquareX, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex - 0.02)),
            Math.floor(GameScreen.width * 0.01), Math.floor(GameScreen.height * 0.02)
        );
        GameScreen.ctx.fillStyle = this.#fontColor;
        GameScreen.ctx.fill();
    }

    #drawHelpMenu(currentOptionIndex) {
        GameScreen.ctx.fillStyle = this.#fontColor;
        GameScreen.ctx.textAlign = "center";
        GameScreen.ctx.font = `bold ${Math.floor(0.028 * GameScreen.height)}px SigmarOne`;
        const optionsHeight = 0.54;
        const optionsSpacing = 0.04;
        GameScreen.ctx.fillText("BACK", Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 0)));

        // Rectangulito para indicar seleccion actual
        GameScreen.ctx.beginPath();
        GameScreen.ctx.rect(
            this.#selectionSquareX, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex - 0.02)),
            Math.floor(GameScreen.width * 0.01), Math.floor(GameScreen.height * 0.02)
        );
        GameScreen.ctx.fillStyle = this.#fontColor;
        GameScreen.ctx.fill();
    }

    #drawAboutMenu(currentOptionIndex) {
        GameScreen.ctx.fillStyle = this.#fontColor;
        GameScreen.ctx.textAlign = "center";
        GameScreen.ctx.font = `bold ${Math.floor(0.028 * GameScreen.height)}px SigmarOne`;
        const optionsHeight = 0.54;
        const optionsSpacing = 0.04;
        GameScreen.ctx.fillText("BACK", Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 0)));

        // Rectangulito para indicar seleccion actual
        GameScreen.ctx.beginPath();
        GameScreen.ctx.rect(
            this.#selectionSquareX, Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex - 0.02)),
            Math.floor(GameScreen.width * 0.01), Math.floor(GameScreen.height * 0.02)
        );
        GameScreen.ctx.fillStyle = this.#fontColor;
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
            AudioManager.playSoundEffect("left");
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
            AudioManager.playSoundEffect("right");
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

    #drawFadeIn() {
        const maxDim = Math.max(GameScreen.width, GameScreen.height);
        if (this.#fadeInCircleRadius < maxDim) {
            GameScreen.ctx.beginPath();
            GameScreen.ctx.rect(0, 0, GameScreen.width, GameScreen.height);
            GameScreen.ctx.arc(GameScreen.width / 2, GameScreen.height / 2, this.#fadeInCircleRadius, 0, 2 * Math.PI);
            GameScreen.ctx.fillStyle = "rgb(0, 0, 0)";
            GameScreen.ctx.fill("evenodd");
            this.#fadeInCircleRadius += 50;
        }
    }

    draw() {
        this.#selectionSquareX = Math.floor(GameScreen.width * (0.4 + 0.01 * Math.sin(this.#t)));


        GameScreen.ctx.beginPath();
        GameScreen.ctx.clearRect(0, 0, GameScreen.width, GameScreen.height);
        GameScreen.ctx.rect(0, 0, GameScreen.width, GameScreen.height);
        GameScreen.ctx.fillStyle = "#fdf5e6";
        GameScreen.ctx.fill();

        GameScreen.ctx.beginPath();
        GameScreen.ctx.rect(
            Math.floor(GameScreen.width / 4), Math.floor(GameScreen.height / 4),
            Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height / 2)
        );
        GameScreen.ctx.fillStyle = "#ffdddd";
        GameScreen.ctx.fill();

        const currentMenu = this.#menus.currentMenu;
        const drawHandleFunction = this.#menus[currentMenu].drawHandle;
        const currentOptionIndex = this.#menus[currentMenu].currentOptionIndex;
        drawHandleFunction(currentOptionIndex);

        this.#drawFadeIn();  // Transición desde la pantalla PressAnyKey

        this.#t += 0.15;
    }
}
