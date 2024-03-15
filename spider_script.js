import * as THREE from 'three';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader.js';

var container = document.getElementById('point-cloud-renderer');

if (container) {
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // Set the background to white

    var camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xffffff); // Set renderer clear color to white
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    var loader = new PCDLoader();
    loader.load('test_web.pcd', function (points) {
        points.material.color.setHex(0xff0000); // Change points color to red
        scene.add(points);
        points.geometry.center(); // Center the geometry

        var center = points.geometry.boundingSphere.center;
        camera.position.set(center.x, center.y + 5, center.z + 15); // Adjust the camera position
        camera.lookAt(center); // Camera now looks at the center of the point cloud

        animate();
    });

    var animate = function () {
        requestAnimationFrame(animate);

        scene.rotation.y += 0.01; // Rotate the scene around the Y-axis

        renderer.render(scene, camera);
    };

    animate(); // Start the animation loop
}
