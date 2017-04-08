#!/usr/bin/env node
/*eslint no-var: 0*/

var yargs = require('yargs');
var eslintMocha = require('../dist/eslint-mocha').default;
var words = require('lodash/words');

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

  yargs.reset();

  return yargs(args);
}

var eslintArgs = parseArgs('eslint-args')
  .options({
    'debug': {
      type: 'boolean'
    }
  })
  .argv;

var mochaArgs = parseArgs('mocha-args')
  .options({
    'recursive': {
      type: 'boolean'
    },
    'compilers': {
      default: ''
    }
  })
  .argv;

var eslintFiles = eslintArgs._;
var mochaFiles = mochaArgs._;

var mochaCompilers = words(mochaArgs.compilers, /[^,]+/g);

eslintMocha({
  eslint: {
    files: eslintFiles,
    isDebug: eslintArgs.debug
  },
  mocha: {
    files: mochaFiles,
    isRecursive: mochaArgs.recursive,
    compilers: mochaCompilers
  }
});
