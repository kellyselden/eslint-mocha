const _require = require;

export default (compilers, extensions) => {
  compilers.forEach(compiler => {
    let [ext, mod] = compiler.split(':');

    if (extensions.indexOf(ext) === -1) {
      extensions.push(ext);
    }

    _require(mod);
  });
}
