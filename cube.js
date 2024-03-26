// Créer une scène
const scene = new THREE.Scene();

// Créer une caméra
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Créer un renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Charger les textures
const texture1 = new THREE.TextureLoader().load('face1.png');
const texture2 = new THREE.TextureLoader().load('face2.png');
const texture3 = new THREE.TextureLoader().load('face3.png');
const texture4 = new THREE.TextureLoader().load('face4.png');
const texture5 = new THREE.TextureLoader().load('face5.png');
const texture6 = new THREE.TextureLoader().load('face6.png');

// Créer des matériaux pour chaque face avec les textures correspondantes
const materials = [
    new THREE.MeshBasicMaterial({ map: texture1 }), // Face 1 avec texture1
    new THREE.MeshBasicMaterial({ map: texture2 }), // Face 2 avec texture2
    new THREE.MeshBasicMaterial({ map: texture3 }), // Face 3 avec texture3
    new THREE.MeshBasicMaterial({ map: texture4 }), // Face 4 avec texture4
    new THREE.MeshBasicMaterial({ map: texture5 }), // Face 5 avec texture5
    new THREE.MeshBasicMaterial({ map: texture6 })  // Face 6 avec texture6
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

// Gestion de la souris pour la rotation du cube (non modifié)
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

// Fonction de rendu (non modifié)
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.002;
    cube.rotation.y += 0.002;
    renderer.render(scene, camera);
}

animate();
