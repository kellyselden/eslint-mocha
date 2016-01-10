import { expect } from 'chai';
import sinon from 'sinon';
import addCompilers from '../../../lib/mocha/add-compilers';

describe('unit - mocha/add-compilers', function() {
  let _require;

  beforeEach(function() {
    addCompilers.__Rewire__('_require', _require = sinon.stub());
  });

  afterEach(function() {
    addCompilers.__ResetDependency__('_require');
  });

  it('pushes to extensions', function() {
    let compilers = ['test-ext:'];
    let extensions = [];

    addCompilers(compilers, extensions);

    expect(extensions).to.deep.equal(['test-ext']);
  });

  it('does not duplicate extensions', function() {
    let compilers = ['test-ext:'];
    let extensions = ['test-ext'];

    addCompilers(compilers, extensions);

    expect(extensions).to.deep.equal(['test-ext']);
  });

  it('calls require with module name', function() {
    let compilers = [':test-mod'];
    let extensions = [];

    addCompilers(compilers, extensions);

    expect(_require.args).to.deep.equal([
      ['test-mod']
    ]);
  });
});
