goog.provide('zb.ui.test.support.Helper');


// Common

zb.ui.test.support.Helper.changeCallback = function() {
	return 'changeCallback';
};

zb.ui.test.support.Helper.selectCallback = function() {
	return 'selectCallback';
};

zb.ui.test.support.Helper.defaultOptions = {
	padding: 2,
	lineSize: 3,
	loadOnLeft: 1
};

zb.ui.test.support.Helper.createDataList = function(array) {
	return new zb.ui.DataList(array);
};

zb.ui.test.support.Helper.createBuffer = function(dataList) {
	var helper = zb.ui.test.support.Helper;
	var buffer = new zb.ui.BaseListDataList(function() {
		helper.changeCallback.apply(helper, arguments);
	}, function() {
		helper.selectCallback.apply(helper, arguments);
	});

	buffer.setSource(dataList, helper.defaultOptions);

	return dataList.preload();
};

// Default

zb.ui.test.support.Helper.createDefaultArray = function() {
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

zb.ui.test.support.Helper.createDefaultDataList = function() {
	var array = zb.ui.test.support.Helper.createDefaultArray();
	return zb.ui.test.support.Helper.createDataList(array);
};

zb.ui.test.support.Helper.createDefaultBuffer = function() {
	var dataList = zb.ui.test.support.Helper.createDefaultDataList();
	return zb.ui.test.support.Helper.createBuffer(dataList);
};

// Other

zb.ui.test.support.Helper.createOtherArray = function() {
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

zb.ui.test.support.Helper.createOtherDataList = function() {
	var array = zb.ui.test.support.Helper.createOtherArray();
	return zb.ui.test.support.Helper.createDataList(array);
};

zb.ui.test.support.Helper.createOtherBuffer = function() {
	var dataList = zb.ui.test.support.Helper.createOtherDataList();
	return zb.ui.test.support.Helper.createBuffer(dataList);
};

// Empty

zb.ui.test.support.Helper.createEmptyArray = function() {
	return [];
};

zb.ui.test.support.Helper.createEmptyDataList = function() {
	var array = zb.ui.test.support.Helper.createEmptyArray();
	return zb.ui.test.support.Helper.createDataList(array);
};

zb.ui.test.support.Helper.createEmptyBuffer = function() {
	var dataList = zb.ui.test.support.Helper.createEmptyDataList();
	return zb.ui.test.support.Helper.createBuffer(dataList);
};

// Other

zb.ui.test.support.Helper.setSource = function(buffer, source) {
	var helper = zb.ui.test.support.Helper;
	buffer.setSource(source, helper.defaultOptions);

	return source ? source.preload() : Promise.resolve();
};
