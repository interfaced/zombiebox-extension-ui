goog.provide('zb.ui.test.baseListHelper');


// Common

zb.ui.test.baseListHelper.changeCallback = function() {
	return 'changeCallback';
};


zb.ui.test.baseListHelper.selectCallback = function() {
	return 'selectCallback';
};


zb.ui.test.baseListHelper.defaultOptions = {
	padding: 2,
	lineSize: 3,
	loadOnLeft: 1
};


/**
 * @param {Array.<string>} array
 * @return {zb.ui.DataList.<string>}
 */
zb.ui.test.baseListHelper.createDataList = function(array) {
	return new zb.ui.DataList(array);
};


/**
 * @param {zb.ui.BaseListBuffer.Options=} opt_options
 * @return {zb.ui.BaseListBuffer}
 */
zb.ui.test.baseListHelper.createBuffer = function(opt_options) {
	var helper = zb.ui.test.baseListHelper;

	return new zb.ui.BaseListDataList(
		opt_options || helper.defaultOptions,
		function() {
			helper.changeCallback.apply(helper, arguments);
		},
		function() {
			helper.selectCallback.apply(helper, arguments);
		}
	);
};


/**
 * @param {zb.ui.BaseListBuffer} buffer
 * @param {?zb.ui.DataList.<string>} source
 * @return {IThenable.<zb.ui.BaseListBuffer>}
 */
zb.ui.test.baseListHelper.setBufferSource = function(buffer, source) {
	buffer.setSource(source);

	if (source) {
		return source
			.preload()
			.then(function() {
				return buffer;
			});
	} else {
		return Promise.resolve(buffer);
	}
};

// Default

/**
 * @return {Array.<string>}
 */
zb.ui.test.baseListHelper.createDefaultArray = function() {
	return [
		'A', 'B', 'C',
		'D', 'E', 'F',
		'G', 'H', 'I',
		'J', 'K', 'L',
		'M', 'N', 'O',
		'P', 'Q', 'R',
		'S', 'T', 'U',
		'V', 'W', 'X',
		'Y', 'Z'
	];
};


/**
 * @return {zb.ui.DataList.<string>}
 */
zb.ui.test.baseListHelper.createDefaultDataList = function() {
	var array = zb.ui.test.baseListHelper.createDefaultArray();
	return zb.ui.test.baseListHelper.createDataList(array);
};


/**
 * @return {IThenable.<zb.ui.BaseListBuffer>}
 */
zb.ui.test.baseListHelper.createDefaultBuffer = function() {
	var buffer = zb.ui.test.baseListHelper.createBuffer();
	var dataList = zb.ui.test.baseListHelper.createDefaultDataList();
	return zb.ui.test.baseListHelper.setBufferSource(buffer, dataList);
};

// Other

/**
 * @return {Array.<string>}
 */
zb.ui.test.baseListHelper.createOtherArray = function() {
	return [
		'alpha', 'beta', 'gamma',
		'delta', 'epsilon', 'zeta',
		'eta', 'theta', 'iota',
		'kappa', 'lambda', 'mu',
		'nu', 'omicron', 'pi',
		'rho', 'sigma', 'tau',
		'upsilon', 'phi', 'chi',
		'psi', 'omega'
	];
};


/**
 * @return {zb.ui.DataList.<string>}
 */
zb.ui.test.baseListHelper.createOtherDataList = function() {
	var array = zb.ui.test.baseListHelper.createOtherArray();
	return zb.ui.test.baseListHelper.createDataList(array);
};


/**
 * @return {IThenable.<zb.ui.BaseListBuffer>}
 */
zb.ui.test.baseListHelper.createOtherBuffer = function() {
	var buffer = zb.ui.test.baseListHelper.createBuffer();
	var dataList = zb.ui.test.baseListHelper.createOtherDataList();
	return zb.ui.test.baseListHelper.setBufferSource(buffer, dataList);
};

// Empty

/**
 * @return {Array.<string>}
 */
zb.ui.test.baseListHelper.createEmptyArray = function() {
	return [];
};


/**
 * @return {zb.ui.DataList.<string>}
 */
zb.ui.test.baseListHelper.createEmptyDataList = function() {
	var array = zb.ui.test.baseListHelper.createEmptyArray();
	return zb.ui.test.baseListHelper.createDataList(array);
};


/**
 * @return {IThenable.<zb.ui.BaseListBuffer>}
 */
zb.ui.test.baseListHelper.createEmptyBuffer = function() {
	var buffer = zb.ui.test.baseListHelper.createBuffer();
	var dataList = zb.ui.test.baseListHelper.createEmptyDataList();
	return zb.ui.test.baseListHelper.setBufferSource(buffer, dataList);
};
