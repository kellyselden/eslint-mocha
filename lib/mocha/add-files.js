import { utils } from 'mocha';

export default (mocha, files, extensions, isRecursive, lintTestFile) => {
  if (!files.length) {
    files.push('test');
  }

  files = files.reduce((files, file) => {
    return files.concat(utils.lookupFiles(file, extensions, isRecursive));
  }, []);

  files.push(lintTestFile);

  files.forEach(file => mocha.addFile(file));
}
