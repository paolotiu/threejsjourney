import * as THREE from "three";
export const camera = () => {
  // Sizes
  const sizes = {
    width: 800,
    height: 600,
  };

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
  //   const camera = new THREE.PerspectiveCamera(
  //     75,
  //     sizes.width / sizes.height,
  //     0.1,
  //     100
  //   );
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
  camera.position.x = 2;
  camera.position.y = 2;
  camera.position.z = 2;
  camera.lookAt(cubeMesh.position);
  scene.add(camera);

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#webgl") as HTMLCanvasElement,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);

  let isActive = true;
  const clock = new THREE.Clock();
  // Animation
  const tick = () => {
    if (isActive) {
      const elapsedTime = clock.getElapsedTime();

      // Update rotation
      cubeMesh.rotation.y = elapsedTime;

      // Render
      renderer.render(scene, camera);

      window.requestAnimationFrame(tick);
    }
  };
  tick();

  return () => (isActive = false);
};
