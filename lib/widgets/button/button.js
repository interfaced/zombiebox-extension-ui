import InlineWidget from 'cutejs/widgets/inline-widget';
import {div} from 'zb/html';
import InputKeys from 'zb/device/input/keys';


/**
 */
export default class Button extends InlineWidget {
	/**
	 * @param {(HTMLElement|*)=} opt_container
	 * @param {*=} opt_data
	 */
	constructor(opt_container, opt_data) {
		let container = opt_container;
		let data = opt_data;

		if (typeof opt_container === 'undefined') {
			container = div();
		} else if (!(opt_container instanceof HTMLElement)) {
			container = div();
			data = /** @type {*} */ (opt_container);
		}

		container.classList.add('w-zbui-button');

		super(/** @type {HTMLElement} */ (container));

		this.setData(data);
	}

	/**
	 * @param {*} data
	 */
	setData(data) {
		this._data = data;
	}

	/**
	 * @return {*}
	 */
	getData() {
		return this._data;
	}

	/**
	 * @param {function(string, *)} callback
	 */
	onClick(callback) {
		this.on(this.EVENT_CLICK, callback);
	}

	/**
	 * @param {function(string, *)} callback
	 */
	offClick(callback) {
		this.off(this.EVENT_CLICK, callback);
	}

	/**
	 * Handles user-controlled key event
	 * @override
	 */
	_processKey(zbKey, opt_e) {
		let isHandled = false;

		if (zbKey === InputKeys.ENTER) {
			this._fireEvent(this.EVENT_CLICK, this._data);
			isHandled = true;
		}

		return isHandled;
	}
}


/**
 * @type {*}
 * @protected
 */
Button.prototype._data;


/**
 * Fired with: data {*}
 * @type {string}
 */
Button.prototype.EVENT_CLICK = 'click';
