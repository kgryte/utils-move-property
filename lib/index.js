'use strict';

/**
* FUNCTION: mv( source, prop, target )
*	Moves a property from one object to another object.
*
* @param {Object} source - source object
* @param {String} prop - property to move
* @param {Object} target - target object
* @returns {Boolean} boolean indicating whether operation was successful
*/
function mv( source, prop, target ) {
	var desc;
	if ( typeof source !== 'object' || source === null ) {
		throw new TypeError( 'invalid input argument. Source argument must be an object. Value: `' + source + '`.' );
	}
	if ( typeof target !== 'object' || target === null ) {
		throw new TypeError( 'invalid input argument. Target argument must be an object. Value: `' + target + '`.' );
	}
	desc = Object.getOwnPropertyDescriptor( source, prop );
	if ( desc === void 0 ) {
		return false;
	}
	delete source[ prop ];
	Object.defineProperty( target, prop, desc );
	return true;
} // end FUNCTION mv()


// EXPORTS //

module.exports = mv;
