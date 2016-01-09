import { expect } from 'chai';
import addCompilers from '../../../lib/mocha/add-compilers';

describe('unit - mocha/addCompilers', function() {
  beforeEach(function() {
    addCompilers.__Rewire__('_require', () => {});
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

    let wasCalled;
    addCompilers.__Rewire__('_require', module => {
      expect(module).to.equal('test-mod');
      wasCalled = true;
    });

    addCompilers(compilers, extensions);

    expect(wasCalled).to.be.true;
  });
});
