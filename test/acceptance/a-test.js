var expect = require('chai').expect;
var exec = require('child_process').exec;

describe('eslint-mocha', function() {
  it('works', function(done) {
    exec('node index.js', function(error, stdout, stderr) {
      console.log(error);
      console.log(stdout);
      console.log(stderr);
      // expect(stdout).to.contain();
      done();
    });
  });
});
