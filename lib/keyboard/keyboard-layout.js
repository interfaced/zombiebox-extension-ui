goog.provide('zb.ui.KeyboardLayout');
goog.require('zb.ui.Button');
goog.require('zb.widgets.InlineWidget');


zb.ui.KeyboardLayout = class extends zb.widgets.InlineWidget {
	/**
	 * @param {HTMLElement} container
	 * @param {zb.ui.KeyboardLayout.Input} params
	 */
	constructor(container, params) {
		super(container);

		this._items = [];

		this._type = params.type;
		this._lang = params.lang;

		this._fireEventClick = this._fireEventClick.bind(this);
	}

	/**
	 * @param {Array.<HTMLElement>} containers
	 */
	setItems(containers) {
		containers.forEach(this._addWidget.bind(this));
	}

	/**
	 * @param {zb.ui.KeyboardLayout.Type} type
	 * @param {zb.ui.KeyboardLayout.Lang=} opt_lang
	 * @return {boolean}
	 */
	isEquals(type, opt_lang) {
		const isTypeEquals = this._type === type;
		const isLangEquals = !this._lang || !opt_lang || (this._lang === opt_lang);

		return isTypeEquals && isLangEquals;
	}

	/**
	 * @return {zb.ui.KeyboardLayout.Type}
	 */
	getType() {
		return this._type;
	}

	/**
	 * @return {zb.ui.KeyboardLayout.Lang|undefined}
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

		const item = new zb.ui.Button(container, action || symbol);
		this.appendWidget(item);

		item.on(item.EVENT_CLICK, this._fireEventClick);

		this._items.push(item);
	}

	/**
	 * @param {string} eventName
	 * @param {zb.ui.KeyboardLayout.Data} data
	 * @protected
	 */
	_fireEventClick(eventName, data) {
		this._fireEvent(this.EVENT_CLICK, data);
	}
};


/**
 * @type {Array.<zb.ui.Button>}
 * @protected
 */
zb.ui.KeyboardLayout.prototype._items;


/**
 * @type {zb.ui.KeyboardLayout.Type}
 * @protected
 */
zb.ui.KeyboardLayout.prototype._type;


/**
 * @type {zb.ui.KeyboardLayout.Lang|undefined}
 * @protected
 */
zb.ui.KeyboardLayout.prototype._lang;


/**
 * Fired with: {zb.ui.KeyboardLayout.Data} data
 * @const {string}
 */
zb.ui.KeyboardLayout.prototype.EVENT_CLICK = 'click';


/**
 * @typedef {string}
 */
zb.ui.KeyboardLayout.Type;


/**
 * @typedef {string}
 */
zb.ui.KeyboardLayout.Lang;


/**
 * @typedef {string}
 */
zb.ui.KeyboardLayout.Action;


/**
 * @typedef {string|zb.ui.KeyboardLayout.Action}
 */
zb.ui.KeyboardLayout.Data;


/**
 * @typedef {{
 *     type: zb.ui.KeyboardLayout.Type,
 *     lang: (zb.ui.KeyboardLayout.Lang|undefined)
 * }}
 */
zb.ui.KeyboardLayout.Input;
