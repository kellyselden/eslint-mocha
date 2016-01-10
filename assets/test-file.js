/*eslint no-var: 0*/

var assert = require('assert');
var CLIEngine = require('eslint').CLIEngine;
var eol = require('eol');

var cli = new CLIEngine();

var files = process.env.NPM_PACKAGE_CONFIG_ESLINT_FILES.split(',');

var results = cli.executeOnFiles(files).results;

var indent = '\n        ';

describe('eslint', function() {
  results.forEach(function(result) {
    it(result.filePath + ' passes', function() {
      var messages = result.messages;
      messages = messages.map(function(message) {
        var line = message.line;
        message = message.message;
        return 'Line ' + line + ': ' + message;
      });
      var message = indent + messages.join(indent);
      assert.equal(messages.length, 0, eol.auto(message));
    });
  });
});
