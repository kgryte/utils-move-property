'use strict';

// MODULES //

var test = require( 'tape' );
var assert = require( 'chai' ).assert;
var mv = require( './../lib' );


// TESTS //

test( 'main export is a function', function test( t ) {
	t.ok( typeof mv === 'function', 'export is a function' );
	t.end();
});

test( 'if provided a `source` argument which is not an object, the function will throw', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		undefined,
		true,
		false
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws type error when provided ' + (typeof values[i]) );
	}
	t.end();
	function badValue( value ) {
		return function badValue() {
			mv( value, 'a', {} );
		};
	}
});

test( 'if provided a `target` argument which is not an object, the function will throw', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		undefined,
		true,
		false
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws type error when provided ' + (typeof values[i]) );
	}
	t.end();
	function badValue( value ) {
		return function badValue() {
			mv( {}, 'a', value );
		};
	}
});

test( 'if unable to move a property, the function returns `false`', function test( t ) {
	var bool = mv( {}, 'a', {} );
	t.notOk( bool, 'unable to move property' );
	t.end();
});

test( 'if moving a property is successful, the function returns `true`', function test( t ) {
	var bool = mv( {'a':'b'}, 'a', {} );
	t.ok( bool, 'successfully moved property' );
	t.end();
});

test( 'the function moves property a from one object to another object', function test( t ) {
	var obj1 = { 'a': 'b' };
	var obj2 = {};
	var bool = mv( obj1, 'a', obj2 );
	t.ok( bool, 'successfully moved property' );

	assert.deepEqual( obj2, {'a':'b'} );
	t.ok( true, 'deep equal' );

	assert.deepEqual( obj1, {} );
	t.ok( true, 'deep equal' );

	t.end();
});

test( 'the function deletes a property from the source object', function test( t ) {
	var obj1 = { 'a': 'b' };
	var obj2 = {};
	var bool = mv( obj1, 'a', obj2 );
	t.ok( bool, 'successfully moved property' );
	assert.deepEqual( obj1, {} );
	t.ok( true, 'deep equal' );
	t.end();
});

test( 'the function preserves property\'s descriptors', function test( t ) {
	var obj1 = {};
	var obj2 = {};
	var bool;
	var desc;

	desc = {
		'value': 'b',
		'writable': false,
		'configurable': true,
		'enumerable': false
	};

	Object.defineProperty( obj1, 'a', desc );

	bool = mv( obj1, 'a', obj2 );
	t.ok( bool, 'successfully moved property');

	assert.deepEqual( obj1, {} );
	t.ok( true, 'deep equal' );

	t.equal( obj2.a, 'b' );

	assert.deepEqual( Object.getOwnPropertyDescriptor( obj2, 'a' ), desc );
	t.ok( true, 'descriptors are equal' );

	t.end();
});

test( 'if a property cannot be deleted from a source object, the function throws an error', function test( t ) {
	var obj1 = {};
	var obj2 = {};
	var desc;

	desc = {
		'value': 'b',
		'writable': false,
		'configurable': false,
		'enumerable': false
	};

	Object.defineProperty( obj1, 'a', desc );

	t.throws( foo, Error );
	t.end();
	function foo() {
		mv( obj1, 'a', obj2 );
	}
});

test( 'the function does not deep copy moved properties', function test( t ) {
	var arr = [ 1, 2, 3 ];
	var obj1 = { 'a': arr };
	var obj2 = {};
	var bool = mv( obj1, 'a', obj2 );
	t.ok( bool, 'successfully moved property' );
	assert.deepEqual( obj2, {'a':arr} );
	t.ok( true, 'deep equal' );

	assert.deepEqual( obj1, {} );
	t.ok( true, 'deep equal' );

	t.equal( obj2.a, arr, 'same reference' );

	t.end();
});
