var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.set(0, 0, 5); // Position the camera away from the origin where the cube is
camera.lookAt(0, 0, 0); // Ensure the camera is looking at where the cube is placed


var animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};
animate();

scene.add(cube);
renderer.setClearColor(0xCCCCCC); // Set to a contrasting color
renderer.setSize(window.innerWidth, window.innerHeight); // Adjust as necessary
