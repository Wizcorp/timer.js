/**
 * If the millisecond representation ends up in 1970, we consider the timestamp to be in seconds,
 * and turn it into milliseconds.
 *
 * @param {number} timestamp    Unix timestamp in seconds or milliseconds.
 * @returns {number}            The unix timestamp normalized to milliseconds.
 */

function fixTimestamp(timestamp) {
	return timestamp < 1500000000 ? timestamp * 1000 : timestamp;
}


/**
 * @constructor
 */

function Timer() {
	this.offset = 0;   // msec
	this.accelerationFactor = 1;  // float
	this.startAt = Date.now();  // real timestamp local to Date.now()
}


Timer.prototype.configure = function (offset, accelerationFactor, startAt) {
	this.offset = offset || 0;
	this.accelerationFactor = accelerationFactor || 1;
	this.startAt = isFinite(startAt) && startAt !== null ? fixTimestamp(startAt) : Date.now();
};


Timer.prototype.translate = function (timestamp, msecOut) {
	timestamp = fixTimestamp(timestamp);

	var now = timestamp + this.offset;

	if (this.accelerationFactor !== 1 && timestamp >= this.startAt) {
		var msecPassed = (timestamp - this.startAt) * this.accelerationFactor;

		now = this.startAt + this.offset + msecPassed;
	}

	return msecOut ? now : Math.floor(now / 1000);
};


Timer.prototype.now = function (msecOut) {
	return this.translate(Date.now(), msecOut);
};


Timer.prototype.interval = function (msecOrSec) {
	return Math.round(msecOrSec / this.accelerationFactor);
};


module.exports = Timer;
