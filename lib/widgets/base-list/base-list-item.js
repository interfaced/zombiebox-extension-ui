import {text, div} from 'zb/html';
import IBaseListItem, {Input as IBaseListItemInput} from './i-base-list-item';


/**
 * @implements {IBaseListItem}
 */
export default class BaseListItem {
	/**
	 * @param {IBaseListItemInput} params
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
		// Do nothing, yet
	}

	/**
	 * @override
	 */
	afterDOMShow() {
		// Do nothing, yet
	}

	/**
	 * @override
	 */
	beforeDOMHide() {
		// Do nothing, yet
	}

	/**
	 * @override
	 */
	afterDOMHide() {
		// Do nothing, yet
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
		this._container = div('w-zbui-base-list-item');
		this._renderData();
	}

	/**
	 * @protected
	 */
	_renderData() {
		const data = this._data === null ? '' : String(this._data);
		text(this._container, data);
	}
}


/**
 * @type {HTMLElement}
 * @protected
 */
BaseListItem.prototype._container;


/**
 * @type {*}
 * @protected
 */
BaseListItem.prototype._data;


/**
 * @type {string}
 * @protected
 */
BaseListItem.prototype._focusClass;


/**
 * @type {boolean}
 * @protected
 */
BaseListItem.prototype._isFocused;
