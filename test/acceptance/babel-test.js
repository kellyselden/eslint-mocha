import { expect } from 'chai';
import run from '../helpers/run';
import { symbols } from 'mocha/lib/reporters/base';

const { ok } = symbols;

describe('acceptance - babel', function() {
  this.timeout(60000);

  let workingDir = 'test/fixtures/babel-project';

  it('works', function() {
    let args = [
      '--eslint-args="**/*.js"',
      '--mocha-args="--compilers js:babel-register test/**/*-test.js"'
    ];
    return run(args, workingDir).then(stdout => {
      expect(stdout).to.contain(`${ok} this is my test`);
      expect(stdout).to.contain('my-file.js passes');
      expect(stdout).to.contain('my-test.js passes');
      expect(stdout).to.contain('3 passing');
    });
  });

  it('handles multiple compilers', function() {
    let args = [
      '--eslint-args="**/*.js"',
      '--mocha-args="--compilers js:babel-register,coffee:coffee-script test/**/*-test.js"'
    ];
    return run(args, workingDir).catch(stderr => {
      expect(stderr).to.contain('Error: Cannot find module \'coffee-script\'');
    });
  });
});
