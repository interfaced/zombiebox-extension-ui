goog.provide('zb.ui.widgets.HelpBarItem');
goog.require('zb.device.input.Keys');
goog.require('zb.html');
goog.require('zb.ui.widgets.IHelpBarItem');
goog.require('zb.ui.widgets.templates.helpBarItem.HelpBarItemOut');
goog.require('zb.ui.widgets.templates.helpBarItem.helpBarItem');
goog.require('zb.widgets.Widget');


/**
 * @implements {zb.ui.widgets.IHelpBarItem}
 */
zb.ui.widgets.HelpBarItem = class extends zb.widgets.Widget {
	/**
	 * @param {zb.ui.widgets.HelpBarItem.Options} options
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
	 * @param {Array<zb.device.input.Keys>} keys
	 */
	setKeys(keys) {
		this._keys = keys;
	}

	/**
	 * @return {Array<zb.device.input.Keys>}
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
	 * @param {zb.ui.widgets.HelpBarItem.Options} options
	 * @return {zb.ui.widgets.templates.helpBarItem.HelpBarItemOut}
	 * @protected
	 */
	_renderTemplate(options) {
		return zb.ui.widgets.templates.helpBarItem.helpBarItem({
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
 * @type {zb.ui.widgets.templates.helpBarItem.HelpBarItemOut}
 * @protected
 */
zb.ui.widgets.HelpBarItem.prototype._exported;


/**
 * @type {Array<zb.device.input.Keys>}
 * @protected
 */
zb.ui.widgets.HelpBarItem.prototype._keys;


/**
 * Fired with: {zb.device.input.Keys} zbKey, {zb.ui.widgets.HelpBarItem} item
 * @const {string}
 */
zb.ui.widgets.HelpBarItem.prototype.EVENT_CLICK = 'click';


/**
 * @typedef {{
 *     label: string,
 *     keys: Array<zb.device.input.Keys>,
 *     cssClass: string
 * }}
 */
zb.ui.widgets.HelpBarItem.Options;
