#!/usr/bin/env node

import yargs from 'yargs';
import eslintMocha from '../eslint-mocha';
import words from 'lodash/words';

let { argv } = yargs
  .options({
    'eslint-args': {
      demand: true,
      requiresArg: true
    },
    'mocha-args': {
      default: ''
    }
  });

function parseArgs(option) {
  let args = argv[option];
  args = args.replace(/^"(.*)"$/, '$1');

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
