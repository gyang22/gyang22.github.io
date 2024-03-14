import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.137.0/build/three.module.js';
// import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.137.0/examples/jsm/controls/OrbitControls.js';

var container = document.getElementById('point-cloud-renderer');

if (container) {
    // Scene
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var geometry = new THREE.BoxGeometry();
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const controls = new OrbitControls(camera, renderer.domElement);

    var animate = function () {
        requestAnimationFrame(animate);
    
        // Rotate the cube
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    
        // Required if controls.enableDamping or controls.autoRotate are set to true
        controls.update();  
    
        renderer.render(scene, camera);
    };
    

    animate();

}

