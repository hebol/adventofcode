const Mapper = require("../../Mapper");
const map = new Mapper('input.txt')

let answer1 = 0;
let answer2 = 0;

const investigate = (startX, startY) => {
  let borderCount = 0;
  let cornerCount = 0;
  let area = 0;
  const c1 = map.get(startX, startY);
  const directions = map.getOrtoDir();
  const totDir = map.getAllDir();
  totDir.push(totDir[0]);
  const leftToInvestigate = [[startX, startY]];

  function countCorners(x, y) {
    const c = map.get(x, y);
    const cornersList = ["000", "010", "101"];
    let result = 0;
    for (let i = 0 ; i < 8 ; i += 2) {
      const str = totDir.slice(i, i+3).map(([dx, dy]) => map.get(x+dx, y+dy) === c ? "1" : "0").join("");
      if (cornersList.includes(str)) {
        result++;
      }
    }
    return result;
  }

  while (leftToInvestigate.length > 0) {
    const [x, y] = leftToInvestigate.pop();
    if (map.hasVisited(x, y)) {
      continue;
    }
    area++;
    map.setVisited(x, y);
    cornerCount += countCorners(x, y);

    directions.forEach(([dx, dy]) => {
      const c2 = map.get(x+dx, y+dy);
      if (c2 === undefined || c2 !== c1) {
        borderCount++;
      } else {
        if (!map.hasVisited(x+dx, y+dy)) {
          leftToInvestigate.push([x+dx, y+dy]);
        }
      }
    })
  }
  answer1 += area * borderCount;
  answer2 += area * cornerCount;
};
for (let x = 0 ; x < map.width ; x++) {
  for (let y = 0 ; y < map.height ; y++) {
    if (!map.hasVisited(x, y)) {
      investigate(x, y);
    }
  }
}

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 1471452 Answer2: 863366
