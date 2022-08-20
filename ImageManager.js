class ImageManager {
    constructor() {
    }
    static imgs = new Map();
    static loadImage(id, src) {
        const img = new Image();
        img.src = src;
        ImageManager.imgs.set(id, img);
    }
    static imgsLoaded() {
        const imgsCount = ImageManager.imgs.size;
        if (imgsCount == 0) {
            return 1;
        }
        let imgsLoaded = 0;
        for (const [id, img] of ImageManager.imgs) {
            imgsLoaded += img.complete;
        }
        return imgsLoaded / imgsCount;  // Número entre 0 y 1 que representa el progreso de carga
    }
    static getImage(id) {
        return ImageManager.imgs.get(id);
    }
    static loadImages() {
        // TODO hacer aquí la carga de todas las imágenes
        ImageManager.loadImage("mula_sprite_test", "./img/mula_sprite_test.png");
        ImageManager.loadImage("villain_sprite_test", "./img/villain_sprite_test.png");
        ImageManager.loadImage("background_test", "./img/background_test.png");

        ImageManager.loadImage("cebolla", "./img/cebolla.png");
    }

}