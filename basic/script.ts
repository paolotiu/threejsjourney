import * as THREE from "https://cdn.skypack.dev/three@v0.128.0-4xvsPydvGvI2Nx1Gbe39";

// Scene
const scene = new THREE.Scene();

// Red cub
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const width = 800;
const height = 600;

const camera = new THREE.PerspectiveCamera(75, width / height);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#webgl") as HTMLCanvasElement,
});

renderer.setSize(width, height);
renderer.render(scene, camera);
