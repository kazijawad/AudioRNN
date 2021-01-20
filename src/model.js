import Pitchfinder from "pitchfinder";

async function playMusic(noteSequence) {
    try {
        const mm = await import("@magenta/music/es6");

        const player = new mm.Player();

        const model = new mm.MusicRNN("https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/melody_rnn");
        model.initialize();

        if (player.isPlaying()) {
            player.stop();
            return;
        }
    
        const quantizedNoteSequence = mm.sequences.quantizeNoteSequence(noteSequence, 4);
        const sample = await model.continueSequence(quantizedNoteSequence, 20, 0.5);
        player.start(sample);
    } catch (error) {
        console.error(error);
    }
}

async function handleAudio() {
    try {
        const Tone = await import("tone");

        const size = Math.pow(2, 10);

        const analyzer = new Tone.Waveform(size);
        const microphone = new Tone.UserMedia();
        microphone.connect(analyzer);

        const detectPitch = Pitchfinder.Macleod({ sampleRate: Tone.context.sampleRate });

        await microphone.open();

        const noteSequence = { notes: [], totalTime: 0 };
        let currentTime = 0;

        const recordAudio = setInterval(() => {
            const value = analyzer.getValue();
            const pitch = detectPitch(value);
            const midi = Math.round(69 + 12 * Math.log2(pitch.freq / 440));

            if (midi) {
                const normalizedTime = (currentTime + 100) / 1000;
                noteSequence.notes.push({
                    pitch: midi,
                    startTime: (currentTime) / 1000,
                    endTime: normalizedTime,
                });
                noteSequence.totalTime = normalizedTime;
            }

            currentTime += 100;

            if (currentTime >= 5000) {
                clearInterval(recordAudio);
                microphone.close();
                playMusic(noteSequence);
            }
        }, 100);
    } catch (error) {
        console.error(error);
    }
}

const button = document.querySelector("#audio");

button.addEventListener("click", handleAudio);
