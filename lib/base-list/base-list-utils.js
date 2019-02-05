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
zb.ui.BaseListUtils.getItemsByLines = function(line, lineSize) {
	return line * lineSize;
};


/**
 * @param {number} items
 * @param {number} lineSize
 * @return {number}
 */
zb.ui.BaseListUtils.getLinesByItems = function(items, lineSize) {
	return Math.ceil(items / lineSize);
};


/**
 * @param {number} index
 * @param {number} lineSize
 * @return {number}
 */
zb.ui.BaseListUtils.getLineByIndex = function(index, lineSize) {
	return Math.floor(index / lineSize);
};


/**
 * @param {number} index
 * @param {number} lineSize
 * @return {number}
 */
zb.ui.BaseListUtils.getLineStart = function(index, lineSize) {
	var line = zb.ui.BaseListUtils.getLineByIndex(index, lineSize);
	return zb.ui.BaseListUtils.getItemsByLines(line, lineSize);
};


/**
 * @param {number} index
 * @param {number} lineSize
 * @return {number}
 */
zb.ui.BaseListUtils.getLineEnd = function(index, lineSize) {
	var lineStart = zb.ui.BaseListUtils.getLineStart(index, lineSize);
	return lineStart + lineSize - 1;
};


/**
 * @param {number} index
 * @param {number} lineSize
 * @return {zb.ui.BaseListUtils.Coords}
 */
zb.ui.BaseListUtils.getCoordsByIndex = function(index, lineSize) {
	var coordsLine = zb.ui.BaseListUtils.getLineByIndex(index, lineSize);
	var coordsLineItems = zb.ui.BaseListUtils.getItemsByLines(coordsLine, lineSize);
	var coordsIndex = index - coordsLineItems;

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
zb.ui.BaseListUtils.getIndexByCoords = function(line, index, lineSize) {
	var lineItems = zb.ui.BaseListUtils.getItemsByLines(line, lineSize);
	return lineItems + index;
};


/**
 * @param {number} index
 * @return {boolean}
 */
zb.ui.BaseListUtils.isValidIndex = function(index) {
	return index >= 0 || isNaN(index);
};


/**
 * @param {number} size
 * @return {boolean}
 */
zb.ui.BaseListUtils.isValidSize = function(size) {
	return size >= 0;
};


/**
 * @param {number} currIndex
 * @param {number} lineSize
 * @return {number}
 */
zb.ui.BaseListUtils.getNextLine = function(currIndex, lineSize) {
	var coords = zb.ui.BaseListUtils.getCoordsByIndex(currIndex, lineSize);
	return zb.ui.BaseListUtils.getIndexByCoords(coords.line + 1, coords.index, lineSize);
};


/**
 * @param {number} currIndex
 * @param {number} lineSize
 * @return {number}
 */
zb.ui.BaseListUtils.getPrevLine = function(currIndex, lineSize) {
	var coords = zb.ui.BaseListUtils.getCoordsByIndex(currIndex, lineSize);
	return zb.ui.BaseListUtils.getIndexByCoords(coords.line - 1, coords.index, lineSize);
};


/**
 * @param {number} currIndex
 * @return {number}
 */
zb.ui.BaseListUtils.getNextIndex = function(currIndex) {
	var nextIndex = currIndex + 1;
	return zb.ui.BaseListUtils.isValidIndex(nextIndex) ? nextIndex : NaN;
};


/**
 * @param {number} currIndex
 * @return {number}
 */
zb.ui.BaseListUtils.getPrevIndex = function(currIndex) {
	var prevIndex = currIndex - 1;
	return zb.ui.BaseListUtils.isValidIndex(prevIndex) ? prevIndex : NaN;
};


// TODO: использовать эти методы в буфере для вычисления конца и размера
/**
 * @param {number} endIndex
 * @return {number}
 */
zb.ui.BaseListUtils.endToSize = function(endIndex) {
	if (!zb.ui.BaseListUtils.isValidIndex(endIndex) || isNaN(endIndex)) {
		return 0;
	}

	return endIndex + 1;
};


/**
 * @param {number} size
 * @return {number}
 */
zb.ui.BaseListUtils.sizeToEnd = function(size) {
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
