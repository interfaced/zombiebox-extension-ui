goog.provide('zb.ui.widgets.AbstractKeyboard');
goog.require('zb.html');
goog.require('zb.ui.widgets.IInputWidget');
goog.require('zb.ui.widgets.KeyboardLayout');
goog.require('zb.widgets.CuteWidget');


/**
 * @abstract
 */
zb.ui.widgets.AbstractKeyboard = class extends zb.widgets.CuteWidget {
	/**
	 * @param {zb.ui.widgets.AbstractKeyboard.Input=} opt_params
	 */
	constructor(opt_params) {
		super();

		this._container.classList.add('w-zbui-abstract-keyboard');

		this._layouts = [];

		this.setInput((opt_params && opt_params.input) || null);
		this.setCaps((opt_params && opt_params.isCaps) || false);
	}

	/**
	 * @param {?zb.ui.widgets.IInputWidget} input
	 */
	setInput(input) {
		this._input = input;
	}

	/**
	 * @param {zb.ui.widgets.KeyboardLayout.Type} type
	 */
	setType(type) {
		this.setOptions(type, this._layout.getLang());
	}

	/**
	 * @param {zb.ui.widgets.KeyboardLayout.Lang=} opt_lang
	 */
	setLang(opt_lang) {
		this.setOptions(this._layout.getType(), opt_lang);
	}

	/**
	 * @param {zb.ui.widgets.KeyboardLayout.Type} type
	 * @param {zb.ui.widgets.KeyboardLayout.Lang=} opt_lang
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
	 * @param {zb.ui.widgets.KeyboardLayout} layout
	 * @param {Array<HTMLElement>} items
	 * @protected
	 */
	_addLayout(layout, items) {
		layout.setItems(items);
		layout.on(layout.EVENT_CLICK, this._onItemClicked.bind(this));

		this._layouts.push(layout);
	}

	/**
	 * @param {zb.ui.widgets.KeyboardLayout} layout
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
	 * @param {zb.ui.widgets.KeyboardLayout.Type} type
	 * @param {zb.ui.widgets.KeyboardLayout.Lang=} opt_lang
	 * @return {zb.ui.widgets.KeyboardLayout|undefined}
	 * @protected
	 */
	_getLayout(type, opt_lang) {
		return this._layouts.filter((layout) => layout.isEquals(type, opt_lang))[0];
	}

	/**
	 * @param {string} eventName
	 * @param {zb.ui.widgets.KeyboardLayout.Data} data
	 * @protected
	 */
	_onItemClicked(eventName, data) {
		if (!this._handleClick(data)) {
			this._setSymbol(data);
		}
	}

	/**
	 * @param {zb.ui.widgets.KeyboardLayout.Data} data
	 * @return {boolean}
	 * @protected
	 */
	_handleClick(data) {
		const action = zb.ui.widgets.AbstractKeyboard.Action;

		switch (data) {
			case action.MOVE_CARET_LEFT:
				if (this._input) {
					this._input.moveCaretLeft();
				}
				return true;
			case action.MOVE_CARET_RIGHT:
				if (this._input) {
					this._input.moveCaretRight();
				}
				return true;
			case action.DELETE_BEFORE_CARET:
				if (this._input) {
					this._input.backspace();
				}
				return true;
			case action.TOGGLE_CAPS:
				this.setCaps(!this._isCaps);
				return true;
			default:
				return false;
		}
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
 * @type {zb.ui.widgets.IInputWidget}
 * @protected
 */
zb.ui.widgets.AbstractKeyboard.prototype._input;


/**
 * @type {boolean}
 * @protected
 */
zb.ui.widgets.AbstractKeyboard.prototype._isCaps;


/**
 * @type {Array<zb.ui.widgets.KeyboardLayout>}
 * @protected
 */
zb.ui.widgets.AbstractKeyboard.prototype._layouts;


/**
 * @type {zb.ui.widgets.KeyboardLayout}
 * @protected
 */
zb.ui.widgets.AbstractKeyboard.prototype._layout;


/**
 * @enum {zb.ui.widgets.KeyboardLayout.Action}
 */
zb.ui.widgets.AbstractKeyboard.Action = {
	MOVE_CARET_LEFT: 'move-caret-left',
	MOVE_CARET_RIGHT: 'move-caret-right',
	DELETE_BEFORE_CARET: 'delete-before-caret',
	TOGGLE_CAPS: 'toggle-caps'
};


/**
 * @typedef {{
 *     input: (zb.ui.widgets.IInputWidget|undefined),
 *     isCaps: (boolean|undefined)
 * }}
 */
zb.ui.widgets.AbstractKeyboard.Input;
