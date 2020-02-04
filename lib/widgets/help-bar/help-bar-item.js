/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2012-2020, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as template from 'generated/cutejs/ui/widgets/help-bar/help-bar-item.jst';
import {text, findFirstElementNode} from 'zb/html';
import InputKey from 'zb/device/input/key';
import Widget from 'zb/widgets/widget';
import IHelpBarItem from './i-help-bar-item';


/**
 * @implements {IHelpBarItem}
 */
export default class HelpBarItem extends Widget {
	/**
	 * @param {Options} options
	 */
	constructor(options) {
		super();

		this._exported = this._renderTemplate(options);
		this.setContainer(findFirstElementNode(this._exported.root));

		this.setKeys(options.keys);
	}

	/**
	 * @override
	 */
	processHelpBarKey(zbKey, e) {
		return this._handleKey(this.hasKey(zbKey), zbKey);
	}

	/**
	 * @override
	 */
	hasKey(zbKey) {
		return this._keys.indexOf(zbKey) !== -1;
	}

	/**
	 * @param {Array<InputKey>} keys
	 */
	setKeys(keys) {
		this._keys = keys;
	}

	/**
	 * @return {Array<InputKey>}
	 */
	getKeys() {
		return this._keys;
	}

	/**
	 * @param {string} label
	 */
	setLabel(label) {
		text(this._exported.label, label);
	}

	/**
	 * @override
	 */
	_processKey(zbKey, e) {
		return this._handleKey(zbKey === InputKey.ENTER, zbKey);
	}

	/**
	 * @param {Options} options
	 * @return {template.Out}
	 * @protected
	 */
	_renderTemplate(options) {
		return template.render({
			label: options.label,
			cssClass: options.cssClass
		});
	}

	/**
	 * @param {boolean} isHandled
	 * @param {InputKey} zbKey
	 * @return {boolean}
	 * @protected
	 */
	_handleKey(isHandled, zbKey) {
		if (this.isFocusable() && isHandled) {
			this._fireEvent(this.EVENT_CLICK, zbKey, this);
			return true;
		}
		return false;
	}
}


/**
 * @type {template.Out}
 * @protected
 */
HelpBarItem.prototype._exported;


/**
 * @type {Array<InputKey>}
 * @protected
 */
HelpBarItem.prototype._keys;


/**
 * Fired with: {InputKey} zbKey, {HelpBarItem} item
 * @const {string}
 */
HelpBarItem.prototype.EVENT_CLICK = 'click';


/**
 * @typedef {{
 *     label: string,
 *     keys: Array<InputKey>,
 *     cssClass: string
 * }}
 */
export let Options;
