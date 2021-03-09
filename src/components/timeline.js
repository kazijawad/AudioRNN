import styles from "./timeline.module.css";
import AudioInput from '../components/audio';
import MusicRNN from '../components/model';

class Timeline {
    constructor(containerID) {
        this.container = document.getElementById(containerID);
        this.container.classList.add(styles.container);

        this.model = new MusicRNN();

        this.render();
    }

    render() {
        this.pauseButton = document.createElement("button");
        this.playButton = document.createElement("button");
        this.progress = document.createElement('div');
        this.progressBar = document.createElement('div');
        
        this.pauseButton.classList.add(styles.button);
        this.playButton.classList.add(styles.button);
        this.progress.classList.add(styles.progress);
        this.progressBar.classList.add(styles.bar);

        this.pauseButton.addEventListener("click", (event) => this.handlePauseButton(event));
        this.playButton.addEventListener("click", (event) => this.handlePlayButton(event));

        this.pauseButton.disabled = true;

        // Pause Button
        const pauseImage = document.createElement("img");
        pauseImage.setAttribute("src", "/icons/pause-circle-outline.svg");
        pauseImage.setAttribute("alt", "Pause Button");
        pauseImage.classList.add(styles.image);
        this.pauseButton.appendChild(pauseImage);
        this.container.appendChild(this.pauseButton);

        // Play Button
        const playImage = document.createElement("img");
        playImage.setAttribute("src", "/icons/play-circle-outline.svg");
        playImage.setAttribute("alt", "Play Button");
        playImage.classList.add(styles.image);
        this.playButton.appendChild(playImage);
        this.container.appendChild(this.playButton);

        // Progress Bar
        this.progressWidth = 0;
        this.progressBar.style.width =`${this.progressWidth}%`;
        this.progress.appendChild(this.progressBar);
        this.container.appendChild(this.progress);
    }

    handlePauseButton(event) {
        event.preventDefault();
        this.pauseButton.disabled = true;
        this.playButton.disabled = false;

        this.audioInput.pauseAudio();
        this.model.generateMusic(this.audioInput.noteSequence, this.progressWidth, this.progressBar);
    }

    handlePlayButton(event) {
        event.preventDefault();
        this.playButton.disabled = true;
        this.pauseButton.disabled = false;

        this.audioInput = new AudioInput();
        this.audioInput.recordAudio();
    }
}

export default Timeline;
