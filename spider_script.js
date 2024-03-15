import * as THREE from 'three';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader.js';

var container = document.getElementById('point-cloud-renderer');

if (container) {
    // Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // Set background to white

    var camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xffffff, 1); // Set clear color to white
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Loader for the PCD file
    var loader = new PCDLoader();

    loader.load('test_web.pcd', function (points) {
        points.material.color.setHex(0xff0000); // Example: red points
        scene.add(points);
        points.geometry.center(); // Center the point cloud geometry

        // After the geometry is centered, set the camera position
        camera.position.set(0, 100, 100); // Adjust camera position
        camera.lookAt(points.geometry.boundingSphere.center); // Look at the center of the point cloud

        animate();
    });

    var animate = function () {
        requestAnimationFrame(animate);

        // Rotate the point cloud around the Y-axis
        scene.rotation.y += 0.01;

        renderer.render(scene, camera);
    };

    // Call the animate function to start the loop
    animate();
}
