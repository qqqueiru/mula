class GameOver extends GameScreen {
    #score;
    #scoreRomanNumeral;
    #menus;
    constructor(score) {
        super();
        this.#score = score;
        this.#scoreRomanNumeral = romanize(score);
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
                        name: "LINKEDIN",
                        updateHandle: ()=>{this.#shareLinkedin()},
                    },
                    {
                        name: "PINTEREST",
                        updateHandle: ()=>{this.#sharePinterest()},
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
        // https://www.sharelinkgenerator.com/
        setTimeout(()=>{
            const scoreToShow = this.#score > 0 ? this.#scoreRomanNumeral : 0;
            const url = `https://twitter.com/intent/tweet?text=I%20scored%20${scoreToShow}%20point${this.#score == 1 ? "" : "s"}%20on%20Mula.%20LINK`;
            window.open(url, '_blank').focus();
        }, 100);
    }

    #shareFacebook() {
        setTimeout(()=>{
            const url = `https://facebook.com`;
            window.open(url, '_blank').focus();
        }, 100);
    }

    #shareLinkedin() {
        setTimeout(()=>{
            const url = `https://linkedin.com`;
            window.open(url, '_blank').focus();
        }, 100);
    }

    #sharePinterest() {
        setTimeout(()=>{
            const url = `https://pinterest.com`;
            window.open(url, '_blank').focus();
        }, 100);
    }

    #backToMainMenu() {
        this.#menus.currentMenu = "mainMenu";
    }

    #drawMainMenu(currentOptionIndex) {
        GameScreen.ctx.fillStyle = "rgb(0, 0, 0)";
        GameScreen.ctx.textAlign = "center";
        GameScreen.ctx.font = `bold ${Math.floor(0.055 * GameScreen.height)}px SigmarOne`;
        GameScreen.ctx.fillText("GAME OVER", Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * 0.4));
        GameScreen.ctx.font = `bold ${Math.floor(0.037 * GameScreen.height)}px SigmarOne`;
        GameScreen.ctx.fillText(
            `You scored ${this.#score > 0 ? this.#scoreRomanNumeral : 0} point${this.#score == 1 ? "" : "s"}`,
            Math.floor(GameScreen.width / 2),
            Math.floor(GameScreen.height * 0.45)
        );
        GameScreen.ctx.font = `bold ${Math.floor(0.028 * GameScreen.height)}px SigmarOne`;
        const optionsHeight = 0.54;
        const optionsSpacing = 0.04;
        GameScreen.ctx.fillText("RESTART", Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 0)));
        GameScreen.ctx.fillText("SHARE", Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 1)));
        GameScreen.ctx.fillText("HELP", Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 2)));
        GameScreen.ctx.fillText("ABOUT", Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 3)));

        // Rectangulito para indicar seleccion actual
        GameScreen.ctx.beginPath();
        GameScreen.ctx.rect(
            Math.floor(GameScreen.width * 0.40), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * currentOptionIndex - 0.02)),
            Math.floor(GameScreen.width * 0.01), Math.floor(GameScreen.height * 0.02)
        );
        GameScreen.ctx.fillStyle = "rgb(255, 0, 0)";
        GameScreen.ctx.fill();
    }

    #drawShareMenu(currentOptionIndex) {
        GameScreen.ctx.fillStyle = "rgb(0, 0, 0)";
        GameScreen.ctx.textAlign = "center";
        GameScreen.ctx.font = `bold ${Math.floor(0.028 * GameScreen.height)}px SigmarOne`;
        const optionsHeight = 0.44;
        const optionsSpacing = 0.04;
        GameScreen.ctx.fillText("TWITTER", Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 0)));
        GameScreen.ctx.fillText("FACEBOOK", Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 1)));
        GameScreen.ctx.fillText("LINKEDIN", Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 2)));
        GameScreen.ctx.fillText("PINTEREST", Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 3)));
        GameScreen.ctx.fillText("BACK", Math.floor(GameScreen.width / 2), Math.floor(GameScreen.height * (optionsHeight + optionsSpacing * 6)));

        // Rectangulito para indicar seleccion actual
        if (currentOptionIndex > 3) {
            currentOptionIndex = 6;
        }
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
