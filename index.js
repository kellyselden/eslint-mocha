#!/usr/bin/env node

var path = require('path');
var yargs = require('yargs');
var Mocha = require('mocha');
var utils = Mocha.utils;

var argv = yargs
  .options({
    'eslint-args': {
      demand: true
    },
    'mocha-args': {
      default: ''
    }
  })
  .argv;

function parseArgs(option) {
  var args = argv[option];
  args = args.split(' ');

  // remove empty strings like ['']
  args = args.filter(function(arg) { return arg; });

  yargs.reset();

  return yargs(args);
}

var eslintArgs = parseArgs('eslint-args')
  .argv;

var mochaArgs = parseArgs('mocha-args')
  .options({
    'recursive': {
      type: 'boolean'
    }
  })
  .argv;

var eslintFiles = eslintArgs._;
var mochaFiles = mochaArgs._;

if (!mochaFiles.length) {
  mochaFiles.push('test');
}

var mochaExtensions = ['js'];

var lintTestFile = path.resolve(__dirname, 'test-file.js');

process.env.NODE_ESLINT_FILES = eslintFiles.join(',');

function addFiles(mocha) {
  var files = [];

  mochaFiles.forEach(function(arg) {
    files = files.concat(utils.lookupFiles(arg, mochaExtensions, mochaArgs.recursive));
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
