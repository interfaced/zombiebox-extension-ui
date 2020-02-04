/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2012-2020, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import AbstractCuteWidget from 'cutejs/widgets/abstract-widget';
import {updateClassName} from 'zb/html';
import IInputWidget from '../input/i-input-widget';
import KeyboardLayout, {
	Data as KeyboardLayoutData,
	Type as KeyboardLayoutType,
	Lang as KeyboardLayoutLang,
	Action as KeyboardLayoutAction
} from './keyboard-layout';


/**
 * @abstract
 */
export default class AbstractKeyboard extends AbstractCuteWidget {
	/**
	 * @param {Input=} params
	 */
	constructor(params) {
		super();

		/**
		 * @type {IInputWidget}
		 * @protected
		 */
		this._input;

		/**
		 * @type {boolean}
		 * @protected
		 */
		this._isCaps;

		/**
		 * @type {Array<KeyboardLayout>}
		 * @protected
		 */
		this._layouts;

		/**
		 * @type {KeyboardLayout}
		 * @protected
		 */
		this._layout;

		this._container.classList.add('w-zbui-abstract-keyboard');

		this._layouts = [];

		this.setInput((params && params.input) || null);
		this.setCaps((params && params.isCaps) || false);
	}

	/**
	 * @param {?IInputWidget} input
	 */
	setInput(input) {
		this._input = input;
	}

	/**
	 * @param {KeyboardLayoutType} type
	 */
	setType(type) {
		this.setOptions(type, this._layout.getLang());
	}

	/**
	 * @param {KeyboardLayoutLang=} lang
	 */
	setLang(lang) {
		this.setOptions(this._layout.getType(), lang);
	}

	/**
	 * @param {KeyboardLayoutType} type
	 * @param {KeyboardLayoutLang=} lang
	 */
	setOptions(type, lang) {
		const layout = this._getLayout(type, lang);

		if (layout) {
			this._setLayout(layout);
		}
	}

	/**
	 * @param {boolean} isCaps
	 */
	setCaps(isCaps) {
		this._isCaps = isCaps;
		updateClassName(this._container, '_caps', this._isCaps);
	}

	/**
	 * @param {KeyboardLayout} layout
	 * @param {Array<HTMLElement>} items
	 * @protected
	 */
	_addLayout(layout, items) {
		layout.setItems(items);
		layout.on(layout.EVENT_CLICK, this._onItemClicked.bind(this));

		this._layouts.push(layout);
	}

	/**
	 * @param {KeyboardLayout} layout
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
	 * @param {KeyboardLayoutType} type
	 * @param {KeyboardLayoutLang=} lang
	 * @return {KeyboardLayout|undefined}
	 * @protected
	 */
	_getLayout(type, lang) {
		return this._layouts.filter((layout) => layout.isEquals(type, lang))[0];
	}

	/**
	 * @param {string} eventName
	 * @param {KeyboardLayoutData} data
	 * @protected
	 */
	_onItemClicked(eventName, data) {
		if (!this._handleClick(data)) {
			this._setSymbol(data);
		}
	}

	/**
	 * @param {KeyboardLayoutData} data
	 * @return {boolean}
	 * @protected
	 */
	_handleClick(data) {
		switch (data) {
			case Action.MOVE_CARET_LEFT:
				if (this._input) {
					this._input.moveCaretLeft();
				}
				return true;
			case Action.MOVE_CARET_RIGHT:
				if (this._input) {
					this._input.moveCaretRight();
				}
				return true;
			case Action.DELETE_BEFORE_CARET:
				if (this._input) {
					this._input.backspace();
				}
				return true;
			case Action.TOGGLE_CAPS:
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
}


/**
 * @enum {KeyboardLayoutAction}
 */
export const Action = {
	MOVE_CARET_LEFT: 'move-caret-left',
	MOVE_CARET_RIGHT: 'move-caret-right',
	DELETE_BEFORE_CARET: 'delete-before-caret',
	TOGGLE_CAPS: 'toggle-caps'
};


/**
 * @typedef {{
 *     input: (IInputWidget|undefined),
 *     isCaps: (boolean|undefined)
 * }}
 */
export let Input;
