import * as mm from "@magenta/music/es6";
import * as THREE from "three";

import scene from "./stage";

class MusicRNN {
    constructor() {
        this.player = new mm.Player();

        this.model = new mm.MusicRNN("https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/melody_rnn");
        if (!this.model.isInitialized) {
            this.model.initialize();
        }
    }

    async generateMusic(noteSequence, progressWidth, progressBar) {
        if (this.player.isPlaying()) {
            this.player.stop();
            return;
        }

        if (noteSequence.totalTime <= 0) {
            console.error("No notes were generated.");
        }

        if (this.particles && this.particles.length > 0) {
            this.particles.forEach((object) => scene.remove(object));
        }

        this.quantizedNoteSequence = mm.sequences.quantizeNoteSequence(noteSequence, 4);
        this.sample = await this.model.continueSequence(this.quantizedNoteSequence, 20, 0.75);
        this.player.start(this.sample);

        const unquantizedNotes = mm.sequences.unquantizeSequence(this.sample);
        const totalTime = unquantizedNotes.totalTime * 1000;
        const interval = (100 / totalTime) * 100;
        let time = 100;

        this.particles = [];
        const count = 100;
        const textureLoader = new THREE.TextureLoader();
        const sprite = textureLoader.load("/textures/circle.png");

        this.progressInterval = setInterval(() => {
            if (time >= totalTime) {
                progressWidth = 50;
                progressBar.style.width = "100%";
                clearInterval(this.progressInterval);
            } else {
                const positions = new Float32Array(count * 3);
                const colors = new Float32Array(count * 3);
                const particlesGeometry = new THREE.BufferGeometry();

                for (let i = 0; i < count; i++) {
                    const i3 = i * 3;

                    positions[i3] = (Math.random() * (6 - 8) + 8);
                    positions[i3 + 1] = Math.random() * 2;
                    positions[i3 + 2] = (Math.random() * (6 - 8) + 8);

                    colors[i3] = Math.random() / 4;
                    colors[i3 + 1] = Math.random() / 4;
                    colors[i3 + 2] = Math.random();
                }

                particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
                particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

                const particlesMaterial = new THREE.PointsMaterial({
                    size: 1,
                    sizeAttenuation: true,
                    transparent: true,
                    alphaMap: sprite,
                    depthWrite: false,
                    vertexColors: true,
                });

                const particles = new THREE.Points(particlesGeometry, particlesMaterial);
                this.particles.push(particles);
                scene.add(particles);

                const tick = () => {
                    // Animate Particles
                    const positions = particles.geometry.attributes.position.array;

                    for (let i = 0; i < count; i++) {
                        const i3 = i * 3;
    
                        positions[i3] = positions[i3] + Math.random() / 2;
                        positions[i3 + 2] = positions[i3 + 2] + Math.random() / 2;

                        particles.geometry.attributes.position.needsUpdate = true;
                    }
                
                    // Call tick again on the next frame
                    window.requestAnimationFrame(tick);
                };
                
                tick();

                progressWidth += interval;
                progressBar.style.width = `${progressWidth}%`;
            }
            time += 100;
        }, 100);
    }
}

export default MusicRNN;
