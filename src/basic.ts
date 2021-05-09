import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const main = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#webgl") as HTMLCanvasElement,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({
    color: "blue",
    emissive: "white",
    emissiveIntensity: 0.1,
    roughness: 0.2,
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const light = new THREE.PointLight(0xff0000, 100, 100);

  light.position.x = -1;
  light.position.z = 2;

  const pointLightHelper = new THREE.PointLightHelper(light, 1);

  scene.add(pointLightHelper);

  const light2 = new THREE.DirectionalLight(0x00ff00, 1000);
  const targetObject = new THREE.Object3D();
  scene.add(targetObject);

  light2.target = targetObject;

  targetObject.position.y = 0;
  light2.position.x = 1;

  const directionalLightHelper = new THREE.DirectionalLightHelper(light2);

  scene.add(light2);
  scene.add(directionalLightHelper);

  //   light.add(
  //     new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xff0040 }))
  //   );

  scene.add(light);

  camera.position.z = 5;

  // controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", render);
  controls.minDistance = 1;
  controls.maxDistance = 50;
  controls.enablePan = false;

  function render() {
    renderer.render(scene, camera);
  }

  render();
};
