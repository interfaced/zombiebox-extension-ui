# Виджет Throbber

## Сценарии использования

### Глобальный троббер по центру экрана

Сам по себе `Throbber` не имеет функции центрирования. Это нужно делать на уровне наследника или используя агрегатор.
Наиболее удобным является второй вариант. Минимальный код для его реализации представлен ниже.

#### javascript:

```javascript
import {show, hide} from 'zb/html';
import Throbber from 'ui/widgets/throbber';



/**
 * @constructor
 * @extends {BaseApplication}
 */
class Application extends BaseApplication {
	constructor() {
		super();

		this._throbber = null;
	}


	/**
	 * @param {Promise} job
	 */
	addThrobberJob(job) {
		if (this._throbber) {
			this._throbber.wait(job);
		}
	}


	/**
	 * @override
	 */
	_onDeviceReady(eventName, device) {
		super._onDeviceReady(eventName, device);

		this._createThrobber();
	}


	/**
	 * @protected
	 */
	_createThrobber() {
		const throbber = new Throbber;
	
		const throbberContainer = div('a-throbber zb-fullscreen');
		throbberContainer.appendChild(this._throbber.getContainer());
		this._body.appendChild(throbberContainer);
		
		this._throbber.on(this._throbber.EVENT_START, () => {
			show(throbberContainer);
		});
		this._throbber.on(this._throbber.EVENT_STOP, () => {
			hide(throbberContainer);
		});
	}
};


/**
 * @type {?Throbber}
 * @protected
 */
Application.prototype._throbber;
```

#### CSS:

```css
.a-throbber {
	background-color: rgba(0, 0, 0, .5);
	display: none;
	z-index: 100;
}
	.a-throbber .w-zbui-throbber {
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -44px;
		margin-left: -44px;
	}
```
