// Créer une scène
const scene = new THREE.Scene();

// Créer une caméra
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Créer un renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Créer des matériaux avec des couleurs pour chaque face
const materials = [
    new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Rouge
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Vert
    new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Bleu
    new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Jaune
    new THREE.MeshBasicMaterial({ color: 0xff00ff }), // Magenta
    new THREE.MeshBasicMaterial({ color: 0x00ffff })  // Cyan
];

// Créer la géométrie du cube
const geometry = new THREE.BoxGeometry();

// Créer le cube avec les matériaux pour chaque face
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

// Ajuster la taille du cube
cube.scale.set(2, 2, 2); // Doubler la taille du cube dans toutes les dimensions

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
