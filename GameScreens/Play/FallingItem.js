/**
 * Clase base para cualquier objeto (bueno o malo) que caiga y que puede recoger la mula
 */
class FallingItem {
    static imgIds = [
        "cebolla",
        "pan",
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
            this.ctx.ellipse(this.x, this.y, 15, 15, 0, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'rgb(0, 255, 0)';
            this.ctx.fill();
        }
    }

    draw() {
        this.ctx.beginPath();
        const scale = 4;
        const dw = this.img.width * scale;
        const dh = this.img.height * scale;
        const dx = this.x - dw / 2;
        const dy = this.y - dh / 2;
        this.ctx.drawImage(this.img, dx, dy, dw, dh);
    }
}