#!/usr/bin/env node

var path = require('path');
var spawn = require('child_process').spawn;

var mochaPath = 'node_modules/mocha/bin/mocha';
var originalMochaArgs = process.argv.slice(2);
var lintTestFile = path.resolve(__dirname, 'test-file.js');

var args = [mochaPath];

if (originalMochaArgs.indexOf('--colors') === -1) {
  args.push('--colors');
}

args = args.concat(originalMochaArgs);

args.push(lintTestFile);

var ps = spawn(process.execPath, args);
ps.stdout.pipe(process.stdout);
ps.stderr.pipe(process.stderr);
