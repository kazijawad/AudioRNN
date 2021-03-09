import styles from "./timeline.module.css";
import AudioInput from '../components/audio';
import MusicRNN from '../components/model';

class Timeline {
    constructor(containerID) {
        this.container = document.getElementById(containerID);
        this.container.classList.add(styles.timeline);

        this.model = new MusicRNN();
    }

    render() {
        this.renderPauseBtn();
        this.renderPlayBtn();
        this.renderProgress();

        this.pauseBtn.disabled = true;
    }

    renderPauseBtn() {
        this.pauseBtn = document.createElement("button");
        const pauseImg = document.createElement("img");

        pauseImg.setAttribute("src", "/icons/pause-circle-outline.svg");
        pauseImg.setAttribute("alt", "Pause Button");

        this.pauseBtn.classList.add(styles.timelineBtn);
        pauseImg.classList.add(styles.timelineImg);

        this.pauseBtn.addEventListener("click", (event) => {
            this.handlePauseBtn(event);
        });

        this.pauseBtn.appendChild(pauseImg);
        this.container.appendChild(this.pauseBtn);
    }

    renderPlayBtn() {
        this.playBtn = document.createElement("button");
        const playImg = document.createElement("img");

        playImg.setAttribute("src", "/icons/play-circle-outline.svg");
        playImg.setAttribute("alt", "Play Button");

        this.playBtn.classList.add(styles.timelineBtn);
        playImg.classList.add(styles.timelineImg);

        this.playBtn.addEventListener("click", (event) => {
            this.handlePlayBtn(event);
        });

        this.playBtn.appendChild(playImg);
        this.container.appendChild(this.playBtn);
    }

    handlePauseBtn(event) {
        event.preventDefault();
        this.pauseBtn.disabled = true;
        this.playBtn.disabled = false;

        this.audioInput.pauseAudio();
        this.model.generateMusic(this.audioInput.noteSequence, this.progressWidth, this.progressBar);
    }

    handlePlayBtn(event) {
        event.preventDefault();
        this.playBtn.disabled = true;
        this.pauseBtn.disabled = false;

        this.audioInput = new AudioInput();
        this.audioInput.recordAudio();
    }

    renderProgress() {
        this.progress = document.createElement('div');
        this.progressBar = document.createElement('div');

        this.progress.classList.add(styles.timelineProgress);
        this.progressBar.classList.add(styles.timelineProgressBar);

        this.progressWidth = 0;
        this.progressBar.style.width =`${this.progressWidth}%`;

        this.progress.appendChild(this.progressBar);
        this.container.appendChild(this.progress);
    }
}

export default Timeline;
