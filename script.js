// --- Player state ---
const player = {
  pos: new THREE.Vector3(),
  alive: true,
  reloading: false,
  lastShot: 0,
  weapon: { ammo: 30, dmg: 10, rate: 200, spread: 0.01 } // example
};

// --- Shooting logic ---
controllerR.addEventListener('selectstart', () => {
  shootVR();
});

function shootVR(){
  if (!player.alive || player.reloading) return;

  const now = performance.now();
  if (now - player.lastShot < player.weapon.rate) return;

  if (player.weapon.ammo <= 0) {
    player.reloading = true;
    player.reloadStart = now;
    return;
  }

  player.lastShot = now;
  player.weapon.ammo--;

  const origin = controllerR.getWorldPosition(new THREE.Vector3());
  const dir = new THREE.Vector3(0,0,-1).applyQuaternion(controllerR.quaternion);

  fireBullet(origin, dir, player.weapon.dmg, true, player.weapon.spread);
}

// --- Movement (WASD / simple) ---
function updatePlayer(dt){
  playerRig.position.copy(player.pos);
}

// --- Hide crosshair in VR ---
if (renderer.xr.isPresenting) document.getElementById('xhair').style.display='none';
