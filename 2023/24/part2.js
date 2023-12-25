const lines = require('../../utils').readFile('input.txt');

const hailstones = [];

const vX = {};
const vY = {};
const vZ = {};

const getRockVelocity = (velocities) => {
  let possibleV = [];
  for (let x = -1000; x <= 1000; x++) {
    possibleV.push(x);
  }

  Object.keys(velocities).forEach((velocity) => {
    const vel = parseInt(velocity, 10);
    if (velocities[vel].length < 2) {
      return;
    }

    let newPossibleV = [];
    possibleV.forEach((possible) => {
      if ((velocities[vel][0] - velocities[vel][1]) % (possible - vel) === 0) {
        newPossibleV.push(possible);
      }
    });

    possibleV = newPossibleV;
  });

  return possibleV[0];
};

async function coordinatesOfInitialPosition() {
  for (const line of lines) {
    const [positions, velocity] = line.split(' @ ');
    const [px, py, pz] = positions.split(', ').map(n => Number(n));
    const [vx, vy, vz] = velocity.split(', ').map(n => Number(n));

    if (!vX[vx]) {
      vX[vx] = [px];
    } else {
      vX[vx].push(px);
    }

    if (!vY[vy]) {
      vY[vy] = [py];
    } else {
      vY[vy].push(py);
    }

    if (!vZ[vz]) {
      vZ[vz] = [pz];
    } else {
      vZ[vz].push(pz);
    }

    hailstones.push({px, py, pz, vx, vy, vz});
  }

  const rvx = getRockVelocity(vX);
  const rvy = getRockVelocity(vY);
  const rvz = getRockVelocity(vZ);

  const results = {};
  for (let i = 0; i < hailstones.length; i++) {
    for (let j = i + 1; j < hailstones.length; j++) {
      const stoneA = hailstones[i];
      const stoneB = hailstones[j];

      const ma = (stoneA.vy - rvy) / (stoneA.vx - rvx);
      const mb = (stoneB.vy - rvy) / (stoneB.vx - rvx);

      const ca = stoneA.py - ma * stoneA.px;
      const cb = stoneB.py - mb * stoneB.px;

      const rpx = parseInt(((cb - ca) / (ma - mb)).toString(), 10);
      const rpy = parseInt((ma * rpx + ca).toString(), 10);

      const time = Math.round((rpx - stoneA.px) / (stoneA.vx - rvx));
      const rpz = stoneA.pz + (stoneA.vz - rvz) * time;

      const result = rpx + rpy + rpz;
      if (!results[result]) {
        results[result] = 1;
      } else {
        results[result]++;
      }
    }
  }

  const result = Object.keys(results).sort((a, b) => results[parseInt(b, 10)] - results[parseInt(a, 10)])[0];

  console.log("Answer 2:", result);
    // Answer 2: 880547248556435
}

coordinatesOfInitialPosition();
