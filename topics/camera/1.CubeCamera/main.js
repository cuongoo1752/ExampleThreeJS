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

// Create cube render target
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(128, {
  generateMipmaps: true,
  minFilter: THREE.LinearMipmapLinearFilter,
});

// Create cube camera
const cubeCamera = new THREE.CubeCamera(1, 100000, cubeRenderTarget);
scene.add(cubeCamera);

// Create car
const carGeometry = new THREE.BoxGeometry(1, 1, 1);
const chromeMaterial = new THREE.MeshLambertMaterial({
  color: 0xffffff,
  envMap: cubeRenderTarget.texture,
});
const car = new THREE.Mesh(carGeometry, chromeMaterial);
scene.add(car);

// Update the render target cube
car.visible = false;
cubeCamera.position.copy(car.position);
cubeCamera.update(renderer, scene);

camera.position.z = 5;

// Render the scene
car.visible = true;
renderer.render(scene, camera);
