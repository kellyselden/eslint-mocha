var assert = require('assert');
var CLIEngine = require('eslint').CLIEngine;

var cli = new CLIEngine();

var report = cli.executeOnFiles(["**/*.js"]);
report.results.forEach(function(result) {
  describe('eslint - ' + result.filePath, function() {
    it('passes', function() {
      assert.equal(result.messages.length, 0);
      assert.equal(result.errorCount, 0);
      assert.equal(result.warningCount, 0);
    });
  });
});
