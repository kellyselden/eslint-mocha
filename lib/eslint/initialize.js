import path from 'path';

export default ({
  files,
  isDebug
}) => {
  if (isDebug) {
    process.env.NPM_PACKAGE_CONFIG_ESLINT_DEBUG = 'eslint:*,-eslint:code-path';
  }

  process.env.NPM_PACKAGE_CONFIG_ESLINT_FILES = files.join(',');

  let testFile = path.resolve(__dirname, '../../assets/test-file.js');

  return testFile;
};
