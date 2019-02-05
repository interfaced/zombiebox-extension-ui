goog.provide('zb.ui.Keyboard');
goog.require('zb.html');
goog.require('zb.ui.IInputWidget');
goog.require('zb.ui.KeyboardLayout');
goog.require('zb.widgets.CuteWidget');


/**
 * @abstract
 */
zb.ui.Keyboard = class extends zb.widgets.CuteWidget {
	/**
	 * @param {zb.ui.Keyboard.Input=} opt_params
	 */
	constructor(opt_params) {
		super();

		this._layouts = [];

		this.setInput((opt_params && opt_params.input) || null);
		this.setCaps((opt_params && opt_params.isCaps) || false);
	}


	/**
	 * @param {?zb.ui.IInputWidget} input
	 */
	setInput(input) {
		this._input = input;
	}


	/**
	 * @param {zb.ui.KeyboardLayout.Type} type
	 */
	setType(type) {
		this.setOptions(type, this._layout.getLang());
	}


	/**
	 * @param {zb.ui.KeyboardLayout.Lang=} opt_lang
	 */
	setLang(opt_lang) {
		this.setOptions(this._layout.getType(), opt_lang);
	}


	/**
	 * @param {zb.ui.KeyboardLayout.Type} type
	 * @param {zb.ui.KeyboardLayout.Lang=} opt_lang
	 */
	setOptions(type, opt_lang) {
		const layout = this._getLayout(type, opt_lang);

		if (layout) {
			this._setLayout(layout);
		}
	}


	/**
	 * @param {boolean} isCaps
	 */
	setCaps(isCaps) {
		this._isCaps = isCaps;
		zb.html.updateClassName(this._container, '_caps', this._isCaps);
	}


	/**
	 * @param {zb.ui.KeyboardLayout} layout
	 * @param {Array.<HTMLElement>} items
	 * @protected
	 */
	_addLayout(layout, items) {
		layout.setItems(items);
		layout.on(layout.EVENT_CLICK, this._onItemClicked.bind(this));

		this._layouts.push(layout);
	}


	/**
	 * @param {zb.ui.KeyboardLayout} layout
	 * @protected
	 */
	_setLayout(layout) {
		this._layout = layout;

		this._layouts.forEach((item) => {
			item.setVisible(item === layout);
		});

		this.activateWidget(layout);
	}


	/**
	 * @param {zb.ui.KeyboardLayout.Type} type
	 * @param {zb.ui.KeyboardLayout.Lang=} opt_lang
	 * @return {zb.ui.KeyboardLayout|undefined}
	 * @protected
	 */
	_getLayout(type, opt_lang) {
		return this._layouts.filter((layout) => layout.isEquals(type, opt_lang))[0];
	}


	/**
	 * @param {string} eventName
	 * @param {zb.ui.KeyboardLayout.Data} data
	 * @protected
	 */
	_onItemClicked(eventName, data) {
		this._handleClick(data) || this._setSymbol(data);
	}


	/**
	 * @param {zb.ui.KeyboardLayout.Data} data
	 * @return {boolean}
	 * @protected
	 */
	_handleClick(data) {
		return false;
	}


	/**
	 * @param {string} symbol
	 * @protected
	 */
	_setSymbol(symbol) {
		let convertedSymbol = symbol;

		if (this._isCaps) {
			convertedSymbol = symbol.toUpperCase();
		}

		if (this._input) {
			this._input.putStr(convertedSymbol);
		}
	}
};


/**
 * @type {zb.ui.IInputWidget}
 * @protected
 */
zb.ui.Keyboard.prototype._input;


/**
 * @type {boolean}
 * @protected
 */
zb.ui.Keyboard.prototype._isCaps;


/**
 * @type {Array.<zb.ui.KeyboardLayout>}
 * @protected
 */
zb.ui.Keyboard.prototype._layouts;


/**
 * @type {zb.ui.KeyboardLayout}
 * @protected
 */
zb.ui.Keyboard.prototype._layout;


/**
 * @typedef {{
 *     input: (zb.ui.IInputWidget|undefined),
 *     isCaps: (boolean|undefined)
 * }}
 */
zb.ui.Keyboard.Input;
