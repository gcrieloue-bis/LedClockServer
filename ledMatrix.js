var ffi = require('ffi');

var libmatrix = ffi.Library('rpi-rgb-led-matrix/librgb',{
'sayHello': ['string', []],
'displayText':['string', ['string']]

});

function sayHello(){
	console.log(libmatrix.sayHello());
	console.log(libmatrix.displayText);
}

module.exports.sayHello=sayHello;

