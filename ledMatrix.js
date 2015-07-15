var ffi = require('ffi');

var libmatrix = ffi.Library('rpi-rgb-led-matrix/librgb',{
'sayHello': ['string', []],
'displayText':['int', ['string']]

});

function sayHello(){
	console.log(libmatrix.sayHello());
	console.log(libmatrix.displayText('hello'));
}

module.exports.sayHello=sayHello;

