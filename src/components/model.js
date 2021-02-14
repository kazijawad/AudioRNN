import * as mm from "@magenta/music/es6";

class MusicRNN {
    constructor() {
        this.player = new mm.Player();

        this.model = new mm.MusicRNN("https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/melody_rnn");
        if (!this.model.isInitialized) {
            this.model.initialize();
        }
    }

    async generateMusic(noteSequence, progressWidth, progressBar) {
        if (this.player.isPlaying()) {
            this.player.stop();
            return;
        }

        this.quantizedNoteSequence = mm.sequences.quantizeNoteSequence(noteSequence, 4);
        this.sample = await this.model.continueSequence(this.quantizedNoteSequence, 20, 0.75);
        this.player.start(this.sample);

        const unquantizedNotes = mm.sequences.unquantizeSequence(this.sample);
        const totalTime = unquantizedNotes.totalTime * 1000;
        const interval = (100 / totalTime) * 100;
        let time = 100;

        this.progressInterval = setInterval(() => {
            if (time >= totalTime) {
                progressWidth = 100;
                progressBar.style.width = "100%";
                clearInterval(this.progressInterval);
            } else {
                progressWidth += interval;
                progressBar.style.width = `${progressWidth}%`;
            }
            time += 100;
        }, 100);
    }
}

export default MusicRNN;
