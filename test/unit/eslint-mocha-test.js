import { expect } from 'chai';
import sinon from 'sinon';
import eslintMocha from '../../lib/eslint-mocha';

describe('unit - eslint-mocha', function() {
  let initEslint, runMocha;

  beforeEach(function() {
    eslintMocha.__Rewire__('initEslint', initEslint = sinon.stub());
    eslintMocha.__Rewire__('runMocha', runMocha = sinon.stub());
  });

  afterEach(function() {
    eslintMocha.__ResetDependency__('initEslint');
    eslintMocha.__ResetDependency__('runMocha');
  });

  it('calls initEslint correctly', function() {
    eslintMocha({
      'test-prop': 'test-val'
    });

    expect(initEslint.args).to.deep.equal([
      [
        {
          'test-prop': 'test-val'
        }
      ]
    ]);
  });

  it('calls runMocha correctly', function() {
    initEslint.returns('test-lint-file');

    eslintMocha({
      'test-prop': 'test-val'
    });

    expect(runMocha.args).to.deep.equal([
      [
        'test-lint-file',
        {
          'test-prop': 'test-val'
        }
      ]
    ]);
  });
});
