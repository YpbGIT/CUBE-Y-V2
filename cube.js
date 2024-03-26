// Créer une scène
const scene = new THREE.Scene();

// Créer une caméra
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Créer un renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Liste des chemins des fichiers PNG pour chaque face du cube
const textureFiles = [
    'face1.png',
    'face2.png',
    'face3.png',
    'face4.png',
    'face5.png',
    'face6.png'
];

// Créer des matériaux avec des textures pour chaque face
const materials = textureFiles.map(file => {
    const texture = new THREE.TextureLoader().load(file);
    return new THREE.MeshBasicMaterial({ map: texture });
});

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

// Gestion de la souris pour la rotation du cube
let isDragging = false;
let previousMousePosition = {
    x: 0,
    y: 0
};

function onMouseMove(event) {
    const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y
    };

    if (isDragging) {
        const deltaRotationQuaternion = new THREE.Quaternion()
            .setFromEuler(new THREE.Euler(
                toRadians(deltaMove.y * 0.5),
                toRadians(deltaMove.x * 0.5),
                0,
                'XYZ'
            ));

        cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);
    }

    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
}

function onMouseDown(event) {
    isDragging = true;
}

function onMouseUp(event) {
    isDragging = false;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Ajouter les écouteurs d'événements de la souris
document.addEventListener('mousemove', onMouseMove, false);
document.addEventListener('mousedown', onMouseDown, false);
document.addEventListener('mouseup', onMouseUp, false);

// Fonction de rendu
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.005;
    renderer.render(scene, camera);
}

animate();
