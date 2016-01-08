import assert from 'assert';
import { CLIEngine } from 'eslint';
import eol from 'eol';

const cli = new CLIEngine();

const files = process.env.NODE_ESLINT_FILES.split(',');

const results = cli.executeOnFiles(files).results;

const indent = '\n        ';

describe('eslint', function() {
  results.forEach(result => {
    it(result.filePath + ' passes', function() {
      let { messages } = result;
      messages = messages.map(({ line, message }) => {
        return `Line ${line}: ${message}`;
      });
      let message = indent + messages.join(indent);
      assert.equal(messages.length, 0, eol.auto(message));
    });
  });
});
