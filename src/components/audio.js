import * as Tone from 'tone';
import Pitchfinder from "pitchfinder";

class AudioInput {
    constructor() {
        this.size = Math.pow(2, 10);
        this.analyzer = new Tone.Waveform(this.size);

        this.microphone = new Tone.UserMedia();
        this.microphone.connect(this.analyzer);

        this.noteSequence = { notes: [], totalTime: 0 };
        this.currentTime = 0;

        this.detectPitch = Pitchfinder.Macleod({ sampleRate: Tone.context.sampleRate });
    }

    async recordAudio() {
        this.microphone.open();

        this.audioRecordingID = setInterval(() => {
            const value = this.analyzer.getValue();
            const pitch = this.detectPitch(value);
            const midi = Math.round(69 + 12 * Math.log2(pitch.freq / 440));

            if (midi) {
                const normalizedTime = (this.currentTime + 100) / 1000;
                this.noteSequence.notes.push({
                    pitch: midi,
                    startTime: (this.currentTime) / 1000,
                    endTime: normalizedTime,
                });
                this.noteSequence.totalTime = normalizedTime;
            }

            this.currentTime += 100;
        });
    }

    async pauseAudio() {
        clearInterval(this.audioRecordingID);
        this.microphone.close();
    }
}

export default AudioInput;
