// Initialize Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000); // Black background
document.body.appendChild(renderer.domElement);

// Create Nucleus (Protons)
const nucleusGeometry = new THREE.SphereGeometry(1, 32, 32);
const nucleusMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red for protons
const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
scene.add(nucleus);

// Create Electrons
const electronGroup = new THREE.Group();
const electronOrbitRadius = 3;
const electronCount = 3; // Number of electrons

for (let i = 0; i < electronCount; i++) {
    const electronGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const electronMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // Blue for electrons
    const electron = new THREE.Mesh(electronGeometry, electronMaterial);
    
    // Position electrons in different orbits
    const angle = (Math.PI * 2 * i) / electronCount;
    electron.position.x = electronOrbitRadius * Math.cos(angle);
    electron.position.y = electronOrbitRadius * Math.sin(angle);
    
    electronGroup.add(electron);
}

scene.add(electronGroup);

// Adjust Camera
camera.position.set(0, 0, 10);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate nucleus
    nucleus.rotation.x += 0.005;
    nucleus.rotation.y += 0.005;

    // Rotate electrons around the nucleus
    electronGroup.rotation.z += 0.02;

    renderer.render(scene, camera);
}

animate();

// Handle Window Resizing
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
