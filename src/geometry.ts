import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const geometry = () => {
  const canvas = document.querySelector("#webgl") as HTMLCanvasElement;
  // Sizes
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
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
  //   const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 2, 2, 2);
  const geometry = new THREE.BufferGeometry();

  const count = 50;
  const positionsArray = new Float32Array(count * 3 * 3);
  for (let i = 0; i < positionsArray.length; i++) {
    positionsArray[i] = (Math.random() - 0.5) * 4;
  }

  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positionsArray, 3)
  );

  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

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

  // Double CLick listener
  const handleDblClick = () => {
    const fullscreenElement =
      document.fullscreenElement ||
      ((document as any).webkitFullscreen as Element | null);
    if (!fullscreenElement) {
      if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
      } else if ((canvas as any).webkitRequestFullscreen) {
        (canvas as any).webkitRequestFullscreen();
      }

      return;
    }

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    }
  };
  window.addEventListener("dblclick", handleDblClick);

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  renderer.render(scene, camera);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.update();

  // Animation
  let isActive = true;

  const tick = () => {
    if (isActive) {
      controls.update();
      // Render
      renderer.render(scene, camera);

      window.requestAnimationFrame(tick);
    }
  };
  tick();

  return () => {
    isActive = false;
    window.removeEventListener("resize", handleResize);
    window.removeEventListener("dblclick", handleDblClick);
  };
};
