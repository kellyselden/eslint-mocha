import initEslint from './eslint/initialize';
import runMocha from './mocha/run';

export default ({ eslint, mocha }) => {
  let lintTestFile = initEslint(eslint);

  runMocha(lintTestFile, mocha);
};
