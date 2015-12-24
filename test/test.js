/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' );
var mv = require( './../lib' );


// VARIABLES //

var expect = chai.expect;
var assert = chai.assert;


// TESTS //

describe( 'utils-move-property', function tests() {

	it( 'should export a function', function test() {
		expect( mv ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a `source` argument which is not an object', function test() {
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
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function badValue() {
				mv( value, 'a', {} );
			};
		}
	});

	it( 'should throw an error if provided a `target` argument which is not an object', function test() {
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
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function badValue() {
				mv( {}, 'a', value );
			};
		}
	});

	it( 'should return `false` if unable to move a property', function test() {
		var bool = mv( {}, 'a', {} );
		assert.isFalse( bool );
	});

	it( 'should return `true` is able to move a property', function test() {
		var bool = mv( {'a':'b'}, 'a', {} );
		assert.isTrue( bool );
	});

	it( 'should move a property', function test() {
		var obj1 = { 'a': 'b' };
		var obj2 = {};
		var bool = mv( obj1, 'a', obj2 );
		assert.isTrue( bool );
		assert.deepEqual( obj2, {'a':'b'} );
		assert.deepEqual( obj1, {} );
	});

	it( 'should delete a property from the source object', function test() {
		var obj1 = { 'a': 'b' };
		var obj2 = {};
		var bool = mv( obj1, 'a', obj2 );
		assert.isTrue( bool );
		assert.deepEqual( obj1, {} );
	});

	it( 'should preserve a property\'s descriptor', function test() {
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
		assert.isTrue( bool );

		assert.deepEqual( obj1, {} );
		assert.strictEqual( obj2.a, 'b' );
		assert.deepEqual( Object.getOwnPropertyDescriptor( obj2, 'a' ), desc );
	});

	it( 'should throw an error if a property cannot be deleted from a source object', function test() {
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

		expect( foo ).to.throw( Error );
		function foo() {
			mv( obj1, 'a', obj2 );
		}
	});

});
