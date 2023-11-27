const crypto = require('crypto');

let hashCache = {};

function findKeysWithStretching(salt, numberOfKeys, stretchingTimes) {
  let keys = [];
  let index = 0;

  while (keys.length < numberOfKeys) {
    let hash = getStretchedHash(salt + index, stretchingTimes);
    let triplet = findTriplet(hash);

    if (triplet) {
      for (let i = 1; i <= 1000; i++) {
        let nextHash = getStretchedHash(salt + (index + i), stretchingTimes);
        if (nextHash.includes(triplet.repeat(5))) {
          keys.push({ index, hash });
          break;
        }
      }
    }
    index++;
  }

  return keys;
}

function getStretchedHash(data, times) {
  if (hashCache[data]) {
    return hashCache[data];
  }

  let hash = md5(data);
  for (let i = 0; i < times; i++) {
    hash = md5(hash);
  }

  hashCache[data] = hash;
  return hash;
}

function md5(data) {
  return crypto.createHash('md5').update(data).digest("hex");
}

function findTriplet(hash) {
  for (let i = 0; i < hash.length - 2; i++) {
    if (hash[i] === hash[i + 1] && hash[i] === hash[i + 2]) {
      return hash[i];
    }
  }
  return null;
}

// Replace 'ihaygndm' with your actual salt
const salt = 'ihaygndm';
const keys = findKeysWithStretching(salt, 64, 2016);
console.log('64th key index with key stretching:', keys[keys.length - 1].index);
