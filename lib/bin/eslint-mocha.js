#!/usr/bin/env node
'use strict';

const yargs = require('yargs');
const eslintMocha = require('../eslint-mocha').default;
const words = require('lodash/words');

let argv = yargs
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
  let args = argv[option];

  yargs.reset();

  return yargs(args);
}

let eslintArgs = parseArgs('eslint-args')
  .options({
    'debug': {
      type: 'boolean'
    }
  })
  .argv;

let mochaArgs = parseArgs('mocha-args')
  .options({
    'recursive': {
      type: 'boolean'
    },
    'compilers': {
      default: ''
    }
  })
  .argv;

let eslintFiles = eslintArgs._;
let mochaFiles = mochaArgs._;

let mochaCompilers = words(mochaArgs.compilers, /[^,]+/g);

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
