import Mocha from 'mocha';
import addCompilers from './add-compilers';
import addFiles from './add-files';

export default (lintTestFile, options) => {
  let {
    mochaFiles,
    isMochaRecursive,
    mochaCompilers
  } = options;
  let extensions = ['js'];
  let mocha = new Mocha();

  addCompilers(mochaCompilers, extensions);
  addFiles(mocha, mochaFiles, extensions, isMochaRecursive, lintTestFile);

  mocha.run();
};
