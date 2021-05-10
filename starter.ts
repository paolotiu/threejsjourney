import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const starter = () => {
  // Canvas
  const canvas = document.querySelector("#webgl") as HTMLCanvasElement;

  // Scene
  const scene = new THREE.Scene();

  // Red cube
  const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Sizes
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio() {
      return this.width / this.height;
    },
  };

  // Camera
  const camera = new THREE.PerspectiveCamera(75, sizes.aspectRatio());
  camera.position.z = 3;
  scene.add(camera);

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
  });
  renderer.setSize(sizes.width, sizes.height);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  renderer.render(scene, camera);

  // Handle resize
  const handleResize = () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  };
  window.addEventListener("resize", handleResize);

  // Animate
  let isActive = true;

  const tick = () => {
    if (isActive) {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }
  };
  tick();

  return () => {
    isActive = false;
  };
};
