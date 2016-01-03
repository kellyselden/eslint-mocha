var expect = require('chai').expect;
var run = require('../helpers/run');

describe('acceptance - success', function() {
  var workingDir = 'test/fixtures/success-project';

  it('works', function() {
    var args = [
      '--eslint-args="**/*.js"',
      '--mocha-args="test/**/*-test.js"'
    ];
    return run(args, workingDir).then(function(stdout) {
      expect(stdout).to.contain('√ this is my test');
      expect(stdout).to.contain('√ this is another test');
      expect(stdout).to.contain('my-file.js passes');
      expect(stdout).to.contain('my-test.js passes');
      expect(stdout).to.contain('another-test.js passes');
      expect(stdout).to.contain('5 passing');
    });
  });

  it('handles multiple file arguments', function() {
    var args = [
      '--eslint-args="lib/**/*.js test/**/*.js"',
      '--mocha-args="test/my-test.js test/another-test.js"'
    ];
    return run(args, workingDir).then(function(stdout) {
      expect(stdout).to.contain('√ this is my test');
      expect(stdout).to.contain('√ this is another test');
      expect(stdout).to.contain('my-file.js passes');
      expect(stdout).to.contain('my-test.js passes');
      expect(stdout).to.contain('another-test.js passes');
      expect(stdout).to.contain('5 passing');
    });
  });

  it('handles mocha recursive', function() {
    var args = [
      '--eslint-args="**/*.js"',
      '--mocha-args="--recursive"'
    ];
    return run(args, workingDir).then(function(stdout) {
      expect(stdout).to.contain('√ this is my test');
      expect(stdout).to.contain('√ this is another test');
      expect(stdout).to.contain('my-file.js passes');
      expect(stdout).to.contain('my-test.js passes');
      expect(stdout).to.contain('another-test.js passes');
      expect(stdout).to.contain('5 passing');
    });
  });

  it('allows missing --mocha-arg', function() {
    var args = [
      '--eslint-args="**/*.js"'
    ];
    return run(args, workingDir).then(function(stdout) {
      expect(stdout).to.contain('√ this is my test');
      expect(stdout).to.contain('√ this is another test');
      expect(stdout).to.contain('my-file.js passes');
      expect(stdout).to.contain('my-test.js passes');
      expect(stdout).to.contain('another-test.js passes');
    });
  });

  it('errors without --eslint-args', function() {
    var args = [
    ];
    var hasCatchRun;
    return run(args).catch(function(stderr) {
      expect(stderr).to.contain('Missing required argument: eslint-args');
      hasCatchRun = true;
    }).then(function(stdout) {
      expect(stdout).to.be.undefined;
      expect(hasCatchRun).to.be.true;
    });
  });

  it('errors with blank --eslint-args', function() {
    var args = [
      '--eslint-args'
    ];
    var hasCatchRun;
    return run(args).catch(function(stderr) {
      expect(stderr).to.contain('Missing argument value: eslint-args');
      hasCatchRun = true;
    }).then(function(stdout) {
      expect(stdout).to.be.undefined;
      expect(hasCatchRun).to.be.true;
    });
  });
});
