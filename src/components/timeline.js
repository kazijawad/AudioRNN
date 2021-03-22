import Model from '../components/model';

class Timeline {
    constructor(element) {
        this.element = element;
        this.model = new Model();

        this.pauseButton = document.querySelector("#pause");
        this.pauseButton.addEventListener("click", (event) => {
            this.handlePauseButton(event);
        });
        this.pauseButton.disabled = true;

        this.playButton = document.querySelector("#play");
        this.playButton.addEventListener("click", (event) => {
            this.handlePlayButton(event);
        });
    }

    handlePauseButton(event) {
        event.preventDefault();
        this.pauseButton.disabled = true;
        this.playButton.disabled = false;

        this.audioInput.pauseAudio();
        this.model.generateMusic(this.audioInput.noteSequence);
    }

    async handlePlayButton(event) {
        event.preventDefault();
        this.playButton.disabled = true;
        this.pauseButton.disabled = false;

        const AudioInput = (await import("./audio")).default;
        await Tone.start();

        this.audioInput = new AudioInput();
        this.audioInput.recordAudio();
    }
}

export default Timeline;
