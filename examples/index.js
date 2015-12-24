'use strict';

var mv = require( './../lib' );

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
