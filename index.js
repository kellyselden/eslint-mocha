#!/usr/bin/env node

var path = require('path');
var Mocha = require('mocha');
var utils = Mocha.utils;

function addFiles(mocha) {
  var files = [];
  var originalMochaArgs = process.argv.slice(2);
  var args = originalMochaArgs.slice();
  var extensions = ['.js'];
  var recursive = false;
  var lintTestFile = path.resolve(__dirname, 'test-file.js');

  if (!args.length) {
    args.push('test');
  }

  args.forEach(function(arg) {
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
