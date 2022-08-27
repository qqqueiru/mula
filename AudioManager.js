class AudioManager {
    constructor() {
    }
    static audios = new Map();
    static loadAudio(id, src) {
        const audio = new Audio();
        audio.src = src;
        AudioManager.audios.set(id, audio);
    }
    static audiosLoaded() {
        const audiosCount = AudioManager.audios.size;
        if (audiosCount == 0) {
            return 1;
        }
        let audiosLoaded = 0;
        for (const [id, audio] of AudioManager.audios) {
            audiosLoaded += audio.readyState == 4;  // HAVE_ENOUGH_DATA
        }
        return audiosLoaded / audiosCount;  // Número entre 0 y 1 que representa el progreso de carga
    }
    static getAudio(id) {
        return AudioManager.audios.get(id);
    }
    static loadAudios() {
        // TODO hacer aquí la carga de todos los audios
        AudioManager.loadAudio("background_music_0", "./audio/Kevin Macleod - Scheming Weasel Faster.ogg");
        AudioManager.loadAudio("background_music_1", "./audio/Kevin MacLeod - Sneaky Snitch.ogg");
        AudioManager.loadAudio("palmada", "./audio/palmada.ogg");
    }

}