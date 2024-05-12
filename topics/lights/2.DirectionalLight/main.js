const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const material = new THREE.MeshLambertMaterial({ color: "#049ef4" });

// Cube Shape
var listCube = [];
const listPositionCubeX = [-4, -2, 0, 2, 4];
const listPositionCubeY = [-2, 0, 2];
listPositionCubeX.forEach((positionCubeX) => {
  let boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  listPositionCubeY.forEach((positionCubeY) => {
    let cube = new THREE.Mesh(boxGeometry, material);
    listCube.push(cube);
    scene.add(cube);
    cube.position.x = positionCubeX;
    cube.position.y = positionCubeY;
  });
});
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(500, 200, 200);
scene.add(directionalLight);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
