var path = require('path');
var Mocha = require('mocha');
var utils = Mocha.utils;

var lintTestFile = path.resolve(__dirname, 'test-file.js');

function setUpEslint(options) {
  var eslintFiles = options.eslintFiles;

  process.env.NODE_ESLINT_FILES = eslintFiles.join(',');
}

function runMocha(options) {
  var mochaFiles = options.mochaFiles;
  var isMochaRecursive = options.isMochaRecursive;
  var extenstions = ['js'];
  var mocha = new Mocha();

  var files = mochaFiles.reduce(function(files, file) {
    return files.concat(utils.lookupFiles(file, extenstions, isMochaRecursive));
  }, []);

  files.push(lintTestFile);

  files.forEach(function(file) {
    mocha.addFile(file);
  });

  return mocha.run();
}

module.exports = function(options) {
  setUpEslint(options);

  return runMocha(options);
};
