import initEslint from './eslint/initialize';
import runMocha from './mocha/run';

export default options => {
  let lintTestFile = initEslint(options);

  runMocha(lintTestFile, options);
};
