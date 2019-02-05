/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
/*
 * Утилита для работы с координатами.
 * Ограничения нужны для того, чтобы можно было вычислять конец по размеру и размер по концу.
 */
goog.provide('zb.ui.BaseListUtils');


/**
 * @param {number} line
 * @param {number} lineSize
 * @return {number}
 */
zb.ui.BaseListUtils.getItemsByLines = (line, lineSize) => line * lineSize;


/**
 * @param {number} items
 * @param {number} lineSize
 * @return {number}
 */
zb.ui.BaseListUtils.getLinesByItems = (items, lineSize) => Math.ceil(items / lineSize);


/**
 * @param {number} index
 * @param {number} lineSize
 * @return {number}
 */
zb.ui.BaseListUtils.getLineByIndex = (index, lineSize) => Math.floor(index / lineSize);


/**
 * @param {number} index
 * @param {number} lineSize
 * @return {number}
 */
zb.ui.BaseListUtils.getLineStart = (index, lineSize) => {
	const line = zb.ui.BaseListUtils.getLineByIndex(index, lineSize);
	return zb.ui.BaseListUtils.getItemsByLines(line, lineSize);
};


/**
 * @param {number} index
 * @param {number} lineSize
 * @return {number}
 */
zb.ui.BaseListUtils.getLineEnd = (index, lineSize) => {
	const lineStart = zb.ui.BaseListUtils.getLineStart(index, lineSize);
	return lineStart + lineSize - 1;
};


/**
 * @param {number} index
 * @param {number} lineSize
 * @return {zb.ui.BaseListUtils.Coords}
 */
zb.ui.BaseListUtils.getCoordsByIndex = (index, lineSize) => {
	const coordsLine = zb.ui.BaseListUtils.getLineByIndex(index, lineSize);
	const coordsLineItems = zb.ui.BaseListUtils.getItemsByLines(coordsLine, lineSize);
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
zb.ui.BaseListUtils.getIndexByCoords = (line, index, lineSize) => {
	const lineItems = zb.ui.BaseListUtils.getItemsByLines(line, lineSize);
	return lineItems + index;
};


/**
 * @param {number} index
 * @return {boolean}
 */
zb.ui.BaseListUtils.isValidIndex = index => index >= 0 || isNaN(index);


/**
 * @param {number} size
 * @return {boolean}
 */
zb.ui.BaseListUtils.isValidSize = size => size >= 0;


/**
 * @param {number} currIndex
 * @param {number} lineSize
 * @return {number}
 */
zb.ui.BaseListUtils.getNextLine = (currIndex, lineSize) => {
	const coords = zb.ui.BaseListUtils.getCoordsByIndex(currIndex, lineSize);
	return zb.ui.BaseListUtils.getIndexByCoords(coords.line + 1, coords.index, lineSize);
};


/**
 * @param {number} currIndex
 * @param {number} lineSize
 * @return {number}
 */
zb.ui.BaseListUtils.getPrevLine = (currIndex, lineSize) => {
	const coords = zb.ui.BaseListUtils.getCoordsByIndex(currIndex, lineSize);
	return zb.ui.BaseListUtils.getIndexByCoords(coords.line - 1, coords.index, lineSize);
};


/**
 * @param {number} currIndex
 * @return {number}
 */
zb.ui.BaseListUtils.getNextIndex = currIndex => {
	const nextIndex = currIndex + 1;
	return zb.ui.BaseListUtils.isValidIndex(nextIndex) ? nextIndex : NaN;
};


/**
 * @param {number} currIndex
 * @return {number}
 */
zb.ui.BaseListUtils.getPrevIndex = currIndex => {
	const prevIndex = currIndex - 1;
	return zb.ui.BaseListUtils.isValidIndex(prevIndex) ? prevIndex : NaN;
};


// TODO: использовать эти методы в буфере для вычисления конца и размера
/**
 * @param {number} endIndex
 * @return {number}
 */
zb.ui.BaseListUtils.endToSize = endIndex => {
	if (!zb.ui.BaseListUtils.isValidIndex(endIndex) || isNaN(endIndex)) {
		return 0;
	}

	return endIndex + 1;
};


/**
 * @param {number} size
 * @return {number}
 */
zb.ui.BaseListUtils.sizeToEnd = size => {
	if (!zb.ui.BaseListUtils.isValidSize(size) || size === 0) {
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
zb.ui.BaseListUtils.Coords;
