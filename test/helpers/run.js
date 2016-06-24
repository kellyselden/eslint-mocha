import { exec } from 'child_process';
import path from 'path';

export default (args, workingDir) => {
  return new Promise((resolve, reject) => {
    let bin = path.resolve('bin/eslint-mocha.js');
    args = args.join(' ');

    let originalWorkingDir;
    if (workingDir) {
      originalWorkingDir = process.cwd();
      process.chdir(workingDir);
    }

    exec(`node ${bin} ${args}`, (err, stdout, stderr) => {
      if (originalWorkingDir) {
        process.chdir(originalWorkingDir);
      }

      let hasRuntimeError = stderr;
      let hasTestError = err;

      if (hasRuntimeError) {
        reject(stderr);
      } else if (hasTestError) {
        reject(stdout);
      } else {
        resolve(stdout);
      }
    });
  });
};
