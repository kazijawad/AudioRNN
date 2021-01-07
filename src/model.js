import { Midi } from '@tonejs/midi';

// const midi = new Midi();

const button = document.querySelector("#audio");

button.addEventListener("click", handleAudio);

async function handleAudio() {
    // const track = midi.addTrack();
    try {
        const Tone = await import("tone");
        const mm = await import("@magenta/music/es6");

        const meter = new Tone.Meter();
        const mic = new Tone.UserMedia().connect(meter);
        mic.open().then(() => {
            let time = 0;

            const recordAudio = setInterval(() => {
                const frequency = meter.toFrequency("A4");
                const midi = Tone.Frequency(frequency, "hz").toMidi();
                time += 0.1;

                console.log(meter.getValue());
                console.log(meter.toFrequency("A4"));
                console.log(midi);

                if (time >= 5) {
                    clearInterval(recordAudio);
                    mic.close();
                }
            }, 100);
        });

        const player = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');

        const model = new mm.MusicRNN("https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/melody_rnn");
        model.initialize();

        // play(mm, player, model);
    } catch (error) {
        console.error(error);
    }
}

const TWINKLE_TWINKLE = {
    notes: [
        { pitch: 60, startTime: 0.0, endTime: 0.5 },
        { pitch: 60, startTime: 0.5, endTime: 1.0 },
        { pitch: 67, startTime: 1.0, endTime: 1.5 },
        { pitch: 67, startTime: 1.5, endTime: 2.0 },
        { pitch: 69, startTime: 2.0, endTime: 2.5 },
        { pitch: 69, startTime: 2.5, endTime: 3.0 },
        { pitch: 67, startTime: 3.0, endTime: 4.0 },
        { pitch: 65, startTime: 4.0, endTime: 4.5 },
        { pitch: 65, startTime: 4.5, endTime: 5.0 },
        { pitch: 64, startTime: 5.0, endTime: 5.5 },
        { pitch: 64, startTime: 5.5, endTime: 6.0 },
        { pitch: 62, startTime: 6.0, endTime: 6.5 },
        { pitch: 62, startTime: 6.5, endTime: 7.0 },
        { pitch: 60, startTime: 7.0, endTime: 8.0 },
    ],
    tempos: [{ time: 0,  qpm: 120 }],
    totalTime: 8
};

async function play(mm, player, model) {
    if (player.isPlaying()) {
        player.stop();
        return;
    }

    const quantizedNoteSequence = mm.sequences.quantizeNoteSequence(TWINKLE_TWINKLE, 4);
    try {
        const sample = await model.continueSequence(quantizedNoteSequence, 64, 1.5);
        player.start(sample);
    } catch (error) {
        console.error(error);
    }
}
