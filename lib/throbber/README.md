# Виджет zb.ui.Throbber

## Сценарии использования

### Глобальный троббер по центру экрана

Сам по себе `zb.ui.Throbber` не имеет функции центрирования. Это нужно делать на уровне наследника или используя агрегатор.
Наиболее удобным является второй вариант. Минимальный код для его реализации представлен ниже.

#### javascript:

```javascript
goog.provide('some.Application');
goog.require('zb.html');
goog.require('zb.ui.Throbber');



/**
 * @constructor
 * @extends {some.BaseApplication}
 */
some.Application = class extends some.BaseApplication {
	constructor() {
		super();

		this._throbber = null;
	}


	/**
	 * @param {IThenable} job
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
		var throbber = new zb.ui.Throbber;
	
		var throbberContainer = zb.html.div('a-throbber zb-fullscreen');
		throbberContainer.appendChild(this._throbber.getContainer());
		this._body.appendChild(throbberContainer);
		
		this._throbber.on(this._throbber.EVENT_START, function() {
			zb.html.show(throbberContainer);
		});
		this._throbber.on(this._throbber.EVENT_STOP, function() {
			zb.html.hide(throbberContainer);
		});
	}
};


/**
 * @type {?zb.ui.Throbber}
 * @protected
 */
some.Application.prototype._throbber;
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
