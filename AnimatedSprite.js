class AnimatedSprite {
    #imgId;
    #img;
    #w;
    #h;
    #cols;
    #rows;
    #frameCount;
    #currentFrame;
    #updatesPerFrame;  // TODO ver si se pueden fijar los fps en 60
    constructor(imgId, w, h, cols, rows) {
        this.#imgId = imgId;
        this.#img = ImageManager.getImage(imgId);
    }
}