import * as THREE from "https://cdn.skypack.dev/three@v0.128.0-4xvsPydvGvI2Nx1Gbe39";
// Scene
var scene = new THREE.Scene();
// Red cub
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
});
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
var width = 800;
var height = 600;
var camera = new THREE.PerspectiveCamera(75, width / height);
camera.position.set(0, 1, 10);
camera.rotation.set(-0.2, 0, 0);
scene.add(camera);
var renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#webgl"),
});
renderer.setSize(width, height);
renderer.render(scene, camera);
console.log(camera.position);
