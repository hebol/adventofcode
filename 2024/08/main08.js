const Mapper = require("../../Mapper");
let map = new Mapper( 'input.txt');

const antennas = {};

map.findMultiple((c, x, y) => {
  if (c !== '.') {
    const array = antennas[c] || [];
    array.push({x, y});
    antennas[c] = array;
  }
});

const calculateEchos = allowMultiple => {
  let echos = {};

  Object.keys(antennas).forEach(c => {
    const array = antennas[c];
    array.forEach(({x, y}) => {
      array.filter(({x: x2, y: y2}) => x !== x2 || y !== y2).forEach(({x: x2, y: y2}) => {
        const dx = x - x2;
        const dy = y - y2;
        let c = allowMultiple ? 0 : 1;
        while (map.isValidPos(x + c * dx, y + c * dy)) {
          echos[(x + c * dx) + ',' + (y + c * dy)] = true;
          if ( !allowMultiple) {
            break;
          }
          c++;
        }
      })
    });
  });
  return Object.keys(echos).length;
}

let answer1 = calculateEchos(false);
let answer2 = calculateEchos(true);

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 311 Answer2: 1115
