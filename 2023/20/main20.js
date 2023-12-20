const utils = require('../../utils');
let moduleMap = utils.processLine(line => {
  let [l, name, outputs] = line.match(/(.*) -> (.*)/);
  let op, state, inputs;
  if (name[0] !== 'b') {
    op = name[0];
    name = name.substring(1);
  }
  let result = {name, outputs: outputs.split(', ')};
  if (op === '%') {
    result.state = false;
    result.op = op;
  }
  if (op === '&') {
    result.inputs = {};
    result.op = op;
  }
  return result;
}, 'input.txt').reduce((map, module) => {
  map[module.name] = module;
  return map;
}, {});

Object.values(moduleMap).forEach(module => {
  module.outputs.forEach(name => {
    let inputs = moduleMap[name]?.inputs;
    if (inputs) {
      inputs[module.name] = false
    }
  });
});
moduleMap['button'] = {name: 'button', outputs: ['broadcaster']};

let lowCount = 0;
let highCount = 0;
let rxCount = 0;
const processPulse = (receiver, type, sender) => {
  const signals = [];
  const sendSignal = (aModule, type) => {
    lowCount += type === false ? aModule.outputs.length : 0;
    highCount += type === true ? aModule.outputs.length : 0;
    if (serieMap.hasOwnProperty(aModule.name) && type && !serieMap[aModule.name]) {
      serieMap[aModule.name] = count;
      console.log(aModule.name + ' -' + (type?'high':'low') + '-> ' + aModule.outputs.join(','), count);
    }
    signals.push(...aModule.outputs.map(name => ({receiver: name, type, sender: aModule.name})));
  }
  sendSignal(moduleMap[sender], type);
  while (signals.length) {
    const signal = signals.shift();

    let module = moduleMap[signal.receiver];
    if (!module) {
      //console.log('Could not find module', signal.receiver);
      continue;
    }
    if (module?.op === '&') {
      module.inputs[signal.sender] = signal.type;
      module.outputValue = true;
      module.inputs[signal.sender] = signal.type;
      if (Object.values(module.inputs).filter(value => value === false).length === 0) {
        module.outputValue = false;
      }
      sendSignal(module, module.outputValue);
    } else {
      if (module?.op === '%') {
        if (signal.type === false) {
          module.state = !module.state;
          sendSignal(module, module.state);
        }
      } else {
        sendSignal(module, false);
      }
    }
  }
}

let count = 0;
let serieMap = {...Object.values(moduleMap).find(module => module.outputs[0] === 'rx').inputs};
Object.keys(serieMap).forEach(key => serieMap[key] = 0);
let answer1;
while (utils.multiplyArray(Object.values(serieMap)) == 0) {
  processPulse('broadcaster', false, 'button');
  if (++count === 1000) {
    answer1 = lowCount * highCount;
  }
}
let answer2 = utils.multiplyArray(Object.values(serieMap));

console.log("Answer1:", answer1, "Answer2:", answer2);
// Answer1: 812609846 Answer2: 244866309272640
