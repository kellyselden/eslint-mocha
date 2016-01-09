import { expect } from 'chai';
import sinon from 'sinon';
import addFiles from '../../../lib/mocha/add-files';

describe('unit - mocha/addFiles', function() {
  beforeEach(function() {
    addFiles.__Rewire__('utils', {
      lookupFiles(file) { return [file]; }
    });
  });

  afterEach(function() {
    addFiles.__ResetDependency__('utils');
  });

  it('calls lookupFiles correctly', function() {
    let mocha = {
      addFile: sinon.stub()
    };
    let files = ['test-file-1', 'test-file-2'];

    let lookupFilesStub = sinon.stub().returns([]);
    addFiles.__Rewire__('utils', {
      lookupFiles: lookupFilesStub
    });

    addFiles(mocha, files, ['test-extension'], true, null);

    expect(lookupFilesStub.callCount).to.equal(2);
    expect(lookupFilesStub.args).to.deep.equal([
      ['test-file-1', ['test-extension'], true],
      ['test-file-2', ['test-extension'], true]
    ]);
  });

  it('adds "test" if nothing supplied', function() {
    let addFileStub = sinon.stub();
    let mocha = {
      addFile: addFileStub
    };
    let files = [];

    addFiles(mocha, files, null, null, 'lint-test-file');

    expect(addFileStub.callCount).to.equal(2);
    expect(addFileStub.thisValues).to.deep.equal([mocha, mocha]);
    expect(addFileStub.args).to.deep.equal([['test'], ['lint-test-file']]);
  });

  it('does not add "test" twice', function() {
    let addFileStub = sinon.stub();
    let mocha = {
      addFile: addFileStub
    };
    let files = ['test'];

    addFiles(mocha, files, null, null, 'lint-test-file');

    expect(addFileStub.callCount).to.equal(2);
    expect(addFileStub.thisValues).to.deep.equal([mocha, mocha]);
    expect(addFileStub.args).to.deep.equal([['test'], ['lint-test-file']]);
  });
});
