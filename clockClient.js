var clock = require('./clock.js');
var rest = require('restify');
var currentPermanentData;

function start(){
clock(function(date)
{
	display(date, true);
});
}

function display(data, isPermanent){
if (isPermanent)
{
currentPermanentData = isPermanent;
}
if (data instanceof Date)
{
	var date = data;
	console.log(date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+' (delta:'+date.getMilliseconds()+')');
}
else
{
	// Display the data, then go back to current permanent data
	console.log(data);
	display(currentPermanentData);
}
}

module.exports.start = start;
module.exports.display = display;
