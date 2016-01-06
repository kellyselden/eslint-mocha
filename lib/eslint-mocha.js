import path from 'path';
import Mocha from 'mocha';

const { utils } = Mocha;

const lintTestFile = path.resolve(__dirname, 'test-file.js');

function setUpEslint(options) {
  let { eslintFiles } = options;

  process.env.NODE_ESLINT_FILES = eslintFiles.join(',');
}

function runMocha(options) {
  let {
    mochaFiles,
    isMochaRecursive
  } = options;
  let extenstions = ['js'];
  let mocha = new Mocha();

  if (!mochaFiles.length) {
    mochaFiles.push('test');
  }

  let files = mochaFiles.reduce((files, file) => {
    return files.concat(utils.lookupFiles(file, extenstions, isMochaRecursive));
  }, []);

  files.push(lintTestFile);

  files.forEach(file => mocha.addFile(file));

  return mocha.run();
}

export default options => {
  setUpEslint(options);

  return runMocha(options);
}
