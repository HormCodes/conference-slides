const { mkdirSync, writeFileSync } = require('node:fs');

module.exports.writeToFile = function ({
  directory = './',
  fileName = 'output',
  content = 'No output provided.',
}) {
  try {
    mkdirSync(directory);
  } catch (e) {}
  try {
    writeFileSync(`${directory}/${fileName}`, content);
  } catch (e) {}
};
