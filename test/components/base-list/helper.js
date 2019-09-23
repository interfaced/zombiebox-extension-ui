import List from 'ui/data/list';
import AbstractBaseListBuffer, {Options} from 'ui/widgets/base-list/abstract-base-list-buffer';
import BaseListDataList from 'ui/widgets/base-list/base-list-data-list';


export const noop = () => {/* do nothing */};


export const changeSpy = sinon.spy();


export const selectSpy = sinon.spy();


export const defaultOptions = {
	padding: 2,
	lineSize: 3,
	loadOnLeft: 1
};


/**
 * @param {Array<string>} array
 * @return {List<string>}
 */
export const createDataList = (array) => new List(array);


/**
 * @param {Options=} options
 * @return {AbstractBaseListBuffer}
 */
export const createBuffer = (options) => new BaseListDataList(
	options || defaultOptions,
	(...args) => {
		changeSpy(...args);
	},
	(...args) => {
		selectSpy(...args);
	}
);


/**
 * @param {AbstractBaseListBuffer} buffer
 * @param {?List<string>} source
 * @return {Promise<AbstractBaseListBuffer>}
 */
export const setBufferSource = (buffer, source) => {
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
export const createDefaultArray = () => [
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
 * @return {List<string>}
 */
export const createDefaultDataList = () => {
	const array = createDefaultArray();
	return createDataList(array);
};


/**
 * @return {Promise<AbstractBaseListBuffer>}
 */
export const createDefaultBuffer = () => {
	const buffer = createBuffer();
	const dataList = createDefaultDataList();
	return setBufferSource(buffer, dataList);
};

// Other

/**
 * @return {Array<string>}
 */
export const createOtherArray = () => [
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
 * @return {List<string>}
 */
export const createOtherDataList = () => {
	const array = createOtherArray();
	return createDataList(array);
};


/**
 * @return {Promise<AbstractBaseListBuffer>}
 */
export const createOtherBuffer = () => {
	const buffer = createBuffer();
	const dataList = createOtherDataList();
	return setBufferSource(buffer, dataList);
};

// Empty

/**
 * @return {Array<string>}
 */
export const createEmptyArray = () => [];


/**
 * @return {List<string>}
 */
export const createEmptyDataList = () => {
	const array = createEmptyArray();
	return createDataList(array);
};


/**
 * @return {Promise<AbstractBaseListBuffer>}
 */
export const createEmptyBuffer = () => {
	const buffer = createBuffer();
	const dataList = createEmptyDataList();
	return setBufferSource(buffer, dataList);
};
