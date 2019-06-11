import InlineWidget from 'zb/widgets/inline-widget';
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
	 * @param {Lang=} opt_lang
	 * @return {boolean}
	 */
	isEquals(type, opt_lang) {
		const isTypeEquals = this._type === type;
		const isLangEquals = !this._lang || !opt_lang || (this._lang === opt_lang);

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
