import { expect } from 'chai';
import sinon from 'sinon';
import path from 'path';
import initialize from '../../../lib/eslint/initialize';

describe('unit - eslint/initialize', function() {
  let resolve;

  let {
    NPM_PACKAGE_CONFIG_ESLINT_FILES,
    NPM_PACKAGE_CONFIG_ESLINT_DEBUG
  } = process.env;

  beforeEach(function() {
    process.env.NPM_PACKAGE_CONFIG_ESLINT_FILES = '';
    process.env.NPM_PACKAGE_CONFIG_ESLINT_DEBUG = '';

    initialize.__Rewire__('path', {
      resolve: resolve = sinon.stub()
    });
  });

  afterEach(function() {
    initialize.__ResetDependency__('path');
  });

  after(function() {
    process.env.NPM_PACKAGE_CONFIG_ESLINT_FILES = NPM_PACKAGE_CONFIG_ESLINT_FILES;
    process.env.NPM_PACKAGE_CONFIG_ESLINT_DEBUG = NPM_PACKAGE_CONFIG_ESLINT_DEBUG;
  });

  it('sets files env variable', function() {
    initialize({
      files: ['test-file-1', 'test-file-2']
    });

    expect(process.env.NPM_PACKAGE_CONFIG_ESLINT_FILES).to.equal('test-file-1,test-file-2');
  });

  it('doesn\'t set debug env variable', function() {
    initialize({
      files: []
    });

    expect(process.env.NPM_PACKAGE_CONFIG_ESLINT_DEBUG).to.equal('');
  });

  it('sets debug env variable', function() {
    initialize({
      files: [],
      isDebug: true
    });

    expect(process.env.NPM_PACKAGE_CONFIG_ESLINT_DEBUG).to.equal('eslint:*,-eslint:code-path');
  });

  it('returns test file path', function() {
    resolve.returns('resolved-test-path');

    let testFile = initialize({
      files: []
    });

    expect(resolve.args).to.deep.equal([
      [path.resolve('lib/eslint'), '../assets/test-file.js']
    ]);
    expect(testFile).to.equal('resolved-test-path');
  });
});
