import Mocha from 'mocha';
import addCompilers from './add-compilers';
import addFiles from './add-files';

export default (lintTestFile, {
  files,
  isRecursive,
  compilers
}) => {
  let extensions = ['js'];
  let mocha = new Mocha();

  addCompilers(compilers, extensions);
  addFiles(mocha, files, extensions, isRecursive, lintTestFile);

  mocha.run(process.exit);
};
