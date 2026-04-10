// --- VR Player Rig ---
const playerRig = new THREE.Group();
scene.add(playerRig);

// Camera (VR headset)
playerRig.add(camera);
camera.position.set(0, 1.6, 0);

// --- Controllers / Hands ---
const controllerR = renderer.xr.getController(0);
const controllerL = renderer.xr.getController(1);
scene.add(controllerR, controllerL);

// Simple hand models
function createHand(color){
  return new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 16, 16),
    new THREE.MeshStandardMaterial({ color })
  );
}
controllerR.add(createHand(0x00e5ff)); // right hand
controllerL.add(createHand(0xff4081)); // left hand

// --- Gun attached to right hand ---
const gun = new THREE.Group();
const body = new THREE.Mesh(
  new THREE.BoxGeometry(0.05,0.08,0.3),
  new THREE.MeshStandardMaterial({color:0x333333})
);
body.position.z = -0.15;
const barrel = new THREE.Mesh(
  new THREE.BoxGeometry(0.03,0.03,0.25),
  new THREE.MeshStandardMaterial({color:0x555555})
);
barrel.position.z = -0.35;
gun.add(body, barrel);
controllerR.add(gun);
