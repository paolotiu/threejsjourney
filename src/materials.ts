import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

export const materials = () => {
  /**
   * Debug
   */
  const gui = new dat.GUI();

  // Canvas
  const canvas = document.querySelector("#webgl") as HTMLCanvasElement;

  // Scene
  const scene = new THREE.Scene();

  // Textures
  const textureLoader = new THREE.TextureLoader();
  const colorTexture = textureLoader.load("door/color.jpg");
  const aoTexture = textureLoader.load("door/ao.jpg");
  const heightTexture = textureLoader.load("door/height.png");
  const metalTexture = textureLoader.load("door/metal.jpg");
  const normalTexture = textureLoader.load("door/normal.jpg");
  const roughnessTexture = textureLoader.load("door/roughness.jpg");
  const alphaTexture = textureLoader.load("door/alpha.jpg");
  const gradientTexture = textureLoader.load("gradients/0.jpg");
  const matcapTexture = textureLoader.load("matcaps/0.png");

  // Envmap
  const cubeTextureLoader = new THREE.CubeTextureLoader();
  const envMapTexture = cubeTextureLoader
    .setPath("textures/environmentMaps/3/")
    .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);

  console.log(envMapTexture);
  /**
   * Objects
   */

  //   const material = new THREE.MeshBasicMaterial({});
  //   material.map = colorTexture;
  //   material.alphaMap = alphaTexture;
  //   material.transparent = true;
  //   material.side = THREE.DoubleSide;

  //   const material = new THREE.MeshNormalMaterial({ normalMap: normalTexture });
  //   const material = new THREE.MeshDepthMaterial();
  //   const material = new THREE.MeshPhongMaterial();
  //   const colors = new Uint8Array(5);

  //   for (let c = 0; c <= colors.length; c++) {
  //     colors[c] = (c / colors.length) * 256;
  //   }

  //   const gradientMap = new THREE.DataTexture(
  //     colors,
  //     colors.length,
  //     1,
  //     THREE.LuminanceFormat
  //   );

  //   gradientMap.minFilter = THREE.NearestFilter;
  //   gradientMap.magFilter = THREE.NearestFilter;
  //   gradientMap.generateMipmaps = false;
  //   const material = new THREE.MeshToonMaterial({
  //     gradientMap,
  //     color: 0x11ff88,
  //   });

  const material = new THREE.MeshStandardMaterial({
    // map: colorTexture,
    // aoMap: aoTexture,
    // displacementMap: heightTexture,
    // displacementScale: 0.05,
    // metalnessMap: metalTexture,
    // roughnessMap: roughnessTexture,
    // normalMap: normalTexture,
    // alphaMap: alphaTexture,
    // transparent: true,
    metalness: 0.7,
    roughness: 0.2,
    envMap: envMapTexture,
  });

  gui.add(material, "aoMapIntensity").min(0).max(10).step(0.0001);
  gui.add(material, "metalness").min(0).max(1).step(0.0001);
  gui.add(material, "roughness").min(0).max(1).step(0.0001);
  gui.add(material, "displacementScale").min(0).max(1).step(0.0001);

  /**
   * Lights
   */
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.5);
  pointLight.position.x = 2;
  pointLight.position.y = 3;
  pointLight.position.z = 4;
  scene.add(pointLight);

  const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 64, 64),
    material
  );
  sphere.geometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
  );

  sphere.position.x = -1.5;
  const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1, 1, 100, 100),
    material
  );
  plane.geometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
  );

  const torus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(0.3, 0.2, 64, 128),
    material
  );

  torus.geometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
  );
  scene.add(sphere, plane, torus);

  torus.position.x = 1.5;
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
  const clock = new THREE.Clock();

  const tick = () => {
    if (isActive) {
      const elapsedTime = clock.getElapsedTime();
      /**
       * Animation
       */
      sphere.rotation.y = 0.1 * elapsedTime;
      plane.rotation.y = 0.1 * elapsedTime;
      torus.rotation.y = 0.1 * elapsedTime;

      sphere.rotation.x = 0.15 * elapsedTime;
      plane.rotation.x = 0.15 * elapsedTime;
      torus.rotation.x = 0.15 * elapsedTime;

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
