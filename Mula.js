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
        this.sprites = {
            right: new AnimatedSprite("mula_sprite_animation_right", 4, 4, 3, -1, ctx),
            left: new AnimatedSprite("mula_sprite_animation_left", 4, 4, 3, -1, ctx),
        }
        console.log(ctx);

        this.sprites.right.pause();
        this.sprites.left.pause();
        this.currentSprite = "left";
    }

    #changeAnimation() {
        if (this.vx == 0) {
            this.sprites[this.currentSprite].pause();
        } else {
            const stepsPerFrame = 1 / Math.abs(this.vx) * 40;
            this.sprites[this.currentSprite].setStepsPerFrame(stepsPerFrame);
            this.sprites[this.currentSprite].resume();
            if (this.vx > 0) {
                this.currentSprite = "right";
            } else {
                this.currentSprite = "left";
            }
        }
    }

    commandToLeft() {
        this.vx -= this.speedIncrement;
        if (this.vx < -this.maxSpeed)
        {
            this.vx = -this.maxSpeed;
        }
        this.#changeAnimation();
    }

    commandToRight() {
        this.vx += this.speedIncrement;
        if (this.vx > this.maxSpeed)
        {
            this.vx = this.maxSpeed;
        }
        this.#changeAnimation();
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
        this.sprites[this.currentSprite].draw(this.x, this.y);
    }

    drawDebugGoodBounding() {
        this.goodBoundingEllipse.draw();
    }
}