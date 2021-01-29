class Timeline {
    constructor(containerID) {
        this.container = document.getElementById(containerID);
    }

    render() {
        const playButton = document.createElement("button");
        playButton.textContent = "Play";
        this.container.appendChild(playButton);
    }
}

export default Timeline;
