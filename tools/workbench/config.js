const path = require ('path');
module.exports = {
  'root' : path.resolve (__dirname, '../../'),
  'test' : path.resolve (process.cwd (), './test/cases/'),
  'port' : 8080
};