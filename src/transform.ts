import * as THREE from "three";

export const transform = () => {
  // Scene
  const scene = new THREE.Scene();

  const width = 800;
  const height = 600;

  const group = new THREE.Group();

  const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
  );

  group.add(cube1);

  const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  );

  cube2.position.x = -2;

  group.add(cube2);

  const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
  );

  cube3.position.x = 2;

  group.add(cube3);
  group.position.y = 1;
  group.scale.y = 2;
  group.rotation.y = 1;

  scene.add(group);

  const camera = new THREE.PerspectiveCamera(75, width / height);
  camera.position.z = 3;
  scene.add(camera);

  const axesHelper = new THREE.AxesHelper();
  scene.add(axesHelper);

  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#webgl") as HTMLCanvasElement,
  });

  renderer.setSize(width, height);
  renderer.render(scene, camera);
};
