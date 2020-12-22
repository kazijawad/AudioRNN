const model = new mm.MusicRNN("https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/drum_kit_rnn");
model.initialize();

const player = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');

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

async function play() {
    if (player.isPlaying()) {
        player.stop();
        return;
    }

    const quantizedNoteSequence = mm.sequences.quantizeNoteSequence(TWINKLE_TWINKLE, 4);
    try {
        const sample = await model.continueSequence(quantizedNoteSequence, 200, 1.5);
        player.start(sample);
    } catch (error) {
        console.error(error);
    }
}

play();
