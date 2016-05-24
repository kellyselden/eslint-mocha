# eslint-mocha
[![Build Status](https://travis-ci.org/kellyselden/eslint-mocha.svg?branch=master)](https://travis-ci.org/kellyselden/eslint-mocha)
[![Build status](https://ci.appveyor.com/api/projects/status/urui3cpj6ydgo8fy/branch/master?svg=true)](https://ci.appveyor.com/project/kellyselden/eslint-mocha/branch/master)
[![Code Climate](https://codeclimate.com/github/kellyselden/eslint-mocha/badges/gpa.svg)](https://codeclimate.com/github/kellyselden/eslint-mocha)
[![Coverage Status](https://coveralls.io/repos/kellyselden/eslint-mocha/badge.svg?branch=master&service=github)](https://coveralls.io/github/kellyselden/eslint-mocha?branch=master)

[![npm version](https://badge.fury.io/js/eslint-mocha.svg)](https://badge.fury.io/js/eslint-mocha)
[![Dependency Status](https://david-dm.org/kellyselden/eslint-mocha.svg)](https://david-dm.org/kellyselden/eslint-mocha)
[![devDependency Status](https://david-dm.org/kellyselden/eslint-mocha/dev-status.svg)](https://david-dm.org/kellyselden/eslint-mocha#info=devDependencies)

Auto inject ESLint tests into your Mocha suite.

###Installation

```sh
npm install eslint-mocha
```

You also need `eslint` and `mocha` as dependencies.

###Usage

```sh
eslint-mocha --eslint-args="my eslint args" --mocha-args="my mocha args"
```

###Example

```sh
eslint-mocha --eslint-args="**/*.js" --mocha-args="test/**/*-test.js"
```
