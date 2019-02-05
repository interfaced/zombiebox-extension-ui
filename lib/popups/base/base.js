goog.provide('zb.ui.popups.Base');
goog.require('zb.device.input.Keys');
goog.require('zb.layers.CutePopup');


zb.ui.popups.Base = class extends zb.layers.CutePopup {
	/**
	 * @override
	 */
	constructor() {
		super();

		this.on(this.EVENT_CLOSE, this._onClose.bind(this));
	}


	/**
	 * @param {zb.ui.popups.Base.StatusHandler=} opt_statusHandler
	 * @return {IThenable.<*>}
	 */
	toPromise(opt_statusHandler) {
		return new Promise((resolve, reject) => {
			this.once(this.EVENT_CLOSE, (eventName, status) => {
				if (opt_statusHandler) {
					opt_statusHandler(status, resolve, reject);
				} else {
					this._statusHandler(status, resolve, reject);
				}
			});
		});
	}


	/**
	 * @override
	 */
	_processKey(zbKey, e) {
		if (zbKey === zb.device.input.Keys.BACK) {
			this.close(zb.ui.popups.Base.Status.CANCELLED);
			return true;
		}

		return super._processKey(zbKey, e);
	}


	/**
	 * @param {string} eventName
	 * @param {*} status
	 * @protected
	 */
	_onClose(eventName, status) {
		// Do nothing. Method for overwrite
	}


	/**
	 * @param {*} status
	 * @param {function(*)} resolve
	 * @param {function(*)} reject
	 * @protected
	 */
	_statusHandler(status, resolve, reject) {
		switch (status) {
			case zb.ui.popups.Base.Status.FAILED:
			case zb.ui.popups.Base.Status.CANCELLED:
				reject(status);
				break;
			default:
				resolve(status);
				break;
		}
	}
};


/**
 * @enum {string}
 */
zb.ui.popups.Base.Status = {
	SUCCEEDED: 'succeeded',
	FAILED: 'failed',
	CANCELLED: 'cancelled'
};


/**
 * @typedef {function(*, function(*), function(*))}
 */
zb.ui.popups.Base.StatusHandler;
