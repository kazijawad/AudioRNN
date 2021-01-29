import styles from "./timeline.module.css";

class Timeline {
    constructor(containerID) {
        this.container = document.getElementById(containerID);
        this.container.classList.add(styles.timeline);
    }

    render() {
        const playButton = document.createElement("button");
        playButton.textContent = "Play";
        this.container.appendChild(playButton);
    }
}

export default Timeline;
