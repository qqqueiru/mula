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
        ImageManager.loadImage("mula_sprite_animation_right", "./img/mula_sprite_animation_right.png");
        ImageManager.loadImage("mula_sprite_animation_left", "./img/mula_sprite_animation_left.png");
        ImageManager.loadImage("villain_sprite_test", "./img/villain_sprite_test.png");
        ImageManager.loadImage("background", "./img/background.png");

        // Objetos en caída libre
        ImageManager.loadImage("cebolla", "./img/cebolla.png");
        ImageManager.loadImage("pan", "./img/pan.png");
        ImageManager.loadImage("botijo", "./img/botijo.png");
        ImageManager.loadImage("empanadilla", "./img/empanadilla.png");
        ImageManager.loadImage("tortilla", "./img/tortilla.png");
        ImageManager.loadImage("gamba", "./img/gamba.png");
        ImageManager.loadImage("pimiento", "./img/pimiento.png");
        ImageManager.loadImage("queso", "./img/queso.png");
        ImageManager.loadImage("morcilla", "./img/morcilla.png");
        ImageManager.loadImage("tomate", "./img/tomate.png");
        ImageManager.loadImage("aceite", "./img/aceite.png");
        ImageManager.loadImage("sardina", "./img/sardina.png");
        ImageManager.loadImage("fletan", "./img/fletan.png");
        ImageManager.loadImage("aceituna", "./img/aceituna.png");
        ImageManager.loadImage("pollo", "./img/pollo.png");
        ImageManager.loadImage("vieira", "./img/vieira.png");
        ImageManager.loadImage("pulpo", "./img/pulpo.png");
        ImageManager.loadImage("rosquilla", "./img/rosquilla.png");
        ImageManager.loadImage("churros", "./img/churros.png");
        ImageManager.loadImage("magdalena", "./img/magdalena.png");
        ImageManager.loadImage("ensaimada", "./img/ensaimada.png");
        ImageManager.loadImage("batido_cacao", "./img/batido_cacao.png");  // cacao leite
        ImageManager.loadImage("zumo", "./img/zumo.png");
        ImageManager.loadImage("langosta", "./img/langosta.png");
        ImageManager.loadImage("chocolate", "./img/chocolate.png");
        ImageManager.loadImage("cerezas", "./img/cerezas.png");
        ImageManager.loadImage("uvas", "./img/uvas.png");
        ImageManager.loadImage("vino", "./img/vino.png");
        ImageManager.loadImage("zanahoria", "./img/zanahoria.png");
        ImageManager.loadImage("platano", "./img/platano.png");
        ImageManager.loadImage("manzana", "./img/manzana.png");
        ImageManager.loadImage("melocoton", "./img/melocoton.png");
        ImageManager.loadImage("albondiga", "./img/albondiga.png");
        ImageManager.loadImage("croqueta", "./img/croqueta.png");
        ImageManager.loadImage("helado_palo", "./img/helado_palo.png");
        ImageManager.loadImage("helado_cucurucho", "./img/helado_cucurucho.png");
        ImageManager.loadImage("fresa", "./img/fresa.png");
        ImageManager.loadImage("melon", "./img/melon.png");
        ImageManager.loadImage("miel", "./img/miel.png");
        ImageManager.loadImage("castaña", "./img/castaña.png");
        ImageManager.loadImage("huevo_cocido", "./img/huevo_cocido.png");
        ImageManager.loadImage("percebe", "./img/percebe.png");
    }

}
