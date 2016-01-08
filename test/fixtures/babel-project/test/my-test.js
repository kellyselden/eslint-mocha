import assert from 'assert';
import myFile from '../lib/my-file';

describe('my-file', function() {
  it('this is my test', function() {
    assert.equal(myFile(), 42);
  });
});
