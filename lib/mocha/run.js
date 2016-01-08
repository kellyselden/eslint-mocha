import Mocha from 'mocha';

const { utils } = Mocha;

function addCompilers(compilers, extensions) {
  compilers.forEach(compiler => {
    let [ext, mod] = compiler.split(':');

    if (extensions.indexOf(ext) !== -1) {
      extensions.push(ext);
    }

    require(mod);
  });
}

function addFiles(mocha, files, extensions, isRecursive, lintTestFile) {
  if (!files.length) {
    files.push('test');
  }

  files = files.reduce((files, file) => {
    return files.concat(utils.lookupFiles(file, extensions, isRecursive));
  }, []);

  files.push(lintTestFile);

  files.forEach(file => mocha.addFile(file));
}

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

  return mocha.run();
}
