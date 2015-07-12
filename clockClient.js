var clock = require('./clock.js');
var rest = require('restify');
var dateformat = require('dateformat');

// default delay
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
	var delay = DELAY;

	if (typeof displayEvent.delay != "undefined" && displayEvent.delay>0){
		delay = displayEvent.delay*1000;
	}

	console.log(displayEvent);

	// if other events available, consume them.
	if (displayEventQueue.length)
	{
		setTimeout(consumeEvents, delay);
	}
	else {
		setTimeout(function(){
			// check if there have not been any event during the wait delay
			if (displayEventQueue.length)
			{
				consumeEvents();
			}
			else // else display clock without delay
			{	
				displayBusy=false;
				showClock();
			}		
		}, delay);
	}
}

module.exports.start = start;
module.exports.display = display;
