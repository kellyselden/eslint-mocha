import { expect } from 'chai';
import addCompilers from '../../../lib/mocha/add-compilers';

describe('unit - addCompilers', function() {
  it('pushes to extentsions', function() {
    let compilers = ['js:babel-register'];
    let extensions = [];

    addCompilers(compilers, extensions);

    expect(extensions).to.deep.equal(['js']);
  });

  it('does not duplicate extensions', function() {
    let compilers = ['js:babel-register'];
    let extensions = ['js'];

    addCompilers(compilers, extensions);

    expect(extensions).to.deep.equal(['js']);
  });
});
