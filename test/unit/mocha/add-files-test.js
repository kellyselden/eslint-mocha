import { expect } from 'chai';
import sinon from 'sinon';
import addFiles from '../../../lib/mocha/add-files';

describe('unit - mocha/add-files', function() {
  let mocha; let addFile;

  beforeEach(function() {
    addFiles.__Rewire__('utils', {
      lookupFiles: file => [file]
    });

    mocha = {
      addFile: addFile = sinon.stub()
    };
  });

  afterEach(function() {
    addFiles.__ResetDependency__('utils');
  });

  it('calls lookupFiles correctly', function() {
    let files = ['test-file-1', 'test-file-2'];

    let lookupFiles = sinon.stub().returns([]);
    addFiles.__Rewire__('utils', {
      lookupFiles
    });

    addFiles(mocha, files, ['test-extension'], true, null);

    expect(lookupFiles.callCount).to.equal(2);
    expect(lookupFiles.args).to.deep.equal([
      ['test-file-1', ['test-extension'], true],
      ['test-file-2', ['test-extension'], true]
    ]);
  });

  it('adds "test" if nothing supplied', function() {
    let files = [];

    addFiles(mocha, files, null, null, 'lint-test-file');

    expect(addFile.callCount).to.equal(2);
    expect(addFile.thisValues).to.deep.equal([mocha, mocha]);
    expect(addFile.args).to.deep.equal([['test'], ['lint-test-file']]);
  });

  it('does not add "test" twice', function() {
    let files = ['test'];

    addFiles(mocha, files, null, null, 'lint-test-file');

    expect(addFile.callCount).to.equal(2);
    expect(addFile.thisValues).to.deep.equal([mocha, mocha]);
    expect(addFile.args).to.deep.equal([['test'], ['lint-test-file']]);
  });
});
