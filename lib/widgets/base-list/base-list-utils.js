/*
 * Утилита для работы с координатами.
 * Ограничения нужны для того, чтобы можно было вычислять конец по размеру и размер по концу.
 */
goog.provide('zb.ui.widgets.BaseListUtils');


/**
 * @param {number} line
 * @param {number} lineSize
 * @return {number}
 */
zb.ui.widgets.BaseListUtils.getItemsByLines = (line, lineSize) => line * lineSize;


/**
 * @param {number} items
 * @param {number} lineSize
 * @return {number}
 */
zb.ui.widgets.BaseListUtils.getLinesByItems = (items, lineSize) => Math.ceil(items / lineSize);


/**
 * @param {number} index
 * @param {number} lineSize
 * @return {number}
 */
zb.ui.widgets.BaseListUtils.getLineByIndex = (index, lineSize) => Math.floor(index / lineSize);


/**
 * @param {number} index
 * @param {number} lineSize
 * @return {number}
 */
zb.ui.widgets.BaseListUtils.getLineStart = (index, lineSize) => {
	const line = zb.ui.widgets.BaseListUtils.getLineByIndex(index, lineSize);
	return zb.ui.widgets.BaseListUtils.getItemsByLines(line, lineSize);
};


/**
 * @param {number} index
 * @param {number} lineSize
 * @return {number}
 */
zb.ui.widgets.BaseListUtils.getLineEnd = (index, lineSize) => {
	const lineStart = zb.ui.widgets.BaseListUtils.getLineStart(index, lineSize);
	return lineStart + lineSize - 1;
};


/**
 * @param {number} index
 * @param {number} lineSize
 * @return {zb.ui.widgets.BaseListUtils.Coords}
 */
zb.ui.widgets.BaseListUtils.getCoordsByIndex = (index, lineSize) => {
	const coordsLine = zb.ui.widgets.BaseListUtils.getLineByIndex(index, lineSize);
	const coordsLineItems = zb.ui.widgets.BaseListUtils.getItemsByLines(coordsLine, lineSize);
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
zb.ui.widgets.BaseListUtils.getIndexByCoords = (line, index, lineSize) => {
	const lineItems = zb.ui.widgets.BaseListUtils.getItemsByLines(line, lineSize);
	return lineItems + index;
};


/**
 * @param {number} index
 * @return {boolean}
 */
zb.ui.widgets.BaseListUtils.isValidIndex = (index) => index >= 0 || isNaN(index);


/**
 * @param {number} size
 * @return {boolean}
 */
zb.ui.widgets.BaseListUtils.isValidSize = (size) => size >= 0;


/**
 * @param {number} currIndex
 * @param {number} lineSize
 * @return {number}
 */
zb.ui.widgets.BaseListUtils.getNextLine = (currIndex, lineSize) => {
	const coords = zb.ui.widgets.BaseListUtils.getCoordsByIndex(currIndex, lineSize);
	return zb.ui.widgets.BaseListUtils.getIndexByCoords(coords.line + 1, coords.index, lineSize);
};


/**
 * @param {number} currIndex
 * @param {number} lineSize
 * @return {number}
 */
zb.ui.widgets.BaseListUtils.getPrevLine = (currIndex, lineSize) => {
	const coords = zb.ui.widgets.BaseListUtils.getCoordsByIndex(currIndex, lineSize);
	return zb.ui.widgets.BaseListUtils.getIndexByCoords(coords.line - 1, coords.index, lineSize);
};


/**
 * @param {number} currIndex
 * @return {number}
 */
zb.ui.widgets.BaseListUtils.getNextIndex = (currIndex) => {
	const nextIndex = currIndex + 1;
	return zb.ui.widgets.BaseListUtils.isValidIndex(nextIndex) ? nextIndex : NaN;
};


/**
 * @param {number} currIndex
 * @return {number}
 */
zb.ui.widgets.BaseListUtils.getPrevIndex = (currIndex) => {
	const prevIndex = currIndex - 1;
	return zb.ui.widgets.BaseListUtils.isValidIndex(prevIndex) ? prevIndex : NaN;
};


/**
 * @param {number} endIndex
 * @return {number}
 */
zb.ui.widgets.BaseListUtils.endToSize = (endIndex) => {
	if (!zb.ui.widgets.BaseListUtils.isValidIndex(endIndex) || isNaN(endIndex)) {
		return 0;
	}

	return endIndex + 1;
};


/**
 * @param {number} size
 * @return {number}
 */
zb.ui.widgets.BaseListUtils.sizeToEnd = (size) => {
	if (!zb.ui.widgets.BaseListUtils.isValidSize(size) || size === 0) {
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
zb.ui.widgets.BaseListUtils.Coords;
