import styles from "./timeline.module.css";
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

        this.pauseBtn.appendChild(pauseImg);
        this.container.appendChild(this.pauseBtn);
    }

    renderPlayBtn() {
        const playBtn = document.createElement("button");
        const playImg = document.createElement("img");

        playImg.src = PlayIcon;
        playImg.alt = "Play Button";

        playBtn.classList.add(styles.timelineBtn);
        playImg.classList.add(styles.timelineImg);

        playBtn.appendChild(playImg);
        this.container.appendChild(playBtn);
    }
}

export default Timeline;
