/**
 * Clase base para cualquier objeto (bueno o malo) que caiga y que puede recoger la mula
 */
class FallingItem {
    static imgIds = [
        "cebolla",
        "pan",
        "botijo",
        "empanadilla",
        "tortilla",
        "gamba",
        "pimiento",
        "queso",
        "morcilla",
        "tomate",
        "aceite",
        "sardina",
        "fletan",
        "aceituna",
        "pollo",
        "vieira",
        "pulpo",
        "rosquilla",
        "churros",
        "magdalena",
        "ensaimada",
        "batido_cacao",
        "zumo",
        "langosta",
        "chocolate",
        "cerezas",
        "uvas",
        "vino",
        "zanahoria",
        "platano",
        "manzana",
        "melocoton",
        "albondiga",
        "croqueta",
    ];
    constructor(x, y, vy, ctx = undefined) {
        this.x = x;
        this.y = y;  // Quizás en un principio convenga que todo caiga desde un mismo y
        this.maxY = 1080 + 100;
        this.vy = vy;  // Siempre positivo
        this.ctx = ctx;
        this.canBeDeleted = false;
        this.fallen = false;

        // De todas las imágenes disponibles para un objeto en caída libre, seleccionamos una al azar.
        const randomImgId = FallingItem.imgIds[parseInt(Math.random() * FallingItem.imgIds.length)];
        this.img = ImageManager.getImage(randomImgId);
    }

    updatePos() {
        this.y += this.vy;

        if (this.y >= this.maxY) {
            this.canBeDeleted = true;
            this.fallen = true;
        }
    }

    getPoint() {
        return [this.x, this.y];
    }

    drawDebugPoint() {
        if (this.ctx) {
            this.ctx.beginPath();
            this.ctx.ellipse(Math.floor(this.x), Math.floor(this.y), 15, 15, 0, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'rgb(0, 255, 0)';
            this.ctx.fill();
        }
    }

    draw() {
        this.ctx.beginPath();
        const scale = 4;
        const dw = Math.floor(this.img.width * scale);
        const dh = Math.floor(this.img.height * scale);
        const dx = Math.floor(this.x - dw / 2);
        const dy = Math.floor(this.y - dh / 2);
        this.ctx.drawImage(this.img, dx, dy, dw, dh);
    }
}