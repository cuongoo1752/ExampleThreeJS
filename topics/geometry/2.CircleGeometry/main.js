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

const geometry = new THREE.CircleGeometry(1, 40);
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const circle = new THREE.Mesh(geometry, material);
scene.add(circle);
scene.add(circle);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  circle.rotation.x += 0.01;
  circle.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
