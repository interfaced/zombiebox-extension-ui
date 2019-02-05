goog.provide('zb.ui.popups.AbstractBase');
goog.require('zb.device.input.Keys');
goog.require('zb.layers.CutePopup');


/**
 * @abstract
 */
zb.ui.popups.AbstractBase = class extends zb.layers.CutePopup {
	/**
	 * @param {zb.ui.popups.AbstractBase.StatusHandler=} opt_statusHandler
	 * @return {IThenable<*>}
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
			this.close(zb.ui.popups.AbstractBase.Status.CANCELLED);
			return true;
		}

		return super._processKey(zbKey, e);
	}

	/**
	 * @param {*} status
	 * @param {function(*)} resolve
	 * @param {function(*)} reject
	 * @protected
	 */
	_statusHandler(status, resolve, reject) {
		switch (status) {
			case zb.ui.popups.AbstractBase.Status.FAILED:
			case zb.ui.popups.AbstractBase.Status.CANCELLED:
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
zb.ui.popups.AbstractBase.Status = {
	SUCCEEDED: 'succeeded',
	FAILED: 'failed',
	CANCELLED: 'cancelled'
};


/**
 * @typedef {function(*, function(*), function(*))}
 */
zb.ui.popups.AbstractBase.StatusHandler;
