var assert = require('assert');
var myFile = require('../lib/my-file');

describe('my-file', function() {
  it('works', function() {
    assert.equal(myFile(), 42);
  });
});
