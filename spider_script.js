// Scene
var scene = new THREE.Scene();

// Camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

// Renderer
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xCCCCCC);
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('point-cloud-renderer').appendChild(renderer.domElement);

// Cube
var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Animation
var animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};
animate();
