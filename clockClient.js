
var clock = require('./clock.js');
var rest = require('restify');
var dateformat = require('dateformat');
var ledMatrix = require('./ledMatrix.js'); 

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
		var dateStr = dateformat(date,'HH:MM:ss');
		console.log(dateStr + '(delta:' + date.getMilliseconds() + ')');
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
		if (displayEvent.data=="sayHello")
		{
				ledMatrix.sayHello();
		}	

		// if other events available, consume them.
		if (displayEventQueue.length)
		{
				setTimeout(consumeEvents, delay);
		}
		else {
				setTimeout(consumeOtherEventsOrDisplayClock, delay);
		}
}

function consumeOtherEventsOrDisplayClock()
{
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
}

module.exports.start = start;
module.exports.display = display;
