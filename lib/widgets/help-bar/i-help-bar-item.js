import InputKeys from 'zb/device/input/keys';
import IWidget from 'zb/widgets/interfaces/i-widget';


/**
 * @interface
 * @extends {IWidget}
 */
export default class IHelpBarItem {
	/**
	 * @param {InputKeys} zbKey
	 * @param {KeyboardEvent|WheelEvent=} event
	 * @return {boolean}
	 */
	processHelpBarKey(zbKey, event) {}

	/**
	 * Checks should this item handle zbKey
	 * @param {InputKeys} zbKey
	 * @return {boolean}
	 */
	hasKey(zbKey) {}

	/**
	 * @param {Array<InputKeys>} keys
	 */
	setKeys(keys) {}

	/**
	 * @return {Array<InputKeys>}
	 */
	getKeys() {}

	/**
	 * @param {string} label
	 */
	setLabel(label) {}
}


/**
 * Fired with {InputKeys, IWidget}
 * @const {string}
 */
IHelpBarItem.prototype.EVENT_CLICK;
