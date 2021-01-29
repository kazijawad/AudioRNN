import mm from "@magenta/music/es6";

class MusicRNN {
    constructor() {
        this.player = new mm.Player();

        this.model = new mm.MusicRNN("https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/melody_rnn");
        this.model.initialize();
    }

    async generateMusic() {
        this.model.initialize();

        if (this.player.isPlaying()) {
            this.player.stop();
            return;
        }

        this.quantizedNoteSequence = mm.sequences.quantizeNoteSequence(noteSequence, 4);
        this.sample = await model.continueSequence(quantizedNoteSequence, 40, 0.5);
    }
}

export default MusicRNN;
