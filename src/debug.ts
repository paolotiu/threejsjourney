import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import * as dat from "dat.gui";

export const debug = () => {
  /**
   * Debug
   */

  const gui = new dat.GUI({
    closed: true,
    width: 400,
  });

  const parameters = {
    color: 0xff0000,
    spin: () => {
      gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2, duration: 1 });
    },
  };

  // Canvas
  const canvas = document.querySelector("#webgl") as HTMLCanvasElement;

  // Scene
  const scene = new THREE.Scene();

  // Red cube
  const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
  const loader = new THREE.TextureLoader();
  const material = new THREE.MeshStandardMaterial({
    map: loader.load("wood/color.jpg"),
    normalMap: loader.load("padded/normal.jpg"),
  });

  const pointlight = new THREE.PointLight();
  pointlight.position.z = 2;
  scene.add(pointlight);
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  gui.add(mesh.position, "x").min(-3).max(3).step(0.01);
  gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation");
  gui.add(mesh.rotation, "z").min(-3).max(3).step(0.01).name("z rotation");
  gui.add(mesh, "visible");
  gui.add(material, "wireframe");
  gui.addColor(parameters, "color").onChange((color) => {
    material.color.set(color);
  });
  gui.add(parameters, "spin");

  // SIZES
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio() {
      return this.width / this.height;
    },
  };

  // CAMERA
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
      //   camera.position.z = mesh.position.z + 3;
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
