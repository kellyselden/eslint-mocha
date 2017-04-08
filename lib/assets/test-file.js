'use strict';

require('debug').enable(process.env.NPM_PACKAGE_CONFIG_ESLINT_DEBUG);

const assert = require('assert');
const CLIEngine = require('eslint').CLIEngine;
const eol = require('eol');

let cli = new CLIEngine();

let files = process.env.NPM_PACKAGE_CONFIG_ESLINT_FILES.split(',');

let results = cli.executeOnFiles(files).results;

let indent = '\n        ';

describe('eslint', function() {
  results.forEach(result => {
    it(result.filePath + ' passes', function() {
      let messages = result.messages;
      messages = messages.map(message => {
        let line = message.line;
        message = message.message;
        return 'Line ' + line + ': ' + message;
      });
      let message = indent + messages.join(indent);
      assert.equal(messages.length, 0, eol.auto(message));
    });
  });
});
