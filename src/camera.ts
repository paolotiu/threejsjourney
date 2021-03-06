import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const camera = () => {
  // Sizes
  const sizes = {
    width: 800,
    height: 600,
  };

  /**
   * Cursor
   */
  const cursor = {
    x: 0,
    y: 0,
  };
  window.addEventListener("mousemove", (e) => {
    cursor.x = e.clientX / sizes.width - 0.5;
    cursor.y = -(e.clientY / sizes.height - 0.5);
  });
  // Scene
  const scene = new THREE.Scene();

  // Object
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshBasicMaterial({
    color: "#ff0000",
  });
  const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
  scene.add(cubeMesh);

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  // camera.position.x = 2;
  // camera.position.y = 2;
  camera.position.z = 3;
  // camera.lookAt(cubeMesh.position);
  scene.add(camera);

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#webgl") as HTMLCanvasElement,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.update();
  // Animation
  let isActive = true;
  const clock = new THREE.Clock();

  const tick = () => {
    if (isActive) {
      const elapsedTime = clock.getElapsedTime();

      // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
      // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
      // camera.position.y = cursor.y * 5;

      // camera.lookAt(cubeMesh.position);

      controls.update();
      // Render
      renderer.render(scene, camera);

      window.requestAnimationFrame(tick);
    }
  };
  tick();

  return () => {
    isActive = false;
    cubeGeometry.dispose();
    cubeMaterial.dispose();
  };
};
