let scene, camera, renderer, controls;

init();
animate();

function init() {
  const container = document.getElementById('canvas-container');

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0d0d0d);

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 1.5, 5);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0x404040, 1);
  scene.add(ambientLight);

  const weldingLight = new THREE.PointLight(0xffaa33, 2, 3, 2);
  weldingLight.position.set(0, 1.2, 0);
  scene.add(weldingLight);

  const sparkGeometry = new THREE.BufferGeometry();
  const sparkCount = 100;
  const positions = new Float32Array(sparkCount * 3);
  for (let i = 0; i < sparkCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 0.5;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
  }
  sparkGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const sparkMaterial = new THREE.PointsMaterial({ color: 0xffaa33, size: 0.05 });
  const sparks = new THREE.Points(sparkGeometry, sparkMaterial);
  scene.add(sparks);

  const loader = new THREE.GLTFLoader();
  loader.load('models/human_welder.glb', function (gltf) {
    gltf.scene.position.set(0, 0, 0);
    gltf.scene.scale.set(1, 1, 1);
    scene.add(gltf.scene);
  });

  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
