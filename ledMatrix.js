var ffi = require('ffi');

var libmatrix = ffi.Library('rpi-rgb-led-matrix/librgb',{
'sayHello': ['string', []]
});

function sayHello(){
	console.log(libmatrix.sayHello());
}

module.exports.sayHello=sayHello;

