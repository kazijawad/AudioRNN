import styles from "./timeline.module.css";
import AudioInput from '../components/audio';
import PauseIcon from "../assets/pause-circle-outline.svg";
import PlayIcon from "../assets/play-circle-outline.svg";

class Timeline {
    constructor(containerID) {
        this.container = document.getElementById(containerID);
        this.container.classList.add(styles.timeline);
    }

    render() {
        this.renderPauseBtn();
        this.renderPlayBtn();

        this.pauseBtn.disabled = true;
    }

    renderPauseBtn() {
        this.pauseBtn = document.createElement("button");
        const pauseImg = document.createElement("img");

        pauseImg.src = PauseIcon;
        pauseImg.alt = "Pause Button";

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

        playImg.src = PlayIcon;
        playImg.alt = "Play Button";

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
    }

    handlePlayBtn(event) {
        event.preventDefault();
        this.playBtn.disabled = true;
        this.pauseBtn.disabled = false;

        this.audioInput = new AudioInput();
        this.audioInput.recordAudio();
    }
}

export default Timeline;
