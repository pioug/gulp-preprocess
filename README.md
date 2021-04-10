# gulp-preprocess [![NPM version](https://img.shields.io/npm/v/gulp-preprocess.svg)](https://www.npmjs.com/package/gulp-preprocess) [![Run tests](https://github.com/nfroidure/svg-pathdata/actions/workflows/test.yml/badge.svg)](https://github.com/nfroidure/svg-pathdata/actions/workflows/test.yml) [![Dependency Status](https://img.shields.io/david/pioug/gulp-preprocess.svg)](https://david-dm.org/pioug/gulp-preprocess)

> [Gulp](http://gulpjs.com) plugin to preprocess HTML, JavaScript, and other files based on custom context or environment configuration

## Information

<table>
<tr>
<td>Package</td><td>gulp-preprocess</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 14</td>
</tr>
<tr>
<td>Gulp Version</td>
<td>>= 4</td>
</tr>
</table>

## Usage

### Install

```
npm install gulp-preprocess --save-dev
```

## Examples

#### Gulpfile

```js
var preprocess = require("gulp-preprocess");

gulp.task("html", function () {
  gulp
    .src("./app/*.html")
    .pipe(preprocess({ context: { NODE_ENV: "production", DEBUG: true } })) // To set environment variables in-line
    .pipe(gulp.dest("./dist/"));
});

gulp.task("scripts", function () {
  gulp.src(["./app/*.js"]).pipe(preprocess()).pipe(gulp.dest("./dist/"));
});
```

#### Example HTML File

```html
<head>
  <title>Your App</title>

  <!-- @if NODE_ENV='production' -->
  <script src="some/production/lib/like/analytics.js"></script>
  <!-- @endif -->

</head>
<body>
  <!-- @ifdef DEBUG -->
  <h1>Debugging mode - <!-- @echo RELEASE_TAG --> </h1>
  <!-- @endif -->
  <p>
  <!-- @include welcome_message.txt -->
  </p>
</body>
```

#### Example JavaScript File

```js
var configValue = "/* @echo FOO */" || "default value";

// @ifdef DEBUG
someDebuggingCall();
// @endif
```

CoffeeScript files are also supported.

#### More Examples

`gulp-preprocess` uses [preprocess](https://github.com/jsoverson/preprocess#directive-syntax). More examples can be found in its [README](https://github.com/jsoverson/preprocess#directive-syntax).

## API

### preprocess(options)

#### options.context

Type: `Object`
Default: `{}`

Context for directives used in your preprocessed files. The default context consists of the current user environment variables. Custom context is merged with `process.env`.

#### options.includeBase

Type: `String`

Base directory for included files. By default, the path to included files is relative to the file currently being processed.

#### options.extension

Type: `String`

Override the file extension. This determines what [regular expressions are used for comments](https://github.com/jsoverson/preprocess/blob/master/lib/regexrules.js). You may wish to do this if you are using a custom extension or need to force a particular comment syntax (for example, to allow HTML-style comments in `.php` files).

## LICENSE

The MIT License (MIT)

Copyright (c) 2014 Jason Sandmeyer

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
