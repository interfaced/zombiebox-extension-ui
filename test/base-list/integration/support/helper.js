goog.provide('zb.ui.test.baseListHelper');


// Common

zb.ui.test.baseListHelper.changeCallback = () => 'changeCallback';


zb.ui.test.baseListHelper.selectCallback = () => 'selectCallback';


zb.ui.test.baseListHelper.defaultOptions = {
	padding: 2,
	lineSize: 3,
	loadOnLeft: 1
};


/**
 * @param {Array<string>} array
 * @return {zb.ui.data.List<string>}
 */
zb.ui.test.baseListHelper.createDataList = (array) => new zb.ui.data.List(array);


/**
 * @param {zb.ui.widgets.BaseListBuffer.Options=} opt_options
 * @return {zb.ui.widgets.BaseListBuffer}
 */
zb.ui.test.baseListHelper.createBuffer = (opt_options) => {
	const helper = zb.ui.test.baseListHelper;

	return new zb.ui.widgets.BaseListDataList(
		opt_options || helper.defaultOptions,
		(...args) => {
			helper.changeCallback(...args);
		},
		(...args) => {
			helper.selectCallback(...args);
		}
	);
};


/**
 * @param {zb.ui.widgets.BaseListBuffer} buffer
 * @param {?zb.ui.data.List<string>} source
 * @return {IThenable<zb.ui.widgets.BaseListBuffer>}
 */
zb.ui.test.baseListHelper.setBufferSource = (buffer, source) => {
	buffer.setSource(source);

	if (source) {
		return source
			.preload()
			.then(() => buffer);
	} else {
		return Promise.resolve(buffer);
	}
};

// Default

/**
 * @return {Array<string>}
 */
zb.ui.test.baseListHelper.createDefaultArray = () => [
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


/**
 * @return {zb.ui.data.List<string>}
 */
zb.ui.test.baseListHelper.createDefaultDataList = () => {
	const array = zb.ui.test.baseListHelper.createDefaultArray();
	return zb.ui.test.baseListHelper.createDataList(array);
};


/**
 * @return {IThenable<zb.ui.widgets.BaseListBuffer>}
 */
zb.ui.test.baseListHelper.createDefaultBuffer = () => {
	const buffer = zb.ui.test.baseListHelper.createBuffer();
	const dataList = zb.ui.test.baseListHelper.createDefaultDataList();
	return zb.ui.test.baseListHelper.setBufferSource(buffer, dataList);
};

// Other

/**
 * @return {Array<string>}
 */
zb.ui.test.baseListHelper.createOtherArray = () => [
	'alpha', 'beta', 'gamma',
	'delta', 'epsilon', 'zeta',
	'eta', 'theta', 'iota',
	'kappa', 'lambda', 'mu',
	'nu', 'omicron', 'pi',
	'rho', 'sigma', 'tau',
	'upsilon', 'phi', 'chi',
	'psi', 'omega'
];


/**
 * @return {zb.ui.data.List<string>}
 */
zb.ui.test.baseListHelper.createOtherDataList = () => {
	const array = zb.ui.test.baseListHelper.createOtherArray();
	return zb.ui.test.baseListHelper.createDataList(array);
};


/**
 * @return {IThenable<zb.ui.widgets.BaseListBuffer>}
 */
zb.ui.test.baseListHelper.createOtherBuffer = () => {
	const buffer = zb.ui.test.baseListHelper.createBuffer();
	const dataList = zb.ui.test.baseListHelper.createOtherDataList();
	return zb.ui.test.baseListHelper.setBufferSource(buffer, dataList);
};

// Empty

/**
 * @return {Array<string>}
 */
zb.ui.test.baseListHelper.createEmptyArray = () => [];


/**
 * @return {zb.ui.data.List<string>}
 */
zb.ui.test.baseListHelper.createEmptyDataList = () => {
	const array = zb.ui.test.baseListHelper.createEmptyArray();
	return zb.ui.test.baseListHelper.createDataList(array);
};


/**
 * @return {IThenable<zb.ui.widgets.BaseListBuffer>}
 */
zb.ui.test.baseListHelper.createEmptyBuffer = () => {
	const buffer = zb.ui.test.baseListHelper.createBuffer();
	const dataList = zb.ui.test.baseListHelper.createEmptyDataList();
	return zb.ui.test.baseListHelper.setBufferSource(buffer, dataList);
};
