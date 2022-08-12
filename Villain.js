class Villain {
    constructor(ctx) {
        this.xLimits = [300, 1620];
        this.x = this.xLimits[1];
        this.y = undefined;  // Lo calculamos luego según los coeficientes de la trayectoria
        {
            // Parabola: y = A*x^2 + B*x + C
            const a = 0.0001;
            const xOffset = 1920 * 0.6;
            const h = 300;
            const A = a;
            const B = - 2 * a * xOffset;
            const C = a * xOffset + h;
            this.yCurveCoeffs = [A, B, C];  // Coeficientes de una curva polinomial tal que y(x) = this.yCurveCoeffs[0] * x^2 + this.yCurveCoeffs[1] * x + this.yCurveCoefs[2] ...
        }
        this.allowedSpeeds = [-10, -5, 0, 5, 10];
        this.vx = this.allowedSpeeds[0];
        this.framesUntilNextSpeedChange = 100;
        this.framesUntilNextItemDrop = 100;
        this.framesUntilNextDropHiatus = 1000;
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

    update() {
        this.framesUntilNextSpeedChange--;
        if (this.framesUntilNextSpeedChange <= 0) {
            this.#changeSpeed();
            this.framesUntilNextSpeedChange = 30 + Math.random() * 20;
        }

        let fallingItem;
        this.framesUntilNextItemDrop--;
        if (this.framesUntilNextItemDrop <= 0) {
            const vy = 6.5 + Math.random() * 3.5;
            fallingItem = new FallingItem(this.x, this.y, vy, this.ctx);
            this.framesUntilNextItemDrop = 15 + Math.random() * 30;
        }

        // Pausa en la descarga de objetos
        this.framesUntilNextDropHiatus--;
        if (this.framesUntilNextDropHiatus <= 0) {
            this.framesUntilNextItemDrop = 300;
            this.framesUntilNextDropHiatus = 2000 + Math.random() * 500;
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