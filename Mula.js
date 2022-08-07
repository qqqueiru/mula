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
        this.vx = 0;  // Se permiten velocidades entre -5 y 5
        this.xLimits = [100, 1820];
        this.maxSpeed = 10;
        this.speedIncrement = 2;
        this.goodBoundingEllipse = new Ellipse(x, y, 200, 100, ctx);
    }

    commandToLeft() {
        if (this.vx > -this.maxSpeed)
        {
            this.vx -= this.speedIncrement;
        }
    }

    commandToRight() {
        if (this.vx <= this.maxSpeed)
        {
            this.vx += this.speedIncrement;
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

    drawDebugGoodBounding() {
        this.goodBoundingEllipse.draw();
    }
}