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
      eslint: {
        testProp: 'test-val'
      }
    });

    expect(initEslint.args).to.deep.equal([
      [
        {
          testProp: 'test-val'
        }
      ]
    ]);
  });

  it('calls runMocha correctly', function() {
    initEslint.returns('test-lint-file');

    eslintMocha({
      mocha: {
        testProp: 'test-val'
      }
    });

    expect(runMocha.args).to.deep.equal([
      [
        'test-lint-file',
        {
          testProp: 'test-val'
        }
      ]
    ]);
  });

  it('doesn\'t call initEslint with mocha options', function() {
    eslintMocha({
      mocha: {
        testProp: 'test-val'
      }
    });

    expect(initEslint.args).to.deep.equal([
      [
        undefined
      ]
    ]);
  });

  it('doesn\'t call runMocha with eslint options', function() {
    eslintMocha({
      eslint: {
        testProp: 'test-val'
      }
    });

    expect(runMocha.args).to.deep.equal([
      [
        undefined,
        undefined
      ]
    ]);
  });
});
