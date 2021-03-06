/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2012-2020, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import InlineWidget from 'cutejs/widgets/inline-widget';
import Button from '../button/button';


/**
 */
export default class KeyboardLayout extends InlineWidget {
	/**
	 * @param {HTMLElement} container
	 * @param {Input} params
	 */
	constructor(container, params) {
		super(container);

		this._items = [];

		this._type = params.type;
		this._lang = params.lang;

		this._fireEventClick = this._fireEventClick.bind(this);
	}

	/**
	 * @param {Array<HTMLElement>} containers
	 */
	setItems(containers) {
		containers.forEach(this._addWidget.bind(this));
	}

	/**
	 * @param {Type} type
	 * @param {Lang=} lang
	 * @return {boolean}
	 */
	isEquals(type, lang) {
		const isTypeEquals = this._type === type;
		const isLangEquals = !this._lang || !lang || (this._lang === lang);

		return isTypeEquals && isLangEquals;
	}

	/**
	 * @return {Type}
	 */
	getType() {
		return this._type;
	}

	/**
	 * @return {Lang|undefined}
	 */
	getLang() {
		return this._lang;
	}

	/**
	 * @param {HTMLElement} container
	 * @protected
	 */
	_addWidget(container) {
		const action = container.getAttribute('data-keyboard-action');
		const symbol = container.getAttribute('data-keyboard-symbol') || container.textContent;

		const item = new Button(container, action || symbol);
		this.appendWidget(item);

		item.on(item.EVENT_CLICK, this._fireEventClick);

		this._items.push(item);
	}

	/**
	 * @param {string} eventName
	 * @param {Data} data
	 * @protected
	 */
	_fireEventClick(eventName, data) {
		this._fireEvent(this.EVENT_CLICK, data);
	}
}


/**
 * @type {Array<Button>}
 * @protected
 */
KeyboardLayout.prototype._items;


/**
 * @type {Type}
 * @protected
 */
KeyboardLayout.prototype._type;


/**
 * @type {Lang|undefined}
 * @protected
 */
KeyboardLayout.prototype._lang;


/**
 * Fired with: {Data} data
 * @const {string}
 */
KeyboardLayout.prototype.EVENT_CLICK = 'click';


/**
 * @typedef {string}
 */
export let Type;


/**
 * @typedef {string}
 */
export let Lang;


/**
 * @typedef {string}
 */
export let Action;


/**
 * @typedef {string|Action}
 */
export let Data;


/**
 * @typedef {{
 *     type: Type,
 *     lang: (Lang|undefined)
 * }}
 */
export let Input;
