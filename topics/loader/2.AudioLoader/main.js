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

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

// instantiate a listener
const audioListener = new THREE.AudioListener();

// add the listener to the camera
camera.add(audioListener);

// instantiate audio object
const oceanAmbientSound = new THREE.Audio(audioListener);

// add the audio object to the scene
scene.add(oceanAmbientSound);

// instantiate a loader
const loader = new THREE.AudioLoader();
loader.setCrossOrigin('anonymous');

// load a resource
loader.load(
  // resource URL
  "https://s3.sa-east-1.amazonaws.com/cloudtag.io/background_1.mp3",

  // onLoad callback
  function (audioBuffer) {
    // set the audio object buffer to the loaded object
    oceanAmbientSound.setBuffer(audioBuffer);

    // play the audio
    oceanAmbientSound.play();
  },

  // onProgress callback
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },

  // onError callback
  function (err) {
    console.log("An error happened");
  }
);
