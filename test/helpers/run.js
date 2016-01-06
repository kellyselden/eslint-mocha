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

      if (stderr) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
}
