/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2012-2020, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import InputKey from 'zb/device/input/key';
import IWidget from 'zb/widgets/interfaces/i-widget';


/**
 * @interface
 * @extends {IWidget}
 */
export default class IHelpBarItem {
	/**
	 * @param {InputKey} zbKey
	 * @param {KeyboardEvent|WheelEvent=} event
	 * @return {boolean}
	 */
	processHelpBarKey(zbKey, event) {}

	/**
	 * Checks should this item handle zbKey
	 * @param {InputKey} zbKey
	 * @return {boolean}
	 */
	hasKey(zbKey) {}

	/**
	 * @param {Array<InputKey>} keys
	 */
	setKeys(keys) {}

	/**
	 * @return {Array<InputKey>}
	 */
	getKeys() {}

	/**
	 * @param {string} label
	 */
	setLabel(label) {}
}


/**
 * Fired with {InputKey, IWidget}
 * @const {string}
 */
IHelpBarItem.prototype.EVENT_CLICK;
