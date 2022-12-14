const utils = require('../../utils');

const scanners = utils.processMultiLine( lines => {
  const result = {
    name: lines[0].substring(12, 14).trim(),
    positions: lines.slice(1).map(l=>l.split(',').map(c=>parseInt(c)))
  }
  result.internalDiff = result.positions.map(pos => {
    return result.positions.map(pos2 => {
      const dx = pos[0] - pos2[0];
      const dy = pos[1] - pos2[1];
      const dz = pos[2] - pos2[2];
      const distance = Math.sqrt( dx**2 + dy**2 + dz**2);
      const min = Math.min(Math.abs(dx), Math.abs(dy), Math.abs(dz));
      const max = Math.max(Math.abs(dx), Math.abs(dy), Math.abs(dz));
      return distance + '_' + min + '_' + max;
    });
  })
  return result;
},'test.txt')
let answer1, answer2;

scanners.forEach(scan1 => {
  scan1.common = scanners.filter(s=>s!==scan1).map(scan2 => {
    let result = scan1.internalDiff.map((list1,index1) => {
      return scan2.internalDiff.map((list2, index2) => {
        const isSame = list1.filter(diff => list2.indexOf(diff) >= 0).length >= 12;
        return isSame ? {from: index1, to: index2} : undefined;
      }).filter(x=>x);
    }).filter(x=>x.length).flat();
    return {to: scan2.name, map:result};
  }).filter(x=>x.map.length);
});

const rotations = [
  ([x, y, z]) => [x, y, z],
  ([x, y, z]) => [y, z, x],
  ([x, y, z]) => [z, x, y],
  ([x, y, z]) => [-x, z, y],
  ([x, y, z]) => [z, y, -x],
  ([x, y, z]) => [y, -x, z],
  ([x, y, z]) => [x, z, -y],
  ([x, y, z]) => [z, -y, x],
  ([x, y, z]) => [-y, x, z],
  ([x, y, z]) => [x, -z, y],
  ([x, y, z]) => [-z, y, x],
  ([x, y, z]) => [y, x, -z],
  ([x, y, z]) => [-x, -y, z],
  ([x, y, z]) => [-y, z, -x],
  ([x, y, z]) => [z, -x, -y],
  ([x, y, z]) => [-x, y, -z],
  ([x, y, z]) => [y, -z, -x],
  ([x, y, z]) => [-z, -x, y],
  ([x, y, z]) => [x, -y, -z],
  ([x, y, z]) => [-y, -z, x],
  ([x, y, z]) => [-z, x, -y],
  ([x, y, z]) => [-x, -z, -y],
  ([x, y, z]) => [-z, -y, -x],
  ([x, y, z]) => [-y, -x, -z],
];

const findRotation = (scanner1, scanner2) =>
{
  const result = rotations.find((rot, index) => {
    const getDiffStr = ({from,to}) => {
      const pos1 = scanner1.positions[from];
      const pos2 = rot(scanner2.positions[to]);
      return [pos1[0]-pos2[0], pos1[1]-pos2[1], pos1[2]-pos2[2]].join();
    };

    return getDiffStr(scanner1.common[0]).localeCompare(getDiffStr(scanner1.common[1]))
  });
  return rotations.indexOf(result);
}
console.log('Rot', findRotation(scanners[0], scanners[1]));

console.log("Positions:", utils.sumArray(scanners.map(scan=>scan.positions.length)));
console.log("Common:", utils.sumArray(scanners.map(scan=>scan.common).flat()));
console.log('Addition', scanners.map(scanner => scanner.positions.length - utils.sumArray(scanner.common)/2));
console.log("Common:", scanners.map(scan=>scan.common));

console.log(utils.sumArray(scanners.map(scan=>scan.positions.length-utils.sumArray(scan.common)/2)));
console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 408  Answer2: 13348
