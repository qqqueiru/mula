class Villain {
    constructor(ctx) {
        this.xLimits = [300, 1620];
        this.x = this.xLimits[1];
        this.y = undefined;  // Lo calculamos luego según los coeficientes de la trayectoria
        this.yCurveCoeffs = [0, 0, 100];  // Coeficientes de una curva polinomial tal que y(x) = this.yCurveCoeffs[0] * x^2 + this.yCurveCoeffs[1] * x + this.yCurveCoefs[2] ...
        this.allowedSpeeds = [-7, 0, 7];
        this.vx = this.allowedSpeeds[0];
        this.framesUntilNextSpeedChange = 100;
        this.framesUntilNextItemDrop = 100;
        this.ctx = ctx;
    }

    #computeY(x) {
        let y = 0;
        for (let i = 0; i < this.yCurveCoeffs.length; ++i) {
            y = y * x + this.yCurveCoeffs[i];
        }
        return y;
    }

    #changeSpeed() {
        this.vx = this.allowedSpeeds[parseInt(Math.random() * this.allowedSpeeds.length)];
    }

    // TODO hacer una pausa en la descarga de objetos
    update() {
        this.framesUntilNextSpeedChange--;
        if (this.framesUntilNextSpeedChange <= 0) {
            this.#changeSpeed();
            this.framesUntilNextSpeedChange = 30 + Math.random() * 20;
        }

        let fallingItem;
        this.framesUntilNextItemDrop--;
        if (this.framesUntilNextItemDrop <= 0) {
            const vy = 2 + Math.random() * 5;
            fallingItem = new FallingItem(this.x, this.y, vy, this.ctx);
            this.framesUntilNextItemDrop = 50 + Math.random() * 30;
        }

        this.x += this.vx;
        if (this.x <= this.xLimits[0]) {
            this.x = this.xLimits[0];
            this.framesUntilNextSpeedChange = 0;
        }
        if (this.x >= this.xLimits[1]) {
            this.x = this.xLimits[1];
            this.framesUntilNextSpeedChange = 0;
        }
        this.y = this.#computeY(this.x);

        return fallingItem;
    }

    drawDebugPoint() {
        if (this.ctx) {
            this.ctx.beginPath();
            this.ctx.ellipse(this.x, this.y, 15, 15, 0, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'rgb(0, 0, 0)';
            this.ctx.fill();
        }
    }
}