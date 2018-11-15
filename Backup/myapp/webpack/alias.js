const path = require('path');

const srcPath = path.resolve(__dirname, '../src');
const rootPath = path.resolve(__dirname, '..');

module.exports = {
  '#': srcPath,
  '~': rootPath
};
