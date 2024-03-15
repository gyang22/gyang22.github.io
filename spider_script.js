
import { PCDLoader } from './node_modules/three/addons/loaders/PCDLoader.js';


var container = document.getElementById('point-cloud-renderer');

if (container) {
    // Scene
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(5, 5, 5);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Loader for the PCD file
    var loader = new PCDLoader();

    loader.load('test_web.pcd', function (points) {
        scene.add(points);
        points.geometry.center(); // Center the point cloud geometry
        points.geometry.rotateX(Math.PI / 2); // Adjust the orientation if needed
        animate();
    });

    var animate = function () {
        requestAnimationFrame(animate);

        // Rotate the point cloud if you want
        scene.rotation.x += 0.01;
        scene.rotation.y += 0.01;

        renderer.render(scene, camera);
    };
}
