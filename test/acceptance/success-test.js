import { expect } from 'chai';
import run from '../helpers/run';
import { symbols } from 'mocha/lib/reporters/base';

const { ok } = symbols;

describe('acceptance - success', function() {
  this.timeout(10000);

  let workingDir = 'test/fixtures/success-project';

  it('works', function() {
    let args = [
      '--eslint-args="**/*.js"',
      '--mocha-args="test/**/*-test.js"'
    ];
    return run(args, workingDir).then(({ stdout }) => {
      expect(stdout).to.contain(`${ok} this is my test`);
      expect(stdout).to.contain(`${ok} this is another test`);
      expect(stdout).to.contain('my-file.js passes');
      expect(stdout).to.contain('my-test.js passes');
      expect(stdout).to.contain('another-test.js passes');
      expect(stdout).to.contain('5 passing');
    });
  });

  it('handles multiple file arguments', function() {
    let args = [
      '--eslint-args="lib/**/*.js test/**/*.js"',
      '--mocha-args="test/my-test.js test/another-test.js"'
    ];
    return run(args, workingDir).then(({ stdout }) => {
      expect(stdout).to.contain('5 passing');
    });
  });

  it('handles mocha recursive', function() {
    let args = [
      '--eslint-args="**/*.js"',
      '--mocha-args="--recursive"'
    ];
    return run(args, workingDir).then(({ stdout }) => {
      expect(stdout).to.contain('5 passing');
    });
  });

  it('allows missing --mocha-arg', function() {
    let args = [
      '--eslint-args="**/*.js"'
    ];
    return run(args, workingDir).then(({ stdout }) => {
      expect(stdout).to.contain('5 passing');
    });
  });

  it('errors with blank --eslint-args', function() {
    let args = [
      '--eslint-args'
    ];
    return run(args).then(({ stdout, stderr }) => {
      expect(stdout).to.be.empty;
      expect(stderr).to.contain('Not enough arguments following: eslint-args');
    });
  });

  it('handles eslint debug', function() {
    let args = [
      '--eslint-args=\\"--debug **/*.js\\"'
    ];
    return run(args, workingDir).then(({ stdout, stderr }) => {
      expect(stdout).to.contain(`${ok} this is my test`);
      expect(stdout).to.contain(`${ok} this is another test`);
      expect(stdout).to.contain('2 passing');

      expect(stderr).to.contain('eslint:glob-utils Creating list of files to process.');
    });
  });
});
