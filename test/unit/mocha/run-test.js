import { expect } from 'chai';
import sinon from 'sinon';
import run from '../../../lib/mocha/run';

describe('unit - mocha/run', function() {
  let addCompilers, addFiles, Mocha, mochaRun;

  beforeEach(function() {
    run.__Rewire__('addCompilers', addCompilers = sinon.stub());
    run.__Rewire__('addFiles', addFiles = sinon.stub());
    run.__Rewire__('Mocha', Mocha = sinon.stub().returns({
      run: mochaRun = sinon.stub()
    }));
  });

  afterEach(function() {
    run.__ResetDependency__('addCompilers');
    run.__ResetDependency__('addFiles');
    run.__ResetDependency__('Mocha');
  });

  it('calls addCompilers correctly', function() {
    run(null, {
      mochaCompilers: ['test-compilers']
    });

    expect(addCompilers.args).to.deep.equal([
      [['test-compilers'], ['js']]
    ]);
  });

  it('calls addFiles correctly', function() {
    run.__Rewire__('addCompilers', (mochaCompilers, extensions) => {
      extensions.pop();
      extensions.push('test-ext');
    });

    let Mocha = () => {};
    Mocha.prototype.run = sinon.stub();
    run.__Rewire__('Mocha', Mocha);

    run('lint-test-file', {
      mochaFiles: ['mocha-file-test'],
      isMochaRecursive: true
    });

    expect(addFiles.callCount).to.equal(1);
    let call = addFiles.getCall(0);
    expect(call.args[0]).to.be.an.instanceof(Mocha);
    expect(call.args[1]).to.deep.equal(['mocha-file-test']);
    expect(call.args[2]).to.deep.equal(['test-ext']);
    expect(call.args[3]).to.be.true;
    expect(call.args[4]).to.equal('lint-test-file');
  });

  it('contructs mocha', function() {
    run(null, {});

    expect(Mocha.args).to.deep.equal([[]]);
  });

  it('runs mocha', function() {
    run(null, {});

    expect(mochaRun.args.length).to.equal(1);
    expect(mochaRun.args[0].length).to.equal(1);
  });
});
