var assert = require('assert');

describe('wizcorp-timer', function () {
	var Timer = require('../');

	it('instantiate a new timer', function () {
		var timerA = new Timer();
	});

	it('get a timestamp in milliseconds', function () {
		var timerA = new Timer();

		var msecTime = timerA.msec();
		var now = Date.now();

		assert(now - msecTime <= 100);
	});

	it('get a timestamp in seconds', function () {
		var timerA = new Timer();

		var secTime = timerA.sec();
		var now = Date.now() / 1000;
		assert(now - secTime <= 1);
	});
});