/**
 * Clase base para cualquier objeto (bueno o malo) que caiga y que puede recoger la mula
 */
class FallingItem {
    constructor(x, y, vy, ctx = undefined) {
        this.x = x;
        this.y = y;  // Quizás en un principio convenga que todo caiga desde un mismo y
        this.maxY = 1080;
        this.vy = vy;  // Siempre positivo
        this.ctx = ctx;
        this.canBeDeleted = false;
    }
    updatePos() {
        this.y += this.vy;

        if (Math.abs(this.y) >= this.maxY) {
            this.canBeDeleted = true;
        }
    }
    getPoint() {
        return [this.x, this.y];
    }
    drawDebugPoint() {
        if (this.ctx) {
            this.ctx.beginPath();
            this.ctx.ellipse(this.x, this.y, 5, 5, 0, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'rgb(0, 255, 0)';
            this.ctx.fill();
        }
    }
}