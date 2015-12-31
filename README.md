Move Property
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Move a property from one object to another object.


## Installation

``` bash
$ npm install utils-move-property
```


## Usage

``` javascript
var mv = require( 'utils-move-property' );
```

#### mv( source, prop, target )

Moves a property from one `object` to another `object`.

``` javascript
var obj1 = { 'a': 'b' };
var obj2 = {};

var bool = mv( obj1, 'a', obj2 );
// returns true
```

If the operation is successful, the `function` returns `true`; otherwise, `false`.

``` javascript
var bool = mv( obj1, 'c', obj2 );
// returns false
```


## Notes

*	The property is __deleted__ from the *source* `object`.
*	The property's descriptor __is__ preserved during transfer.
* 	A transfer is __shallow__.

	``` javascript
	var arr = [ 1, 2, 3 ];
	var obj1 = { 'a': arr };
	var obj2 = {};

	var bool = mv( obj1, 'a', obj2 );
	console.log( obj2.a === arr );
	// returns true
	```

*	If a *source* property is __not__ `configurable`, the `function` throws an `Error`, as the property __cannot__ be deleted from the *source* `object`.


## Examples

``` javascript
var mv = require( 'utils-move-property' );

var obj1 = {
	'beep': 'boop'
};

var obj2 = {
	'foo': 'bar'
};

var bool = mv( obj1, 'beep', obj2 );
if ( bool === false ) {
	console.log( 'failed to move property' );
}
console.dir( obj1 );
/*
  {}
*/
console.dir( obj2 );
/*
  {
    'foo': 'bar',
    'beep': 'boop'
  }
*/
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/utils-move-property.svg
[npm-url]: https://npmjs.org/package/utils-move-property

[build-image]: http://img.shields.io/travis/kgryte/utils-move-property/master.svg
[build-url]: https://travis-ci.org/kgryte/utils-move-property

[coverage-image]: https://img.shields.io/codecov/c/github/kgryte/utils-move-property/master.svg
[coverage-url]: https://codecov.io/github/kgryte/utils-move-property?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/utils-move-property.svg
[dependencies-url]: https://david-dm.org/kgryte/utils-move-property

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/utils-move-property.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/utils-move-property

[github-issues-image]: http://img.shields.io/github/issues/kgryte/utils-move-property.svg
[github-issues-url]: https://github.com/kgryte/utils-move-property/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com
