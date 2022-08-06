/**
 * Clase que define una elipse simple que siempre está en horizontal
 */
class Ellipse {
    constructor(xCenter, yCenter, a, b) {
        this.x = xCenter;
        this.y = yCenter;
        this.a = a;  // Semieje mayor
        this.b = b;  // Semieje menor
    }
    isPointInsideEllipse(x, y) {
        const distance =
            (this.xCenter - x) * (this.xCenter - x) / (this.a * this.a) +
            (this.yCenter - y) * (this.yCenter - y) / (this.b * this.b);
        return distance <= 1;
    }
    setCenter(newX, newY) {
        this.x = newX;
        this.y = newY;
    }
}

/**
 * Clase que gestiona la lógica de la mula. Puede que también su dibujado.
 */
class Mula {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;  // Se permiten velocidades entre -5 y 5
        this.xLimits = [100, 1820];
        this.maxSpeed = 10;
        this.speedIncrement = 2;
        this.boundingEllipse = new Ellipse(x, y, 200, 100);
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

        this.boundingEllipse.setCenter(this.x, this.y);
    }
}