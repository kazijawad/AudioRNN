import * as mm from "@magenta/music/es6";

class MusicRNN {
    constructor() {
        this.player = new mm.Player();

        this.model = new mm.MusicRNN("https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/melody_rnn");
        if (!this.model.isInitialized) {
            this.model.initialize();
        }
    }

    async generateMusic(noteSequence) {
        if (this.player.isPlaying()) {
            this.player.stop();
            return;
        }

        this.quantizedNoteSequence = mm.sequences.quantizeNoteSequence(noteSequence, 4);
        this.sample = await this.model.continueSequence(this.quantizedNoteSequence, 40, 0.5);
        this.player.start(this.sample);
    }
}

export default MusicRNN;
