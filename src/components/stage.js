import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import styles from "./stage.module.css";
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";

class Stage {
    constructor(canvasID) {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        // Renderer
        this.canvas = document.getElementById(canvasID);
        this.canvas.classList.add(styles.stage);
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor("#2d3436", 1);

        // Scene
        this.scene = new THREE.Scene();

        // Camera
        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
        this.camera.position.set(0, 0, -4);
        this.camera.lookAt(new THREE.Vector3());
        this.scene.add(this.camera);

        // Controls
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.update();

        // Test Cube
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                color: {
                    value: new THREE.Color("#fff"),
                },
                time: {
                    value: 0,
                },
            },
        });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.cube);

        window.addEventListener("resize", () => {
            // Update Dimensions
            this.width = window.innerWidth;
            this.height = window.innerHeight;

            // Update Camera
            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();

            // Update Renderer
            this.renderer.setSize(this.width, this.height);
        })

        this.render = () => {
            this.cube.rotation.y += 0.01;
            this.material.uniforms.time.value += 0.01;

            this.controls.update();
            this.renderer.render(this.scene, this.camera);
            window.requestAnimationFrame(this.render);
        }
    }
}

export default Stage;
