var expect = require('chai').expect;
var eol = require('eol');
var run = require('../helpers/run');

describe('acceptance - failure', function() {
  it('works', function() {
    var args = [
      '--eslint-args="**/*.js"',
      '--mocha-args="test/**/*-test.js"'
    ];
    var workingDir = 'test/fixtures/failure-project';
    return run(args, workingDir).then(function(stdout) {
      expect(stdout).to.contain('√ this is my test');
      expect(stdout).to.contain('my-file.js passes');
      expect(stdout).to.contain('my-test.js passes');
      expect(stdout).to.contain('1 passing');
      expect(stdout).to.contain('2 failing');
      expect(stdout).to.contain(eol.auto('\n\
        Expected indentation of 4 space characters but found 2.'));
      expect(stdout).to.contain('\n\
      -1\n\
      +0');
      expect(stdout).to.contain(eol.auto('\n\
        "describe" is not defined.\n\
        Expected indentation of 4 space characters but found 2.\n\
        "it" is not defined.\n\
        Expected indentation of 6 space characters but found 4.'));
      expect(stdout).to.contain('\n\
      -4\n\
      +0');
    });
  });
});
