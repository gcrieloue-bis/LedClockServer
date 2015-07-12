var clock = require('./clock.js');
var rest = require('restify');
var dateformat = require('dateformat');

var currentPermanentData;
var DELAY=2000;

function start(){
	clock(function()
	{
		display();
	});
}

function showClock()
{
	var date = new Date();
	console.log(dateformat(date,'HH:MM:ss')+' (delta:'+date.getMilliseconds()+')');
}

var displayEventQueue = [];
var displayBusy = false;

function display(data, delay){
	if (!data)
	{
		if(!displayBusy){
			showClock();
		}
		return;
	}

	var displayEvent = {};
	displayEvent.data = data;
	displayEvent.delay = delay;
	displayEventQueue.push(displayEvent);

	if(!displayBusy){
		consumeEvents();
	}
}

function consumeEvents()
{
	displayBusy = true;
	var displayEvent = displayEventQueue.shift();

	console.log(displayEvent);

	if (displayEventQueue.length)
	{
		setTimeout(consumeEvents, DELAY);
	}
	else {
		setTimeout(function(){
			displayBusy=false;
			showClock()
		}, DELAY);
	}
}

module.exports.start = start;
module.exports.display = display;
