// Créer une scène
const scene = new THREE.Scene();

// Créer une caméra
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Créer un renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Charger les images pour chaque face
const textureLoader = new THREE.TextureLoader();
const texture1 = textureLoader.load('face1.png');
const texture2 = textureLoader.load('face2.png');
const texture3 = textureLoader.load('face3.png');
const texture4 = textureLoader.load('face4.png');
const texture5 = textureLoader.load('face5.png');
const texture6 = textureLoader.load('face6.png');

// Créer des matériaux avec des textures pour chaque face
const materials = [
    new THREE.MeshBasicMaterial({ map: texture1 }),
    new THREE.MeshBasicMaterial({ map: texture2 }),
    new THREE.MeshBasicMaterial({ map: texture3 }),
    new THREE.MeshBasicMaterial({ map: texture4 }),
    new THREE.MeshBasicMaterial({ map: texture5 }),
    new THREE.MeshBasicMaterial({ map: texture6 })
];

// Créer la géométrie du cube
const geometry = new THREE.BoxGeometry();

// Créer le cube avec les matériaux pour chaque face
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

// Gestion du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Fonction de rendu
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.005;
    renderer.render(scene, camera);
}

animate();