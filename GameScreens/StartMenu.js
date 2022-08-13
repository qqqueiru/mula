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

    #startGame() {
        GameScreen.currentScreen = new Play();
    }

    #openHelpMenu() {
        this.#menus.currentMenu = "helpMenu";
    }

    #openAboutMenu() {
        this.#menus.currentMenu = "aboutMenu";
    }

    #backToMainMenu() {
        this.#menus.currentMenu = "mainMenu";
    }

    #drawMainMenu(currentOptionIndex) {
        GameScreen.ctx.fillStyle = "rgb(0, 0, 0)";
        GameScreen.ctx.textAlign = "center";
        GameScreen.ctx.font = "bold 60px Arial";
        GameScreen.ctx.fillText("MULA", GameScreen.width / 2, GameScreen.height * 0.4);
        GameScreen.ctx.font = "bold 30px Arial";
        const optionsHeight = 0.54;
        const optionsSpacing = 0.04;
        GameScreen.ctx.fillText("START", GameScreen.width / 2, GameScreen.height * (optionsHeight + optionsSpacing * 0));
        GameScreen.ctx.fillText("HELP", GameScreen.width / 2, GameScreen.height * (optionsHeight + optionsSpacing * 1));
        GameScreen.ctx.fillText("ABOUT", GameScreen.width / 2, GameScreen.height * (optionsHeight + optionsSpacing * 2));

        // Rectangulito para indicar seleccion actual
        GameScreen.ctx.beginPath();
        GameScreen.ctx.rect(
            GameScreen.width * 0.40, GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex - 0.02),
            GameScreen.width * 0.01, GameScreen.height * 0.02
        );
        GameScreen.ctx.fillStyle = "rgb(255, 0, 0)";
        GameScreen.ctx.fill();
    }

    #drawHelpMenu(currentOptionIndex) {
        GameScreen.ctx.fillStyle = "rgb(0, 0, 0)";
        GameScreen.ctx.textAlign = "center";
        GameScreen.ctx.font = "bold 30px Arial";
        const optionsHeight = 0.54;
        const optionsSpacing = 0.04;
        GameScreen.ctx.fillText("BACK", GameScreen.width / 2, GameScreen.height * (optionsHeight + optionsSpacing * 0));

        // Rectangulito para indicar seleccion actual
        GameScreen.ctx.beginPath();
        GameScreen.ctx.rect(
            GameScreen.width * 0.40, GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex - 0.02),
            GameScreen.width * 0.01, GameScreen.height * 0.02
        );
        GameScreen.ctx.fillStyle = "rgb(255, 0, 0)";
        GameScreen.ctx.fill();
    }

    #drawAboutMenu(currentOptionIndex) {
        GameScreen.ctx.fillStyle = "rgb(0, 0, 0)";
        GameScreen.ctx.textAlign = "center";
        GameScreen.ctx.font = "bold 30px Arial";
        const optionsHeight = 0.54;
        const optionsSpacing = 0.04;
        GameScreen.ctx.fillText("BACK", GameScreen.width / 2, GameScreen.height * (optionsHeight + optionsSpacing * 0));

        // Rectangulito para indicar seleccion actual
        GameScreen.ctx.beginPath();
        GameScreen.ctx.rect(
            GameScreen.width * 0.40, GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex - 0.02),
            GameScreen.width * 0.01, GameScreen.height * 0.02
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
            GameScreen.width / 4, GameScreen.height / 4,
            GameScreen.width / 2, GameScreen.height / 2
        );
        GameScreen.ctx.fillStyle = "rgb(255, 255, 255)";
        GameScreen.ctx.fill();

        const currentMenu = this.#menus.currentMenu;
        const drawHandleFunction = this.#menus[currentMenu].drawHandle;
        const currentOptionIndex = this.#menus[currentMenu].currentOptionIndex;
        drawHandleFunction(currentOptionIndex);
    }
}
