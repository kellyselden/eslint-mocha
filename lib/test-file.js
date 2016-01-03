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
      var message = indent + messages.map(function(message) { return message.message; }).join(indent);
      assert.equal(messages.length, 0, message);
    });
  });
});
