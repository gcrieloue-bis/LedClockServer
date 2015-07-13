//This module send time to the callback when time minutes are 0
module.exports = function(callback)
{
	callback();
	var tick = function()
	{
		// Here, we do auto adjustment in order to keep up with time since setTimeout is not accurate
		if (new Date().getSeconds()===0)
		{
			callback();
			setTimeout(tick, 60000-new Date().getMilliseconds());
		}	
		else
		{
			setTimeout(tick, 500-new Date().getMilliseconds());
		}
	};
	tick();
};
