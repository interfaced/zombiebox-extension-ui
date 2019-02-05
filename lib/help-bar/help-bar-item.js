goog.provide('zb.ui.HelpBarItem');
goog.require('zb.device.input.Keys');
goog.require('zb.html');
goog.require('zb.ui.IHelpBarItem');
goog.require('zb.ui.templates.helpBarItem.HelpBarItemOut');
goog.require('zb.ui.templates.helpBarItem.helpBarItem');
goog.require('zb.widgets.Widget');


/**
 * @implements {zb.ui.IHelpBarItem}
 */
zb.ui.HelpBarItem = class extends zb.widgets.Widget {
	/**
	 * @param {zb.ui.HelpBarItem.Options} options
	 */
	constructor(options) {
		super();

		this._exported = this._renderTemplate(options);
		this.setContainer(zb.html.findFirstElementNode(this._exported.root));

		this.setKeys(options.keys);
	}

	/**
	 * @override
	 */
	processHelpBarKey(zbKey, e) {
		return this._handleKey(this.hasKey(zbKey), zbKey);
	}

	/**
	 * @override
	 */
	hasKey(zbKey) {
		return this._keys.indexOf(zbKey) !== -1;
	}

	/**
	 * @param {Array.<zb.device.input.Keys>} keys
	 */
	setKeys(keys) {
		this._keys = keys;
	}

	/**
	 * @return {Array.<zb.device.input.Keys>}
	 */
	getKeys() {
		return this._keys;
	}

	/**
	 * @param {string} label
	 */
	setLabel(label) {
		zb.html.text(this._exported.label, label);
	}

	/**
	 * @override
	 */
	_processKey(zbKey, e) {
		return this._handleKey(zbKey === zb.device.input.Keys.ENTER, zbKey);
	}

	/**
	 * @param {zb.ui.HelpBarItem.Options} options
	 * @return {zb.ui.templates.helpBarItem.HelpBarItemOut}
	 * @protected
	 */
	_renderTemplate(options) {
		return zb.ui.templates.helpBarItem.helpBarItem({
			label: options.label,
			cssClass: options.cssClass
		});
	}

	/**
	 * @param {boolean} isHandled
	 * @param {zb.device.input.Keys} zbKey
	 * @return {boolean}
	 * @protected
	 */
	_handleKey(isHandled, zbKey) {
		if (this.isFocusable() && isHandled) {
			this._fireEvent(this.EVENT_CLICK, zbKey, this);
			return true;
		}
		return false;
	}
};


/**
 * @type {zb.ui.templates.helpBarItem.HelpBarItemOut}
 * @protected
 */
zb.ui.HelpBarItem.prototype._exported;


/**
 * @type {Array.<zb.device.input.Keys>}
 * @protected
 */
zb.ui.HelpBarItem.prototype._keys;


/**
 * Fired with: {zb.device.input.Keys} zbKey, {zb.ui.HelpBarItem} item
 * @const {string}
 */
zb.ui.HelpBarItem.prototype.EVENT_CLICK = 'click';


/**
 * @typedef {{
 *     label: string,
 *     keys: Array.<zb.device.input.Keys>,
 *     cssClass: string
 * }}
 */
zb.ui.HelpBarItem.Options;
