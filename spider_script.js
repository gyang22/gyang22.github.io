import * as THREE from './path/to/three.module.js';

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xCCCCCC); // Set clear color before setting size
var container = document.getElementById('point-cloud-renderer');
renderer.setSize(container.clientWidth, container.clientHeight); // Use the container's dimensions
container.appendChild(renderer.domElement); // Append the renderer to the container

// Now that the renderer is set up, add the cube
var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Ensure the cube is within view of the camera
camera.position.set(0, 0, 5);
camera.lookAt(scene.position); // Look at the center of the scene

var animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    console.log
};

animate();
