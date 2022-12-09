const utils = require('../../utils');

const directions =
  {
    U:[0, -1],
    D:[0, 1],
    L:[-1, 0],
    R:[1, 0]
};

const stepsArray = utils.readFile('input.txt');

const simulateRope = (ropeArray) => {
  const visited = {};
  stepsArray.forEach(line => {
    const [dir, steps] = line.split(' ');
    for (let i = 0; i < parseInt(steps); i++) {
      for (let p = 0 ; p < ropeArray.length - 1; p++) {
        let xH = ropeArray[p][0], yH = ropeArray[p][1], xT = ropeArray[p+1][0], yT = ropeArray[p+1][1];

        if (p === 0) {
          xH += directions[dir][0];
          yH += directions[dir][1];
        }
        const diffX = xH - xT;
        const diffY = yH - yT;
        if (Math.abs(diffX) + Math.abs(diffY) > 1) {
          if (diffX === 0) {
            yT += diffY / 2;
          } else {
            if (diffY === 0) {
              xT += diffX / 2;
            } else {
              if (Math.abs(diffX) === 1 && Math.abs(diffY) === 1) {
                // Ignore
              } else {
                xT += diffX / Math.abs(diffX);
                yT += diffY / Math.abs(diffY);
              }
            }
          }
        }

        ropeArray[p][0] = xH;
        ropeArray[p][1] = yH;
        ropeArray[p+1][0] = xT;
        ropeArray[p+1][1] = yT;
      }
      const ropeLen = ropeArray.length;
      visited[ropeArray[ropeLen-1][0] + '-' + ropeArray[ropeLen-1][1]] = true;
    }
  });
  return visited;
}

let answer1 = Object.keys(simulateRope([[0, 0], [0,0]])).length;
let answer2 = Object.keys(simulateRope([[0, 0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]])).length;

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 5858 Answer2: 2602
