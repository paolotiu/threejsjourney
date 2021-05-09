import * as THREE from "three";
import gsap from "gsap";

export const animation = () => {
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

  // Camera
  const camera = new THREE.PerspectiveCamera(75, width / height);
  camera.position.z = 3;
  scene.add(camera);

  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#webgl") as HTMLCanvasElement,
  });

  renderer.setSize(width, height);
  renderer.render(scene, camera);

  gsap.to(mesh.position, {
    x: -2,
    duration: 2,
    delay: 1,
  });

  gsap.to(mesh.position, {
    x: 4,
    duration: 2,
    delay: 3,
  });

  let isActive = true;
  const tick = () => {
    if (isActive) {
      // Rerender
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }
  };
  tick();

  return () => (isActive = false);
};
