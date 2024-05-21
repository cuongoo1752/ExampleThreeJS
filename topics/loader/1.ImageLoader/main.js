// instantiate a loader
const loader = new THREE.ImageLoader();

// load a image resource
loader.load(
  // resource URL
  "https://mdn.github.io/learning-area/html/multimedia-and-embedding/tasks/images/larch.jpg",

  // onLoad callback
  function (image) {
    // use the image, e.g. draw part of it on a canvas
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;

    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);

    document.getElementById("context").appendChild(canvas);
  },

  // onProgress callback currently not supported
  undefined,

  // onError callback
  function () {
    console.error("An error happened.");
  }
);
