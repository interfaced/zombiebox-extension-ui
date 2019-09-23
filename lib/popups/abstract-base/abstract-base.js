import AbstractCutePopup from 'cutejs/layers/abstract-popup';
import InputKeys from 'zb/device/input/keys';


/**
 * @abstract
 */
export default class AbstractBase extends AbstractCutePopup {
	/**
	 * @param {StatusHandler=} statusHandler
	 * @return {Promise<*>}
	 */
	toPromise(statusHandler) {
		return new Promise((resolve, reject) => {
			this.once(this.EVENT_CLOSE, (eventName, status) => {
				if (statusHandler) {
					statusHandler(status, resolve, reject);
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
		if (zbKey === InputKeys.BACK) {
			this.close(Status.CANCELLED);
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
			case Status.FAILED:
			case Status.CANCELLED:
				reject(status);
				break;
			default:
				resolve(status);
				break;
		}
	}
}


/**
 * @enum {string}
 */
export const Status = {
	SUCCEEDED: 'succeeded',
	FAILED: 'failed',
	CANCELLED: 'cancelled'
};


/**
 * @typedef {function(*, function(*), function(*))}
 */
export let StatusHandler;
