var exec = require('child_process').exec;
var path = require('path');

module.exports = function(args, workingDir) {
  return new Promise(function(resolve, reject) {
    var bin = path.resolve('index.js');

    var originalWorkingDir;
    if (workingDir) {
      originalWorkingDir = process.cwd();
      process.chdir(workingDir);
    }

    exec('node ' + bin + ' ' + args.join(' '), function(err, stdout, stderr) {
      if (originalWorkingDir) {
        process.chdir(originalWorkingDir);
      }

      if (stderr) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
};
