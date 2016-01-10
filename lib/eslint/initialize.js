import path from 'path';

export default options => {
  let { eslintFiles } = options;

  process.env.NPM_PACKAGE_CONFIG_ESLINT_FILES = eslintFiles.join(',');

  let testFile = path.resolve(__dirname, '../../assets/test-file.js');

  return testFile;
};
