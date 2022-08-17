/**
 * Clase que define una elipse simple que siempre está en horizontal
 */
class Ellipse {
    constructor(xCenter, yCenter, a, b, ctx) {
        this.x = xCenter;
        this.y = yCenter;
        this.a = a;  // Semieje mayor
        this.b = b;  // Semieje menor
        this.ctx = ctx;
    }
    isPointInsideEllipse(x, y) {
        const distance =
            (this.x - x) * (this.x - x) / (this.a * this.a) +
            (this.y - y) * (this.y - y) / (this.b * this.b);
        return distance <= 1;
    }
    setCenter(newX, newY) {
        this.x = newX;
        this.y = newY;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.ellipse(this.x, this.y, this.a, this.b, 0, 0, 2 * Math.PI);
        this.ctx.stroke();
    }
}

/**
 * Clase que gestiona la lógica de la mula. Puede que también su dibujado.
 */
class Mula {
    constructor(x, y, ctx) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.vx = 0;  // Se permiten velocidades entre -this.maxSpeed y this.maxSpeed
        this.xLimits = [100, 1820];
        this.maxSpeed = 20;
        this.speedIncrement = 5;
        this.goodBoundingEllipse = new Ellipse(x, y, 210, 140, ctx);  // 200, 100 originalmente
        this.img = new Image();  // TODO crear clase image loader para asegurarse que cargan antes de ejecutar el juego...
        this.img.src = "./img/test_mula.png";
    }

    commandToLeft() {
        this.vx -= this.speedIncrement;
        if (this.vx < -this.maxSpeed)
        {
            this.vx = -this.maxSpeed;
        }
    }

    commandToRight() {
        this.vx += this.speedIncrement;
        if (this.vx > this.maxSpeed)
        {
            this.vx = this.maxSpeed;
        }
    }

    updatePos() {
        if (this.x >= this.xLimits[0] && this.x <= this.xLimits[1]) {
            this.x += this.vx;
        }
    
        if (this.x < this.xLimits[0]) {
            this.x = this.xLimits[0];
        }

        if (this.x > this.xLimits[1]) {
            this.x = this.xLimits[1];
        }

        this.goodBoundingEllipse.setCenter(this.x, this.y);
    }

    catchesGoody(x, y) {
        return this.goodBoundingEllipse.isPointInsideEllipse(x, y);
    }

    draw() {
        this.ctx.beginPath();
        const scale = 2;
        const w = this.img.width * scale;
        const h = this.img.height * scale;
        const x = this.x - w / 2;
        const y = this.y - h / 2;

        this.ctx.drawImage(this.img, x, y, w, h);
    }

    drawDebugGoodBounding() {
        this.goodBoundingEllipse.draw();
    }
}