#!/usr/bin/env node

var yargs = require('yargs');
var eslintMocha = require('../lib/eslint-mocha');

var argv = yargs
  .options({
    'eslint-args': {
      demand: true,
      requiresArg: true
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

eslintMocha({
  eslintFiles: eslintFiles,
  mochaFiles: mochaFiles,
  isMochaRecursive: mochaArgs.recursive
});
