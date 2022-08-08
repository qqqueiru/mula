/**
 * Clase genérica para generar menús de forma dinámica.
 * El desarrollador puede especificar una función de dibujado específica
 */
class Menu {
    constructor(options, customDrawFunction, parent) {
        this.options = options;
        this.currentOption = options[0];  // Por defecto la primera opción
        this.parent = parent;
        this.customDrawFunction = customDrawFunction;
        this.changeToAnother = false;
    }

    handleInputs(inputs) {
        if (parent && ("escape...") || ("enter")) {
            // TODO volver al menu anterior...
        }
    }

    draw(ctx) {
        if (this.customDrawFunction) {
            this.customDrawFunction(ctx);
            return;
        }
        // TODO?
    }
}

class MenuOption {
    constructor(name, subMenu, gameScreen) {
        this.name = name;
        this.subMenu = subMenu;
        this.gameScreen = gameScreen;  // Si el usuario selecciona "Start" esto podría ser útil
    }
}