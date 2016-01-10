import { expect } from 'chai';
import sinon from 'sinon';
import path from 'path';
import initialize from '../../../lib/eslint/initialize';

describe('unit - eslint/initialize', function() {
  let env, resolve;

  beforeEach(function() {
    env = process.env.NODE_ESLINT_FILES;
    process.env.NODE_ESLINT_FILES = '';

    initialize.__Rewire__('path', {
      resolve: resolve = sinon.stub()
    });
  });

  afterEach(function() {
    process.env.NODE_ESLINT_FILES = env;

    initialize.__ResetDependency__('path');
  });

  it('sets environment variable', function() {
    initialize({
      eslintFiles: ['test-file-1', 'test-file-2']
    });

    expect(process.env.NODE_ESLINT_FILES).to.equal('test-file-1,test-file-2');
  });

  it('returns test file path', function() {
    resolve.returns('resolved-test-path');

    let testFile = initialize({
      eslintFiles: []
    });

    expect(resolve.args).to.deep.equal([
      [path.resolve('lib/eslint'), '../../assets/test-file.js']
    ]);
    expect(testFile).to.equal('resolved-test-path');
  });
});
