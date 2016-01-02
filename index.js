#!/usr/bin/env node

var path = require('path');
var Mocha = require('mocha');
var utils = Mocha.utils;

var argv = require('yargs')
  .array('eslint-files')
  .demand('eslint-files')
  .array('mocha-files')
  .default('mocha-files', [])
  .argv;

var eslintFiles = argv['eslint-files'];
var mochaFiles = argv['mocha-files'];

process.env.NODE_ESLINT_FILES = eslintFiles.join(',');

function addFiles(mocha) {
  var files = [];
  var extensions = ['.js'];
  var recursive = false;
  var lintTestFile = path.resolve(__dirname, 'test-file.js');

  if (!mochaFiles.length) {
    mochaFiles.push('test');
  }

  mochaFiles.forEach(function(arg) {
    files = files.concat(utils.lookupFiles(arg, extensions, recursive));
  });

  files.push(lintTestFile);

  files.forEach(function(file) {
    mocha.addFile(file);
  });
}

(function() {
  var mocha = new Mocha();
  addFiles(mocha);
  mocha.run();
})();
