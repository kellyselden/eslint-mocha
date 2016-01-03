var expect = require('chai').expect;
var run = require('../helpers/run');

describe('acceptance - success', function() {
  it('works', function() {
    var args = [
      '--eslint-args="**/*.js"',
      '--mocha-args="test/**/*-test.js"'
    ];
    var workingDir = 'test/fixtures/success-project';
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
    var workingDir = 'test/fixtures/success-project';
    return run(args, workingDir).then(function(stdout) {
      expect(stdout).to.contain('√ this is my test');
      expect(stdout).to.contain('√ this is another test');
      expect(stdout).to.contain('my-file.js passes');
      expect(stdout).to.contain('my-test.js passes');
      expect(stdout).to.contain('another-test.js passes');
      expect(stdout).to.contain('5 passing');
    });
  });

  it('allows --mocha-files default', function() {
    var args = [
      '--eslint-args="**/*.js"',
      '--mocha-args="--recursive"'
    ];
    var workingDir = 'test/fixtures/success-project';
    return run(args, workingDir).then(function(stdout) {
      expect(stdout).to.contain('√ this is my test');
      expect(stdout).to.contain('√ this is another test');
      expect(stdout).to.contain('my-file.js passes');
      expect(stdout).to.contain('my-test.js passes');
      expect(stdout).to.contain('another-test.js passes');
      expect(stdout).to.contain('5 passing');
    });
  });
});
