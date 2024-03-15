
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader.js';

var container = document.getElementById('point-cloud-renderer');

if (container) {
    // Scene
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    
    // Set the camera position farther away and above the object
    camera.position.set(0, 5, 10);
    camera.lookAt(new THREE.Vector3(0, 0, 0)); // Make the camera look at the origin

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Loader for the PCD file
    var loader = new PCDLoader();

    loader.load('test_web.pcd', function (points) {
        scene.add(points);
        points.geometry.center(); // Center the point cloud geometry

        // Rotate the point cloud to the initial desired orientation
        points.rotation.x = Math.PI / 2;
        points.rotation.y = 0;
        points.rotation.z = 0;

        animate();
    });

    var animate = function () {
        requestAnimationFrame(animate);

        // Rotate the point cloud around the Y-axis
        scene.rotation.y += 0.01;

        renderer.render(scene, camera);
    };
}
