goog.provide('zb.ui.BaseListItem');
goog.require('zb.html');
goog.require('zb.ui.IBaseListItem');


/**
 * @implements {zb.ui.IBaseListItem}
 */
zb.ui.BaseListItem = class {
	/**
	 * @param {zb.ui.IBaseListItem.Input} params
	 */
	constructor(params) {
		const data = (typeof params.data === 'undefined') ? null : params.data;
		this._setData(data);

		this._createContainer();

		this._focusClass = '_active';
		this._isFocused = false;
	}

	/**
	 * @override
	 */
	beforeDOMShow() {
		// do nothing, yet
	}

	/**
	 * @override
	 */
	afterDOMShow() {
		// do nothing, yet
	}

	/**
	 * @override
	 */
	beforeDOMHide() {
		// do nothing, yet
	}

	/**
	 * @override
	 */
	afterDOMHide() {
		// do nothing, yet
	}

	/**
	 * @override
	 */
	focus() {
		this._container.classList.add(this._focusClass);
		this._isFocused = true;
	}

	/**
	 * @override
	 */
	blur() {
		this._container.classList.remove(this._focusClass);
		this._isFocused = false;
	}

	/**
	 * @override
	 */
	isFocused() {
		return this._isFocused;
	}

	/**
	 * @override
	 */
	setData(data) {
		this._setData(data);
		this._renderData();
	}

	/**
	 * @override
	 */
	getData() {
		return this._data;
	}

	/**
	 * @override
	 */
	getContainer() {
		return this._container;
	}

	/**
	 * @param {*} data
	 * @protected
	 */
	_setData(data) {
		this._data = data;
	}

	/**
	 * @protected
	 */
	_createContainer() {
		this._container = zb.html.div('w-base-list-item');
		this._renderData();
	}

	/**
	 * @protected
	 */
	_renderData() {
		const data = this._data === null ? '' : String(this._data);
		zb.html.text(this._container, data);
	}
};


/**
 * @type {HTMLElement}
 * @protected
 */
zb.ui.BaseListItem.prototype._container;


/**
 * @type {*}
 * @protected
 */
zb.ui.BaseListItem.prototype._data;


/**
 * @type {string}
 * @protected
 */
zb.ui.BaseListItem.prototype._focusClass;


/**
 * @type {boolean}
 * @protected
 */
zb.ui.BaseListItem.prototype._isFocused;
