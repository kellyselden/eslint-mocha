var assert = require('assert');
var CLIEngine = require('eslint').CLIEngine;
var EOL = require('os').EOL;

var cli = new CLIEngine();

var files = process.env.NODE_ESLINT_FILES.split(',');

var results = cli.executeOnFiles(files).results;

var indent = EOL + '        ';

describe('eslint', function() {
  results.forEach(function(result) {
    it(result.filePath + ' passes', function() {
      var messages = result.messages;
      messages = messages.map(function(message) {
        return 'Line ' + message.line + ': ' + message.message;
      });
      var message = indent + messages.join(indent);
      assert.equal(messages.length, 0, message);
    });
  });
});
