const scene = new THREE.Scene();
const camera = new THREE.StereoCamera(
  80,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const material = new THREE.MeshNormalMaterial({ color: "#ffffff" });

// Cube Shape
var listCube = [];
const listPositionCube = [-4, -2, 0, 2, 4];
listPositionCube.forEach((positionCube) => {
  let boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  let cube = new THREE.Mesh(boxGeometry, material);
  listCube.push(cube);
  scene.add(cube);
  cube.position.x = positionCube;
});

// camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
