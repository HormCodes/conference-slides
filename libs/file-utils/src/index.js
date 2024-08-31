const { mkdirSync, writeFileSync } = require('node:fs');

module.exports.writeToFile = function ({
  directory = './',
  fileName = 'output',
  content = 'No output provided.',
}) {
  createDirIfNotExist(directory);
  createFileIfNotExist(`${directory}/${fileName}`, content);
};

function createDirIfNotExist(name = '.') {
  if (name === '.' || name === '..') {
    return;
  }

  if (!name.includes('/')) {
    try {
      mkdirSync(name);
    } catch (e) {}
    return;
  }

  const subDirectories = name.split('/').reduce((result, subDirectory) => {
    if (result.length === 0) {
      return [subDirectory];
    }

    const lastSubDirectory = result[result.length - 1];
    return [...result, `${lastSubDirectory}/${subDirectory}`];
  }, []);

  subDirectories.forEach((subDirectory) => {
    try {
      mkdirSync(subDirectory);
    } catch (e) {}
  });
}

function createFileIfNotExist(fileName = '', content = '') {
  try {
    writeFileSync(fileName, content);
  } catch (e) {}
}
