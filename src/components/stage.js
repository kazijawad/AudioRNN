import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// Loaders
const glTFLoader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();

// Canvas
const canvas = document.querySelector(".stage");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.set(18, 5, 18);
camera.rotation.y = Math.PI / 4
scene.add(camera);

// Lights
const pointLight = new THREE.PointLight(0xFFFFFF, 1.7, 100);
pointLight.position.set(20, 20, 20);
scene.add(pointLight);

// Models
glTFLoader.load("/models/room.gltf", (glTF) => {
    for (const mesh of glTF.scene.children) {
        if (mesh.name === "Floor") {
            mesh.material = new THREE.MeshStandardMaterial({ color: 0x8C7161 });
        } else if (mesh.name === "Wall") {
            mesh.material = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
        } else if (mesh.name === "Base") {
            mesh.material = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
            for (const childMesh of mesh.children) {
                if (childMesh.name === "Top_Panel" && childMesh.name === "Bottom_Panel") {
                    childMesh.material = new THREE.MeshStandardMaterial({ color: 0x262622 });
                }
            }
        }
    }
    scene.add(glTF.scene);
});

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Animation
const tick = () => {
    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();

export default scene;
