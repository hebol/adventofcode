const utils = require('../../utils');
let arrayList = utils.readFileNoFilter('input.txt')
const index = arrayList.findIndex(entry => entry.trim().length === 0);

const rules = arrayList.slice(0, index).map(entry => {
  const match = entry.match(/([a-z]*){(.+)}/);
  return {
    name: match[1],
    rule: match[2].split(',').map(entry => {
      const match2 = entry.match(/([a-z])([<>])(\d+):(.*)+/);
      if (match2) {
        return {
          var: match2[1], op: match2[2], value: parseInt(match2[3]), newState: match2[4],
          fun: (value) => match2[2] === '<' ? value < parseInt(match2[3]) : value > parseInt(match2[3])
        };
      } else {
        return {newState: entry};
      }
    })
  }
});

const ruleMap = rules.reduce((rest, rule) => {
  rest[rule.name] = rule;
  return rest;
}, {});

const parts = arrayList.slice(index + 1).map(entry => {
  let strings = entry.slice(1, -1).split(',');
  return strings.reduce((rest,part) => {
    rest[part[0]] = parseInt( part.slice(2));
    return rest;
  }, {});
});

const answer1 = utils.sumArray(parts.map(part => {
  let rule = 'in';
  while (rule !== 'A' && rule !== 'R') {
    const ruleEntry = ruleMap[rule];
    let newRule;
    for ( let i = 0 ; i < ruleEntry.rule.length && !newRule; i++) {
      const rulePart = ruleEntry.rule[i];
      if (rulePart.op) {
        if (rulePart.fun(part[rulePart.var])) {
          newRule = rulePart.newState;
        }
      } else {
        newRule = rulePart.newState;
      }
    }
    rule = newRule;
  }
  return rule === 'A' ? utils.sumArray(Object.values(part)) : 0;
}));


function countAccepted(ruleName, x, m, a, s, workflows) {
  if (ruleName === 'A') {
    return x.length * m.length * a.length * s.length;
  }
  if (ruleName === 'R') {
    return 0;
  }

  let c = 0;
  for (const r of ruleMap[ruleName].rule) {
    if (r.op) {
      switch (r.var) {
        case 'x':
          const availableX = x.filter(r.fun);
          if (availableX.length) {
            c += countAccepted(r.newState, availableX, m, a, s);
          }
          x = x.filter(n => !r.fun(n));
          break;
        case 'm':
          const availableM = m.filter(r.fun);
          if (availableM.length) {
            c += countAccepted(r.newState, x, availableM, a, s);
          }
          m = m.filter(n => !r.fun(n));
          break;
        case 'a':
          const availableA = a.filter(r.fun);
          if (availableA.length) {
            c += countAccepted(r.newState, x, m, availableA, s);
          }
          a = a.filter(n => !r.fun(n));
          break;
        case 's':
          const availableS = s.filter(r.fun);
          if (availableS.length) {
            c += countAccepted(r.newState, x, m, a, availableS);
          }
          s = s.filter(n => !r.fun(n));
          break;
      }
    } else {
      c += countAccepted(r.newState, x, m, a, s);
    }
  }

  return c;
}

const answer2 = countAccepted('in',
    Array.from({length: 4000}, (_, i) => i + 1),
    Array.from({length: 4000}, (_, i) => i + 1),
    Array.from({length: 4000}, (_, i) => i + 1),
    Array.from({length: 4000}, (_, i) => i + 1));

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 350678 Answer2: 124831893423809
