goog.provide('zb.ui.limit');


/**
 * @param {function(...):RESULT} targetFunction
 * @param {number} waitTime
 * @return {function(...):RESULT}
 * @template RESULT
 */
zb.ui.limit.debounce = function(targetFunction, waitTime) {
	let timer = null;

	return function() {
		const args = arguments;

		function complete() {
			timer = null;
			return targetFunction.apply(null, args);
		}

		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(complete, waitTime);
	};
};


/**
 * @param {function(...):RESULT} targetFunction
 * @param {number} waitTime
 * @return {function(...):RESULT}
 * @template RESULT
 */
zb.ui.limit.throttle = function(targetFunction, waitTime) {
	let lastEventTimestamp = null;

	return function() {
		const now = Date.now();

		if (!lastEventTimestamp || now - lastEventTimestamp >= waitTime) {
			lastEventTimestamp = now;
			return targetFunction.apply(null, arguments);
		}
	};
};
