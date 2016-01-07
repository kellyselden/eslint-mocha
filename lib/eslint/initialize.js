import path from 'path';

const testFile = path.resolve(__dirname, 'test-file.js');

export default options => {
  let { eslintFiles } = options;

  process.env.NODE_ESLINT_FILES = eslintFiles.join(',');

  return testFile;
}
