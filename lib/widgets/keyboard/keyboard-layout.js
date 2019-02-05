goog.provide('zb.ui.widgets.KeyboardLayout');
goog.require('zb.ui.widgets.Button');
goog.require('zb.widgets.InlineWidget');


/**
 */
zb.ui.widgets.KeyboardLayout = class extends zb.widgets.InlineWidget {
	/**
	 * @param {HTMLElement} container
	 * @param {zb.ui.widgets.KeyboardLayout.Input} params
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
	 * @param {zb.ui.widgets.KeyboardLayout.Type} type
	 * @param {zb.ui.widgets.KeyboardLayout.Lang=} opt_lang
	 * @return {boolean}
	 */
	isEquals(type, opt_lang) {
		const isTypeEquals = this._type === type;
		const isLangEquals = !this._lang || !opt_lang || (this._lang === opt_lang);

		return isTypeEquals && isLangEquals;
	}

	/**
	 * @return {zb.ui.widgets.KeyboardLayout.Type}
	 */
	getType() {
		return this._type;
	}

	/**
	 * @return {zb.ui.widgets.KeyboardLayout.Lang|undefined}
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

		const item = new zb.ui.widgets.Button(container, action || symbol);
		this.appendWidget(item);

		item.on(item.EVENT_CLICK, this._fireEventClick);

		this._items.push(item);
	}

	/**
	 * @param {string} eventName
	 * @param {zb.ui.widgets.KeyboardLayout.Data} data
	 * @protected
	 */
	_fireEventClick(eventName, data) {
		this._fireEvent(this.EVENT_CLICK, data);
	}
};


/**
 * @type {Array<zb.ui.widgets.Button>}
 * @protected
 */
zb.ui.widgets.KeyboardLayout.prototype._items;


/**
 * @type {zb.ui.widgets.KeyboardLayout.Type}
 * @protected
 */
zb.ui.widgets.KeyboardLayout.prototype._type;


/**
 * @type {zb.ui.widgets.KeyboardLayout.Lang|undefined}
 * @protected
 */
zb.ui.widgets.KeyboardLayout.prototype._lang;


/**
 * Fired with: {zb.ui.widgets.KeyboardLayout.Data} data
 * @const {string}
 */
zb.ui.widgets.KeyboardLayout.prototype.EVENT_CLICK = 'click';


/**
 * @typedef {string}
 */
zb.ui.widgets.KeyboardLayout.Type;


/**
 * @typedef {string}
 */
zb.ui.widgets.KeyboardLayout.Lang;


/**
 * @typedef {string}
 */
zb.ui.widgets.KeyboardLayout.Action;


/**
 * @typedef {string|zb.ui.widgets.KeyboardLayout.Action}
 */
zb.ui.widgets.KeyboardLayout.Data;


/**
 * @typedef {{
 *     type: zb.ui.widgets.KeyboardLayout.Type,
 *     lang: (zb.ui.widgets.KeyboardLayout.Lang|undefined)
 * }}
 */
zb.ui.widgets.KeyboardLayout.Input;
