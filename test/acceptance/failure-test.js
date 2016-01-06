import { expect } from 'chai';
import eol from 'eol';
import run from '../helpers/run';
import { symbols } from 'mocha/lib/reporters/base';

const { ok } = symbols;

describe('acceptance - failure', function() {
  this.timeout(10000);

  let workingDir = 'test/fixtures/failure-project';

  it('works', function() {
    let args = [
      '--eslint-args="**/*.js"',
      '--mocha-args="test/**/*-test.js"'
    ];
    return run(args, workingDir).then(function(stdout) {
      expect(stdout).to.contain(ok + ' this is my test');
      expect(stdout).to.contain('my-file.js passes');
      expect(stdout).to.contain('my-test.js passes');
      expect(stdout).to.contain('1 passing');
      expect(stdout).to.contain('2 failing');
      expect(stdout).to.contain(eol.auto('\n\
        Line 2: Expected indentation of 4 space characters but found 2.'));
      expect(stdout).to.contain('\n\
      -1\n\
      +0');
      expect(stdout).to.contain(eol.auto('\n\
        Line 4: "describe" is not defined.\n\
        Line 5: Expected indentation of 4 space characters but found 2.\n\
        Line 5: "it" is not defined.\n\
        Line 6: Expected indentation of 6 space characters but found 4.'));
      expect(stdout).to.contain('\n\
      -4\n\
      +0');
    });
  });
});
