var clock = require('./clock.js');
var rest = require('restify');
var dateformat = require('dateformat');
var currentPermanentData;

function start(){
clock(function(date)
{
	display(date, true);
});
}

var DELAY=1000;

function display(data, isPermanent, delay){
console.log('display');
	if (!data)
	{
		return;
	}


	if (data instanceof Date)
	{
		var date = data;
		console.log(dateformat(date,'HH:MM:ss')+' (delta:'+date.getMilliseconds()+')');
	}
	else
	{
		// Display the data, then go back to current permanent data
		console.log(data.toString());
	}

	if (isPermanent)
	{
		currentPermanentData = data;
	}
	// back to permanent data after delay
	else if (currentPermanentData && data !== currentPermanentData)
	{
		setTimeout(function(){display(currentPermanentData);}, DELAY);
	}
}

module.exports.start = start;
module.exports.display = display;
