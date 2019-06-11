/*
 * Утилита для работы с координатами.
 * Ограничения нужны для того, чтобы можно было вычислять конец по размеру и размер по концу.
 */


/**
 * @param {number} line
 * @param {number} lineSize
 * @return {number}
 */
export const getItemsByLines = (line, lineSize) => line * lineSize;


/**
 * @param {number} items
 * @param {number} lineSize
 * @return {number}
 */
export const getLinesByItems = (items, lineSize) => Math.ceil(items / lineSize);


/**
 * @param {number} index
 * @param {number} lineSize
 * @return {number}
 */
export const getLineByIndex = (index, lineSize) => Math.floor(index / lineSize);


/**
 * @param {number} index
 * @param {number} lineSize
 * @return {number}
 */
export const getLineStart = (index, lineSize) => {
	const line = getLineByIndex(index, lineSize);
	return getItemsByLines(line, lineSize);
};


/**
 * @param {number} index
 * @param {number} lineSize
 * @return {number}
 */
export const getLineEnd = (index, lineSize) => {
	const lineStart = getLineStart(index, lineSize);
	return lineStart + lineSize - 1;
};


/**
 * @param {number} index
 * @param {number} lineSize
 * @return {Coords}
 */
export const getCoordsByIndex = (index, lineSize) => {
	const coordsLine = getLineByIndex(index, lineSize);
	const coordsLineItems = getItemsByLines(coordsLine, lineSize);
	const coordsIndex = index - coordsLineItems;

	return {
		line: coordsLine,
		index: coordsIndex
	};
};


/**
 * @param {number} line
 * @param {number} index
 * @param {number} lineSize
 * @return {number}
 */
export const getIndexByCoords = (line, index, lineSize) => {
	const lineItems = getItemsByLines(line, lineSize);
	return lineItems + index;
};


/**
 * @param {number} index
 * @return {boolean}
 */
export const isValidIndex = (index) => index >= 0 || isNaN(index);


/**
 * @param {number} size
 * @return {boolean}
 */
export const isValidSize = (size) => size >= 0;


/**
 * @param {number} currIndex
 * @param {number} lineSize
 * @return {number}
 */
export const getNextLine = (currIndex, lineSize) => {
	const coords = getCoordsByIndex(currIndex, lineSize);
	return getIndexByCoords(coords.line + 1, coords.index, lineSize);
};


/**
 * @param {number} currIndex
 * @param {number} lineSize
 * @return {number}
 */
export const getPrevLine = (currIndex, lineSize) => {
	const coords = getCoordsByIndex(currIndex, lineSize);
	return getIndexByCoords(coords.line - 1, coords.index, lineSize);
};


/**
 * @param {number} currIndex
 * @return {number}
 */
export const getNextIndex = (currIndex) => {
	const nextIndex = currIndex + 1;
	return isValidIndex(nextIndex) ? nextIndex : NaN;
};


/**
 * @param {number} currIndex
 * @return {number}
 */
export const getPrevIndex = (currIndex) => {
	const prevIndex = currIndex - 1;
	return isValidIndex(prevIndex) ? prevIndex : NaN;
};


/**
 * @param {number} endIndex
 * @return {number}
 */
export const endToSize = (endIndex) => {
	if (!isValidIndex(endIndex) || isNaN(endIndex)) {
		return 0;
	}

	return endIndex + 1;
};


/**
 * @param {number} size
 * @return {number}
 */
export const sizeToEnd = (size) => {
	if (!isValidSize(size) || size === 0) {
		return NaN;
	}

	return size - 1;
};


/**
 * @typedef {{
 *     line: number,
 *     index: number
 * }}
 */
export let Coords;
