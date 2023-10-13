const fs = require('fs');
const path = require('path');
const fileName = '../public/manifest.json';
const fsPath = path.join(__dirname, '..', 'public', 'manifest.json')
const file = require(fileName);

console.log('updating manifest version');

const addValue = 0.1;
const version = parseFloat(file.version);
const finalVersion = parseFloat(version + addValue).toFixed(1);

file.version = finalVersion;

fs.writeFile(fsPath, JSON.stringify(file, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
    console.log(JSON.stringify(file));
    console.log('writing to ' + fileName);
  });
