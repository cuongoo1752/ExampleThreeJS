var scene;
var cube;
var camera;
var renderer;
var clock;
var holder;
var intersects;
var particles = [];
var level = 1;
var totalLevels = 4;
var score = 0;
var totalTargets = 3;
var speed = 0.01;
var complete = false;
var comments = ["Dễ", "Bình thường", "Hơi khó", "Rất khó"];
var myLevel = document.getElementById("level");
var myScore = document.getElementById("score");

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

// Tạo screne hiển thị
function myScene() {
  scene = new THREE.Scene();
  var width = window.innerWidth;
  var height = window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 18;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  document.getElementById("webgl-container").appendChild(renderer.domElement);
  clock = new THREE.Clock();

  // Thêm ánh sáng
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(500, 200, 200);
  scene.add(directionalLight);

  var aLight = new THREE.AmbientLight(0xffffff);
  scene.add(aLight);
}

function addHolder() {
  holder = new THREE.Object3D();
  holder.name = "holder";

  for (var i = 0; i < totalTargets; i++) {
    // Thêm khối hộp và màu sắc ngẫu nhiên
    var ranCol = new THREE.Color();
    ranCol.setRGB(Math.random(), Math.random(), Math.random());

    var geometry = new THREE.BoxGeometry(2, 2, 2);
    var material = new THREE.MeshPhongMaterial({
      color: ranCol,
      ambient: ranCol,
    });

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = i * 5;
    cube.name = "cubeName" + i;

    var spinner = new THREE.Object3D();
    spinner.rotation.x = i * 2.5 * Math.PI;
    spinner.name = "spinnerName" + i;

    spinner.add(cube);
    holder.add(spinner);
  }
  scene.add(holder);
}

// Thêm vụ nổ ra làm 4 mảnh
function addExplosion(point) {
  var timeNow = clock.getElapsedTime();

  for (var i = 0; i < 4; i++) {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x999999 });
    var part = new THREE.Mesh(geometry, material);
    part.position.x = point.x;
    part.position.y = point.y;
    part.position.z = point.z;
    part.name = "part" + i;
    part.birthDay = timeNow;
    scene.add(part);
    particles.push(part);
  }
}

// Animate hoạt động liên tục
function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  // Xoay vòng và di chuyển phần tử
  holder.children.forEach(function (elem, index, array) {
    elem.rotation.y += speed * (6 - index);
    elem.children[0].rotation.x += 0.01;
    elem.children[0].rotation.y += 0.01;
  });

  if (particles.length > 0) {
    particles.forEach(function (elem, index, array) {
      switch (elem.name) {
        case "part0":
          elem.position.x += 1;
          break;
        case "part1":
          elem.position.x -= 1;
          break;
        case "part2":
          elem.position.y += 1;
          break;
        case "part3":
          elem.position.y -= 1;
          break;
        default:
          break;
      }

      if (elem.birthDay - clock.getElapsedTime() < -1) {
        scene.remove(elem);
        particles.splice(index, 1);
      }
    });
  }

  renderer.render(scene, camera);
}

// Xử lý khi click chuột
function onDocumentMouseDown(event) {
  event.preventDefault();

  if (complete) {
    complete = false;
    score = 0;
    restartScene();
    return;
  }

  // Tính toán vị trí chuột trên màn hình
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  if (score < totalTargets) {
    holder.children.forEach(function (elem, index, array) {
      intersects = raycaster.intersectObjects(elem.children);
      if (intersects.length > 0 && intersects[0].object.visible) {
        intersects[0].object.visible = false;

        addExplosion(intersects[0].point);
        score += 1;

        if (score < totalTargets) {
          myScore.innerHTML =
            "<span class='hit'>Trùng rồi!</span> Điểm của bạn: " +
            score +
            "/" +
            totalTargets;
        } else {
          complete = true;

          if (level < totalLevels) {
            myScore.innerHTML =
              "<strong>Bạn đã chiến thắng!</strong>Bấm vào màn hình để lên level." +
              (level + 1) +
              ".";
          } else {
            myScore.innerHTML =
              "<strong>Bạn đã chiến thắng!</strong> Bấm vào màn hình để bắt đầu lại.";
          }
        }
      }
    });
  }
}

// Khởi động lại màn
function restartScene() {
  myScore.innerHTML = "";

  if (level < totalLevels) {
    // Tăng level cho người chơi
    speed += 0.005;
    totalTargets += 1;
    level += 1;
  } else {
    // Trả về level 1
    speed = 0.01;
    totalTargets = 3;
    level = 1;
  }

  myLevel.innerText =
    comments[level - 1] + ": Cấp độ " + level + " / " + totalLevels;
  scene.remove(holder);
  addHolder();
}

document
  .getElementById("webgl-container")
  .addEventListener("mousedown", onDocumentMouseDown, false);

// Thay đổi camera khi thay đổi khung hình
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();
}

window.onload = function () {
  myLevel.innerText =
    comments[level - 1] + ": Cấp độ " + level + " / " + totalLevels;
  myScene();
  addHolder();
  animate();

  window.addEventListener("resize", onWindowResize, false);
};
