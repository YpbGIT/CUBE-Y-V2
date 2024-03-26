// Gestion de la souris pour la rotation du cube
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

function onMouseMove(event) {
    const deltaMove = { x: event.clientX - previousMousePosition.x, y: event.clientY - previousMousePosition.y };
    if (isDragging) {
        const deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(
            toRadians(deltaMove.y * 0.5), toRadians(deltaMove.x * 0.5), 0, 'XYZ'
        ));
        cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);
    }
    previousMousePosition = { x: event.clientX, y: event.clientY };
}

function onMouseDown(event) {
    if (event.button === 0) {
        isDragging = true;
    } else if (event.button === 2) { // Click droit
        onClick(event);
    }
}

function onMouseUp(event) {
    if (event.button === 0) {
        isDragging = false;
    }
}

// Gestion de l'événement de clic sur une face du cube
function onClick(event) {
    const intersects = getIntersects(event.layerX, event.layerY);
    if (intersects.length > 0) {
        const faceIndex = intersects[0].faceIndex;
        let link;
        switch (faceIndex) {
            case 0:
                link = "https://docs.google.com/document/d/1Jm8xDaO-ug5mJjd80_AtxVfbW34VrpgbbZk17uggI6E/edit?usp=drive_link";
                break;
            case 1:
                link = "https://docs.google.com/document/d/1N7Tvqwb08Dm8n8uIdzszmKlDtrLxQb9tIAgQ4718HiE/edit?usp=drive_link";
                break;
            case 3:
                link = "https://docs.google.com/document/d/1-1NHKdxr2bbCupoXDKOIg-6yjj-UJ_hKN3YdW4TXEx0/edit?usp=drive_link";
                break;
            case 4:
                link = "https://docs.google.com/document/d/1JEiMllBYAB7V8p-OHZQMotODQyS4I9Pvp7oge1YSZJA/edit?usp=drive_link";
                break;
            default:
                return;
        }
        window.open(link, "_blank");
    }
}

// Fonction pour obtenir les intersections entre les rayons de la souris et les faces du cube
function getIntersects(x, y) {
    x = (x / window.innerWidth) * 2 - 1;
    y = -(y / window.innerHeight) * 2 + 1;
    const vector = new THREE.Vector3(x, y, 0.5);
    vector.unproject(camera);
    const raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    return raycaster.intersectObject(cube);
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
