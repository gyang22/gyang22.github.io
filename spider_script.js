var scene = new THREE.Scene();
scene.background = new THREE.Color(0x333333); // Change to any color that contrasts with your point cloud
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(400, 300); // Match the size of the container
document.getElementById('point-cloud-renderer').appendChild(renderer.domElement);

// Load a PCD file
var loader = new THREE.PCDLoader();
loader.load('test_web.pcd', function (points) {
    scene.add(points);
    points.material.color.setHex(0xffffff); // Change the color so it contrasts with the background
    var center = points.geometry.boundingSphere.center;
    camera.lookAt(center);
    camera.position.z = center.z + 100; // Adjust camera position as needed
});

// Add some light
var ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);



var animate = function () {
    requestAnimationFrame(animate);
    // Rotate the point cloud around its Y axis
    scene.rotation.y += 0.01;
    renderer.render(scene, camera);
};

animate();
