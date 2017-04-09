import { expect } from 'chai';
import run from '../helpers/run';
import { symbols } from 'mocha/lib/reporters/base';
import { exec } from 'child_process';
import mkdirp from 'mkdirp';
import fs from 'fs';
import rimraf from 'rimraf';

const { ok } = symbols;

describe.only('acceptance - npm bin', function() {
  this.timeout(100000);

  let workingDir = 'test/fixtures/npm-bin';
  let folders = fs.readdirSync('node_modules');

  it('works', function() {
    return new Promise(resolve => {
      let originalWorkingDir;
      if (workingDir) {
        originalWorkingDir = process.cwd();
        process.chdir(workingDir);
      }

      rimraf.sync('node_modules');
      mkdirp.sync('node_modules/eslint-mocha');
      process.chdir('node_modules');
      // fs.readdirSync('.').forEach(folder => {
      //   if (!fs.existsSync(`../../../../node_modules/${folder}`)) {
      //     rimraf.sync(folder);
      //   }
      // });
      folders.forEach(folder => {
        if (!fs.existsSync(folder)) {
          fs.symlinkSync(`../../../../node_modules/${folder}`, folder);
        }
      });
      process.chdir('eslint-mocha');
      fs.symlinkSync('../../../../../dist', 'dist');
      fs.symlinkSync('../../../../../package.json', 'package.json');
      process.chdir('../..');

      exec(`npm t`, (err, stdout, stderr) => {
        if (originalWorkingDir) {
          process.chdir(originalWorkingDir);
        }

        expect(stdout).to.contain(`${ok} this is my test`);

        resolve({
          err,
          stdout,
          stderr
        });
      });
    });
  });
});
