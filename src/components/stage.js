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
camera.position.set(20, 5, 20);
camera.rotation.y = Math.PI / 3
scene.add(camera);

// Models
glTFLoader.load("/models/room.gltf", (glTF) => {
    for (const mesh of glTF.scene.children) {
        if (mesh.name === "Floor") {
            const map = textureLoader.load("/textures/floor_diffuse.png");
            const aoMap = textureLoader.load("/textures/floor_ao.png");
            map.flipY = false;
            aoMap.flipY = false;
            mesh.material = new THREE.MeshBasicMaterial({ map, aoMap });
        } else if (mesh.name === "Wall") {
            const map = textureLoader.load("/textures/wall_diffuse.png");
            const aoMap = textureLoader.load("/textures/wall_ao.png");
            map.flipY = false;
            aoMap.flipY - false;
            mesh.material = new THREE.MeshBasicMaterial({ map, aoMap });
        } else if (mesh.name === "Base") {
            const map = textureLoader.load("/textures/base_diffuse.png");
            const aoMap = textureLoader.load("/textures/base_diffuse.png");
            map.flipY = false;
            aoMap.flipY = false;
            mesh.material = new THREE.MeshBasicMaterial({ map, aoMap });
            for (const childMesh of mesh.children) {
                if (childMesh.name === "Top_Panel") {
                    const map = textureLoader.load("/textures/top_panel_diffuse.png");
                    const aoMap = textureLoader.load("/textures/top_panel_diffuse.png");
                    map.flipY = false;
                    aoMap.flipY = false;
                    childMesh.material = new THREE.MeshBasicMaterial({ map, aoMap });
                } else if (childMesh.name === "Bottom_Panel") {
                    const map = textureLoader.load("/textures/bottom_panel_diffuse.png");
                    const aoMap = textureLoader.load("/textures/bottom_panel_diffuse.png");
                    map.flipY = false;
                    aoMap.flipY = false;
                    childMesh.material = new THREE.MeshBasicMaterial({ map, aoMap });
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
