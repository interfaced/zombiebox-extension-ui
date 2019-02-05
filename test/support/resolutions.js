goog.provide('zb.device.Resolution');


/**
 * @enum
 */
zb.device.Resolution = {
	PAL: 0,
	QHD: 1,
	HD: 2,
	FULL_HD: 3
};


/**
 * @typedef {{
 *     name: string,
 *     width: number,
 *     height: number
 * }}
 */
zb.device.ResolutionInfoItem;


/**
 * @type {Object.<zb.device.Resolution,zb.device.ResolutionInfoItem>}
 */
zb.device.ResolutionInfo = {};

zb.device.ResolutionInfo[zb.device.Resolution.PAL] = {
	name: 'pal',
	width: 768,
	height: 576
};

zb.device.ResolutionInfo[zb.device.Resolution.QHD] = {
	name: 'qhd',
	width: 960,
	height: 540
};

zb.device.ResolutionInfo[zb.device.Resolution.HD] = {
	name: 'hd',
	width: 1280,
	height: 720
};

zb.device.ResolutionInfo[zb.device.Resolution.FULL_HD] = {
	name: 'full-hd',
	width: 1920,
	height: 1080
};
