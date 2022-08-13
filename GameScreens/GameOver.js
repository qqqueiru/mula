class GameOver extends GameScreen {
    #score;
    #menus;
    constructor(score) {
        super();
        this.#score = score;
        this.#menus = {
            currentMenu: "mainMenu",
            mainMenu: {
                currentOptionIndex: 0,
                drawHandle: (optIdx)=>{this.#drawMainMenu(optIdx)},
                options: [
                    {
                        name: "RESTART",
                        updateHandle: ()=>{this.#restartGame()},
                    },
                    {
                        name: "SHARE",
                        updateHandle: ()=>{this.#openShareMenu()},
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
            shareMenu: {
                currentOptionIndex: 0,
                drawHandle: (optIdx)=>{this.#drawShareMenu(optIdx)},
                options: [
                    {
                        name: "TWITTER",
                        updateHandle: ()=>{this.#shareTwitter()},
                    },
                    {
                        name: "FACEBOOK",
                        updateHandle: ()=>{this.#shareFacebook()},
                    },
                    {
                        name: "BACK",
                        updateHandle: ()=>{this.#backToMainMenu()},
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

    #restartGame() {
        GameScreen.currentScreen = new Play();
    }

    #openShareMenu() {
        this.#menus.currentMenu = "shareMenu";
    }

    #openHelpMenu() {
        this.#menus.currentMenu = "helpMenu";
    }

    #openAboutMenu() {
        this.#menus.currentMenu = "aboutMenu";
    }

    #shareTwitter() {
        alert("TODO SHARE TWITTER");
    }

    #shareFacebook() {
        alert("TODO SHARE FACEBOOK");
    }

    #backToMainMenu() {
        this.#menus.currentMenu = "mainMenu";
    }

    #drawMainMenu(currentOptionIndex) {
        GameScreen.ctx.fillStyle = "rgb(0, 0, 0)";
        GameScreen.ctx.textAlign = "center";
        GameScreen.ctx.font = "bold 60px Arial";
        GameScreen.ctx.fillText("GAME OVER", GameScreen.width / 2, GameScreen.height * 0.4);
        GameScreen.ctx.font = "bold 40px Arial";
        GameScreen.ctx.fillText(`You scored ${this.#score} points`, GameScreen.width / 2, GameScreen.height * 0.45);
        GameScreen.ctx.font = "bold 30px Arial";
        const optionsHeight = 0.54;
        const optionsSpacing = 0.04;
        GameScreen.ctx.fillText("RESTART", GameScreen.width / 2, GameScreen.height * (optionsHeight + optionsSpacing * 0));
        GameScreen.ctx.fillText("SHARE", GameScreen.width / 2, GameScreen.height * (optionsHeight + optionsSpacing * 1));
        GameScreen.ctx.fillText("HELP", GameScreen.width / 2, GameScreen.height * (optionsHeight + optionsSpacing * 2));
        GameScreen.ctx.fillText("ABOUT", GameScreen.width / 2, GameScreen.height * (optionsHeight + optionsSpacing * 3));

        // Rectangulito para indicar seleccion actual
        GameScreen.ctx.beginPath();
        GameScreen.ctx.rect(
            GameScreen.width * 0.40, GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex - 0.02),
            GameScreen.width * 0.01, GameScreen.height * 0.02
        );
        GameScreen.ctx.fillStyle = "rgb(255, 0, 0)";
        GameScreen.ctx.fill();
    }

    #drawShareMenu(currentOptionIndex) {
        GameScreen.ctx.fillStyle = "rgb(0, 0, 0)";
        GameScreen.ctx.textAlign = "center";
        GameScreen.ctx.font = "bold 30px Arial";
        const optionsHeight = 0.54;
        const optionsSpacing = 0.04;
        GameScreen.ctx.fillText("TWITTER", GameScreen.width / 2, GameScreen.height * (optionsHeight + optionsSpacing * 0));
        GameScreen.ctx.fillText("FACEBOOK", GameScreen.width / 2, GameScreen.height * (optionsHeight + optionsSpacing * 1));
        GameScreen.ctx.fillText("BACK", GameScreen.width / 2, GameScreen.height * (optionsHeight + optionsSpacing * 2));

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
