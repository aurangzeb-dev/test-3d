const camera = new THREE.PerspectiveCamera(
    75,  // Increased field of view
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;  // Moved camera closer
const scene = new THREE.Scene();

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

let bee;

const loader = new THREE.GLTFLoader();
loader.load(
    './cuteUFO_3D.glb',
    function (gltf) {
        bee = gltf.scene;
        // Center the model
        bee.position.set(0, 0, 0);
        scene.add(bee);
        console.log('Model loaded successfully:', bee);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error('An error occurred while loading the model:', error);
    }
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

const rerender3D = () => {
    requestAnimationFrame(rerender3D);
    
    // Rotate the model if it's loaded
    if (bee) {
        bee.rotation.y += 0.01;
    }
    
    renderer.render(scene, camera);
};

rerender3D();
