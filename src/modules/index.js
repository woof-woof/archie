const fs = require('fs');
const path = require('path');

const modules = fs.readdirSync(__dirname)
  .map(f => path.join(__dirname, f))
  .filter(f => fs.statSync(f).isDirectory())
  .map(f => require(f)); // eslint-disable-line

module.exports = modules;
