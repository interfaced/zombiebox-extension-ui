goog.provide('zb.ui.widgets.IHelpBarItem');
goog.require('zb.device.input.Keys');
goog.require('zb.widgets.IWidget');


/**
 * @interface
 * @extends {zb.widgets.IWidget}
 */
zb.ui.widgets.IHelpBarItem = class {
	/**
	 * @param {zb.device.input.Keys} zbKey
	 * @param {KeyboardEvent|WheelEvent=} opt_event
	 * @return {boolean}
	 */
	processHelpBarKey(zbKey, opt_event) {}

	/**
	 * Checks should this item handle zbKey
	 * @param {zb.device.input.Keys} zbKey
	 * @return {boolean}
	 */
	hasKey(zbKey) {}

	/**
	 * @param {Array<zb.device.input.Keys>} keys
	 */
	setKeys(keys) {}

	/**
	 * @return {Array<zb.device.input.Keys>}
	 */
	getKeys() {}

	/**
	 * @param {string} label
	 */
	setLabel(label) {}
};


/**
 * Fired with {zb.device.input.Keys, zb.widgets.IWidget}
 * @const {string}
 */
zb.ui.widgets.IHelpBarItem.prototype.EVENT_CLICK;
