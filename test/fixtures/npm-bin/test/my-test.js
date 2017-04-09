var assert = require('assert');
var myFile = require('../lib/my-file');

describe('my-file', function() {
  it('this is my test', function() {
    assert.equal(myFile(), 42);
  });
});
