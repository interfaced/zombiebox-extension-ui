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
some.Application = function() {
	goog.base(this);

	this._throbber = null;
};
goog.inherits(some.Application, some.BaseApplication);


/**
 * @param {IThenable} job
 */
some.Application.prototype.addThrobberJob = function(job) {
	if (this._throbber) {
		this._throbber.wait(job);
	}
};


/**
 * @inheritDoc
 */
some.Application.prototype._onDeviceReady = function(eventName, device) {
	goog.base(this, '_onDeviceReady', eventName, device);

	this._createThrobber();
};


/**
 * @private
 */
some.Application.prototype._createThrobber = function() {
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
};


/**
 * @type {?zb.ui.Throbber}
 * @private
 */
some.Application.prototype._throbber;
```

#### CSS:

```css
.a-throbber {
	background: rgba(0, 0, 0, .5);
	display: none;
	z-index: 100;
}
	.a-throbber .w-zbui-throbber {
		position: absolute;
		top: 50%;
		left: 50%;
		margin: -44px 0 0 -44px;
	}
```
