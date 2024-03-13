import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.137.0/build/three.module.js';

// Scene
var scene = new THREE.Scene();

// Camera
var camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 0, 5);
camera.lookAt(scene.position);

// Renderer
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xCCCCCC); // Set clear color before setting size
var container = document.getElementById('point-cloud-renderer');
renderer.setSize(container.clientWidth, container.clientHeight); // Use the container's dimensions
container.appendChild(renderer.domElement); // Append the renderer to the container

// Cube
var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube); // Add the cube to the scene

// Animation function
var animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

animate();
