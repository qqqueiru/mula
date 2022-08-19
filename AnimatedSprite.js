class AnimatedSprite {
    #imgId;
    #img;
    #scale;
    #cols;
    #rows;
    // #frameCount;
    #currentStep;
    #stepsPerFrame;  // TODO ver si se pueden fijar los fps en 60
    #ctx;

//  Ejemplo de AnimatedSprite usando una imagen con 6 frames,
//  en una imagen de 3 columnas por 2 filas:
//  ------------------------------------------------
//  ||   frame1    ||    frame2    ||    frame3   ||
//  ||   frame4    ||    frame5    ||    frame6   ||
//  ------------------------------------------------

//  La animación se ejecuta en el siguiente orden:
//  |step|step|step||step|step|step||step|step|step||step|step|step||step|step|step||step|step|step|
//  |----frame1----||----frame2----||----frame3----||----frame4----||----frame5----||----frame6----|

    constructor(imgId, scale, cols, rows, stepsPerFrame, ctx) {
        this.#imgId = imgId;
        this.#img = ImageManager.getImage(imgId);
        this.#scale = scale;
        this.#cols = cols;
        this.#rows = rows;
        this.#currentStep = 0;
        this.#stepsPerFrame = stepsPerFrame;
        this.#ctx = ctx;
    }

    draw(xCenter, yCenter) {
        const totalFrames = this.#rows * this.#cols;
        const totalSteps = totalFrames * this.#stepsPerFrame;
        const currentFrame = Math.floor(this.#currentStep / totalSteps * totalFrames);
        const currentRow = Math.floor(currentFrame / this.#cols);
        const currentCol = currentFrame % this.#cols;

        const sw = this.#img.width / this.#cols;
        const sh = this.#img.height / this.#rows;
        const sx = currentCol * sw;
        const sy = currentRow * sh;
        const dx = xCenter - sw / 2 * this.#scale;
        const dy = yCenter - sh / 2 * this.#scale;
        const dw = sw * this.#scale;
        const dh = sh * this.#scale;

        this.#ctx.drawImage(this.#img, sx, sy, sw, sh, dx, dy, dw, dh);

        this.#currentStep++;
        if (this.#currentStep >= totalSteps) {
            this.#currentStep = 0;
        }
    }
}