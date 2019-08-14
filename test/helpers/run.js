import { exec } from 'child_process';
import path from 'path';

export default (args, workingDir) => {
  return new Promise(resolve => {
    let bin = path.resolve('dist/bin/eslint-mocha.js');
    args = args.join(' ');

    let originalWorkingDir;
    if (workingDir) {
      originalWorkingDir = process.cwd();
      process.chdir(workingDir);
    }
debugger;
    exec(`node ${bin} ${args}`, (err, stdout, stderr) => {
      if (originalWorkingDir) {
        process.chdir(originalWorkingDir);
      }

      resolve({
        err,
        stdout,
        stderr
      });
    });
  });
};
