
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader.js';

var container = document.getElementById('point-cloud-renderer');

if (container) {
    // Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // Set background to white

    var camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    
    // Set the camera position farther back to fit the object
    camera.position.set(0, 5, 15); // You may need to adjust this value depending on the size of your object
    camera.lookAt(new THREE.Vector3(0, 0, 0)); // Camera now looks at the origin

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xffffff, 1); // Set clear color to white
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Loader for the PCD file
    var loader = new PCDLoader();

    loader.load('test_web.pcd', function (points) {
        // Modify the material color of the points
        points.material.color.setHex(0xff0000); // Change 0xff0000 to any hex color you prefer for the points

        scene.add(points);
        points.geometry.center(); // Center the point cloud geometry
        animate();
    });

    var animate = function () {
        requestAnimationFrame(animate);

        // Rotate the point cloud around the Y-axis
        scene.rotation.y += 0.01;

        renderer.render(scene, camera);
    };
}
