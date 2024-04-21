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

// Box Shape
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const cube = new THREE.Mesh(boxGeometry, material);
scene.add(cube);
cube.position.x = -4;

// Circle Shape
const circleGeometry = new THREE.CircleGeometry(1, 40);
const circle = new THREE.Mesh(circleGeometry, material);
scene.add(circle);
circle.position.x = -2;

// Cylinder Shape
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 1, 2, 32);
const cylinder = new THREE.Mesh(cylinderGeometry, material);
scene.add(cylinder);
cylinder.position.x = 0;

// Ring Shape
const ringGeometry = new THREE.RingGeometry(0.5, 1, 32);
const ring = new THREE.Mesh(ringGeometry, material);
scene.add(ring);
ring.position.x = 2;

// Heart shape
const x = 0,
  y = 0;

const heartShape = new THREE.Shape();
heartShape.moveTo(x + 0.5, y + 0.5);
heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
heartShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
heartShape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
heartShape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
heartShape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y);
heartShape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);
const geometry = new THREE.ShapeGeometry(heartShape);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
mesh.position.x = 4;

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(200, 500, 300);
scene.add(directionalLight); 
camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  circle.rotation.x += 0.01;
  circle.rotation.y += 0.01;

  cylinder.rotation.x += 0.01;
  cylinder.rotation.y += 0.01;

  ring.rotation.x += 0.01;
  ring.rotation.y += 0.01;

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
