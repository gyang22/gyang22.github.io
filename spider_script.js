// script.js

import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import { PCDLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/PCDLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { TWEEN } from 'https://cdn.skypack.dev/@tweenjs/tween.js';

var container = document.getElementById('point-cloud-renderer');

if (container) {
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // Set the background to white

    var camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 10000);
    
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xffffff); // Set renderer clear color to white
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    var controls = new OrbitControls(camera, renderer.domElement);

    var loader = new PCDLoader();
    loader.load('2024-05-25 17-27-41.pcd', function (points) {
        // Get the bounding box to determine height range
        points.geometry.computeBoundingBox();
        const boundingBox = points.geometry.boundingBox;
        const minY = boundingBox.min.y;
        const maxY = boundingBox.max.y;

        // Create a color array based on height
        const colors = new Float32Array(points.geometry.attributes.position.count * 3);
        for (let i = 0; i < points.geometry.attributes.position.count; i++) {
            const y = points.geometry.attributes.position.getY(i);
            const t = (y - minY) / (maxY - minY);
            const color = new THREE.Color();
            color.setHSL(t * 0.7, 1.0, 0.5); // Adjust the gradient color range as needed

            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        // Set the color attribute for the geometry
        points.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        points.material = new THREE.PointsMaterial({ size: 0.05, vertexColors: true });

        scene.add(points);
        points.scale.set(1.7, 1.7, 1.7); // Set scale to 1, 1, 1 to ensure proper scaling
        points.geometry.center(); // Center the geometry

        var center = points.geometry.boundingSphere.center;
        camera.position.set(center.x, center.y + 500, center.z + 1500); // Adjust the camera position
        camera.lookAt(center); // Camera now looks at the center of the point cloud

        controls.target.set(center.x, center.y, center.z); // Set OrbitControls target
        controls.update();

        animate();
    });

    var isUserInteracting = false;
    var userInteractionTimeout;

    controls.addEventListener('start', function () {
        isUserInteracting = true;
        clearTimeout(userInteractionTimeout);
    });

    controls.addEventListener('end', function () {
        userInteractionTimeout = setTimeout(function () {
            isUserInteracting = false;
            new TWEEN.Tween(camera.position)
                .to(initialCameraPosition, 2000) // Move back to the initial position over 2 seconds
                .easing(TWEEN.Easing.Quadratic.Out) // Easing function
                .start();
        }, 3000);
    });

    var animate = function () {
        requestAnimationFrame(animate);

        if (!isUserInteracting) {
            scene.rotation.y += 0.01; // Rotate the scene around the Y-axis
        }

        TWEEN.update(); // Update TWEEN animations
        controls.update(); // Required if controls.enableDamping or controls.autoRotate are set to true

        renderer.render(scene, camera);
    };


    animate(); // Start the animation loop

    window.addEventListener('resize', function () {
        const aspectRatio = container.clientWidth / container.clientHeight;
        camera.aspect = aspectRatio;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}
