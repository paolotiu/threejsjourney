import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { VertexNormalsHelper } from "three/examples/jsm/helpers/VertexNormalsHelper";
import * as dat from "dat.gui";

export const textures = () => {
  const parameters = {
    clearColor: 0x1e1e1e,
    displacementBias: -0.01,
    displacementScale: 0.05,
  };
  // Debug
  const gui = new dat.GUI();
  gui.addColor(parameters, "clearColor").onChange((val) => {
    renderer.setClearColor(val);
  });
  gui
    .add(parameters, "displacementBias")
    .min(-2)
    .max(2)
    .step(0.001)
    .onChange((val) => {
      material.displacementBias = val;
    });
  gui
    .add(parameters, "displacementScale")
    .min(-2)
    .max(2)
    .step(0.01)
    .onChange((val) => {
      material.displacementScale = val;
    });

  // Canvas
  const canvas = document.querySelector("#webgl") as HTMLCanvasElement;
  const loadingManager = new THREE.LoadingManager();
  const textureLoader = new THREE.TextureLoader(loadingManager);

  // loadingManager.onStart = () => {
  //   console.log("starting");
  // };

  // loadingManager.onLoad = () => {
  //   console.log("loading");
  // };

  // Scene
  const scene = new THREE.Scene();

  // Red cube
  // const geometry = new THREE.SphereBufferGeometry(1, 50, 50);
  const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 100, 100, 100);
  // const geometry = new THREE.PlaneBufferGeometry(1, 1, 100, 100);

  const colorTexture = textureLoader.load("woodplanks/color.jpg");
  const ambientTexture = textureLoader.load("woodplanks/ambient.jpg");
  const normalTexture = textureLoader.load("woodplanks/normal.jpg");
  const heightTexture = textureLoader.load("woodplanks/height.png");
  const roughnessTexture = textureLoader.load("woodplanks/roughness.jpg");

  const material = new THREE.MeshStandardMaterial({
    map: colorTexture,
    normalMap: normalTexture,
    displacementMap: heightTexture,
    displacementScale: parameters.displacementScale,
    displacementBias: parameters.displacementBias,
    aoMap: ambientTexture,
    roughnessMap: roughnessTexture,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const ambientLight = new THREE.AmbientLight(0x404040, 3);
  scene.add(ambientLight);
  // Light
  const pointLight = new THREE.PointLight();
  pointLight.intensity = 4;
  scene.add(pointLight);
  pointLight.position.z = 3;
  pointLight.position.y = 2;

  const pointLight2 = new THREE.PointLight(0xffffff, 3);
  pointLight2.position.z = -2;
  pointLight2.position.y = -2;
  scene.add(pointLight2);

  const pointLight3 = new THREE.PointLight(0xffffff, 3);
  pointLight3.position.z = -2;
  pointLight3.position.x = 2;
  scene.add(pointLight3);

  const pointLight4 = new THREE.PointLight(0xffffff, 3);
  pointLight4.position.x = -2;
  scene.add(pointLight4);

  // const lightHelper1 = new THREE.PointLightHelper(pointLight, 1);
  // const lightHelper2 = new THREE.PointLightHelper(pointLight2, 1);
  // scene.add(lightHelper1).add(lightHelper2);

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
  renderer.setClearColor(parameters.clearColor);
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
