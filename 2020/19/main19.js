const utils = require('../utils');

let parsingRules = true;
const rules = {};
const evaluatedRules = {};
const data = [];
utils.readFileNoFilter('input2.txt').forEach( line => {
  if (parsingRules) {
    if (line.trim().length === 0) {
      parsingRules = false;
    } else {
      const match1 = line.match(/(\d+): "([a-z])"/);
      if (match1) {
        rules[match1[1]] = match1[2];
      } else {
        const match = line.match(/(\d+): (.*)/);
        rules[match[1]] = match[2].split('|').map(entry => entry.trim().split(' ').map(str => parseInt(str)));
      }
    }
  } else {
    line.length && data.push(line);
  }
});

function evaluateRule(ruleId) {
  if (!evaluatedRules.hasOwnProperty(ruleId)) {
    let rule = rules[ruleId];
    let result;
    if (typeof rule === 'string') {
      result = rule;
    } else {
      if (rule.length === 1) {
        result = evaluateRuleArray(rule[0]);
      } else {
        result = rule.map(evaluateRuleArray);
      }
      result = result.flat();
    }
    evaluatedRules[ruleId] = result;
  }
  return evaluatedRules[ruleId];
}

function evaluateRuleArray(rule) {
  let result = [];
  rule.forEach( part => {
    const partResult = evaluateRule(part);
    if (typeof partResult === 'string') {
      if ( result.length === 0) {
        result.push(partResult);
      } else {
        result = result.map(entry => entry + partResult);
      }
    } else {
      if ( result.length === 0) {
        result = partResult;
      } else {
        let newResult = []
        result.forEach(entry => {
          newResult.push(partResult.map(part => entry + part));
        })
        result = newResult.flat();
      }
    }
  })
  return result;
}

const solutions = evaluateRule([0]).reduce((rest, part) => {rest[part] = true; return rest;}, {});

let rule42 = evaluatedRules[42];
let rule31 = evaluatedRules[31];

const answer1 = data.filter(entry => solutions.hasOwnProperty(entry)).length;
console.log({answer1});

function filterStartsWith42(array) {
  return array.filter(entry => rule42.filter(rule => entry.indexOf(rule) === 0).length);
}
function filterEndsWith31(array) {
  return array.filter(entry => rule31.filter(rule => entry.endsWith(rule)).length);
}

let extendlist = [
  [],
  [42],
  [42, 42],
  [42, 31],
  [42, 42, 42],
  [42, 42, 31],
  [42, 42, 42, 42],
  [42, 42, 42, 31],
  [42, 42, 31, 31],
  [42, 42, 42, 42, 42],
  [42, 42, 42, 42, 31],
  [42, 42, 42, 31, 31],
  [42, 42, 42, 42, 42, 42],
  [42, 42, 42, 42, 42, 31],
  [42, 42, 42, 42, 31, 31],
  [42, 42, 42, 31, 31, 31],
  [42, 42, 42, 42, 42, 42, 42],
  [42, 42, 42, 42, 42, 42, 31],
  [42, 42, 42, 42, 42, 31, 31],
  [42, 42, 42, 42, 31, 31, 31],
  ];

extendlist = extendlist.map(entry => [42, 42].concat(entry).concat([31]));

function matchEntry(string) {
  return rule => {
    let entry = string;
    let result = false;
    if (rule.length * rule42[0].length === string.length) {
      result = rule.reduce((matches,part) => {
        if (part === 42) {
          if (filterStartsWith42([entry]).length === 1) {
            entry = entry.substring(rule42[0].length);
          } else {
            matches = false;
          }
        } else {
          if (filterEndsWith31([entry]).length === 1) {
            entry = entry.substring(0, entry.length - rule42[0].length);
          } else {
            matches = false;
          }
        }
        return matches;
      }, true);
    }
    return result;
  }
}

let answer2 = data.filter(entry => extendlist.find(matchEntry(entry))).length;

console.log({answer2});
