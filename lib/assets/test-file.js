import assert from 'assert';
import eol from 'eol';

// these can't be `import` because Babel screws up the order
// transpiled order would incorrectly be:
// * require debug
// * require eslint
// * debug enable
require('debug').enable(process.env.NPM_PACKAGE_CONFIG_ESLINT_DEBUG);
const { CLIEngine } = require('eslint');

const indent = '\n        ';

describe('eslint', function() {
  let cli = new CLIEngine();

  let files = process.env.NPM_PACKAGE_CONFIG_ESLINT_FILES.split(',');

  let { results } = cli.executeOnFiles(files);

  results.forEach(({ filePath, messages }) => {
    it(filePath + ' passes', function() {
      messages = messages.map(({ line, message }) => {
        return `Line ${line}: ${message}`;
      });

      let message = indent + messages.join(indent);

      assert.equal(messages.length, 0, eol.auto(message));
    });
  });
});
