goog.provide('zb.ui.widgets.Button');
goog.require('zb.device.input.Keys');
goog.require('zb.html');
goog.require('zb.widgets.InlineWidget');


/**
 */
zb.ui.widgets.Button = class extends zb.widgets.InlineWidget {
	/**
	 * @param {(HTMLElement|*)=} opt_container
	 * @param {*=} opt_data
	 */
	constructor(opt_container, opt_data) {
		let container = opt_container;
		let data = opt_data;

		if (typeof opt_container === 'undefined') {
			container = zb.html.div();
		} else if (!(opt_container instanceof HTMLElement)) {
			container = zb.html.div();
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

		if (zbKey === zb.device.input.Keys.ENTER) {
			this._fireEvent(this.EVENT_CLICK, this._data);
			isHandled = true;
		}

		return isHandled;
	}
};


/**
 * @type {*}
 * @protected
 */
zb.ui.widgets.Button.prototype._data;


/**
 * Fired with: data {*}
 * @type {string}
 */
zb.ui.widgets.Button.prototype.EVENT_CLICK = 'click';
