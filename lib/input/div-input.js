/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2015, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.ui.DivInput');
goog.require('zb.ui.AbstractInput');
goog.require('zb.ui.IInputWidget');
goog.require('zb.ui.templates.divInput');



/**
 * @param {HTMLDivElement} container
 * @param {zb.ui.DivInput.DivInputParams=} opt_params
 * @extends {zb.ui.AbstractInput}
 * @implements {zb.ui.IInputWidget}
 * @constructor
 */
zb.ui.DivInput = function(container, opt_params) {
	this._caretWidth = 1;
	this._caretAnimationType = zb.ui.DivInput.CaretAnimationType.REQUEST_ANIMATION_FRAME;

	if (opt_params && typeof opt_params.caretWidth === 'number') {
		this._caretWidth = opt_params.caretWidth;
	}
	if (opt_params && opt_params.caretAnimationType) {
		this._caretAnimationType = opt_params.caretAnimationType;
	}

	this._value = '';
	this._selectionStart = 0;
	this._inputTextPosition = 0;
	this._isCaretPermanent = false;
	this._exported = zb.ui.templates.divInput({});

	container.appendChild(this._exported.root);
	zb.html.updateClassName(container, 'w-zbui-div-input', true);
	goog.base(this, container, opt_params);

	this._showHidePlaceholder();
	this.setCaretVisible(false);

	this._exported.textBeforeCaret.style.borderRightWidth = this._caretWidth + 'px';
	this._isAnimating = false;
};
goog.inherits(zb.ui.DivInput, zb.ui.AbstractInput);


/**
 * @inheritDoc
 */
zb.ui.DivInput.prototype.afterDOMShow = function() {
	goog.base(this, 'afterDOMShow');
	this.updateInputWidth();
	this._renderInputCaret(this.getCaretPosition());
	this.setCaretDOMVisible(true);
};


/**
 * @inheritDoc
 */
zb.ui.DivInput.prototype.afterDOMHide = function() {
	goog.base(this, 'afterDOMHide');
	this.stopCaretAnimation();
};


/**
 * @inheritDoc
 */
zb.ui.DivInput.prototype.focus = function(opt_fromRect) {
	goog.base(this, 'focus', opt_fromRect);
	this.showCaret();
};


/**
 * @inheritDoc
 */
zb.ui.DivInput.prototype.blur = function() {
	goog.base(this, 'blur');
	this.hideCaret();
};


/**
 * @inheritDoc
 */
zb.ui.DivInput.prototype.getCaretPosition = function() {
	return this._selectionStart;
};


/**
 * @inheritDoc
 */
zb.ui.DivInput.prototype.setCaretPosition = function(pos) {
	if (pos < 0 || pos > this._value.length) {
		return false;
	}

	this._selectionStart = pos;
	this._renderInputCaret(pos);

	return true;
};


/**
 * @inheritDoc
 */
zb.ui.DivInput.prototype.getValue = function() {
	return this._value;
};


/**
 * @inheritDoc
 */
zb.ui.DivInput.prototype.setPlaceholder = function(placeholderText) {
	this._placeholder = placeholderText;
	zb.html.text(this._exported.placeholder, placeholderText);
};


/**
 */
zb.ui.DivInput.prototype.updateInputWidth = function() {
	this._inputWidth = this._container.offsetWidth;
};


/**
 * @param {zb.ui.DivInput.CaretAnimationType} animationType
 */
zb.ui.DivInput.prototype.setCaretAnimationType = function(animationType) {
	if (this.isAnimating()) {
		this.stopCaretAnimation();
	}
	this._caretAnimationType = animationType;
	this.startCaretAnimation();
};


/**
 * @param {boolean=} opt_permanent
 */
zb.ui.DivInput.prototype.showCaret = function(opt_permanent) {
	if (opt_permanent) {
		this._isCaretPermanent = true;
	}
	this.setCaretVisible(true);

	if (this.isDOMVisible() && !this.isAnimating()) {
		this.setCaretDOMVisible(true);
		this.startCaretAnimation();
	}
};


/**
 * @param {boolean=} opt_force Hide permanent caret too.
 * @return {boolean}
 */
zb.ui.DivInput.prototype.hideCaret = function(opt_force) {
	var force = opt_force === true;

	if (!this._isCaretPermanent || force) {
		this.setCaretVisible(false);
		this._isCaretPermanent = false;

		this.stopCaretAnimation();
		this.setCaretDOMVisible(false);

		return true;
	}

	return false;
};


/**
 * @param {boolean} isVisible
 */
zb.ui.DivInput.prototype.setCaretVisible = function(isVisible) {
	this._isCaretVisible = isVisible;
	zb.html.updateClassName(this._container, '_caret-visible', isVisible);
};


/**
 */
zb.ui.DivInput.prototype.startCaretAnimation = function() {
	if (this._caretAnimationType === zb.ui.DivInput.CaretAnimationType.CSS) {
		this._setCaretAnimationWithCSS(true);
	} else {
		this._startAnimateCaretWithRAF();
	}
	this.setCaretDOMVisible(true);
};


/**
 */
zb.ui.DivInput.prototype.stopCaretAnimation = function() {
	if (this._caretAnimationType === zb.ui.DivInput.CaretAnimationType.CSS) {
		this._setCaretAnimationWithCSS(false);
	} else {
		this._stopAnimateCaretWithRAF();
	}
};


/**
 * @param {boolean} isVisible
 */
zb.ui.DivInput.prototype.setCaretDOMVisible = function(isVisible) {
	this._isCaretDOMVisible = isVisible;
	this._exported.textBeforeCaret.style.borderRightColor = isVisible ? '' : 'transparent';
};


/**
 * @return {boolean}
 */
zb.ui.DivInput.prototype.isAnimating = function() {
	return this._isAnimating;
};


/**
 * @inheritDoc
 */
zb.ui.DivInput.prototype._processKey = function(zbKey, opt_e) {
	var isHandled = false;
	var zbCharKey = app.device.input.keyToPrintableChar(zbKey);

	if (zbCharKey !== null) {
		this.putStr(zbCharKey);
		isHandled = true;
	}

	return isHandled || goog.base(this, '_processKey', zbKey, opt_e);
};


/**
 * @inheritDoc
 */
zb.ui.DivInput.prototype._updateCurrentValue = function(str) {
	this._value = str;

	this._showHidePlaceholder();
	zb.html.text(this._exported.inputText, this._valueToRenderValue());
	this._renderInputCaret(this.getCaretPosition());
};


/**
 * @param {boolean} isAnimating
 * @protected
 */
zb.ui.DivInput.prototype._setCaretAnimationWithCSS = function(isAnimating) {
	var elementWithCaret = this._exported.textBeforeCaret;

	for (var browserName in zb.ui.DivInput.AnimationPropertyNames) {
		if (zb.ui.DivInput.AnimationPropertyNames.hasOwnProperty(browserName)) {
			var propertyName = zb.ui.DivInput.AnimationPropertyNames[browserName];
			elementWithCaret.style[propertyName] = isAnimating ? 'inputCaret 1s linear 0s infinite' : '';
		}
	}
	this._isAnimating = isAnimating;
};


/**
 * @protected
 */
zb.ui.DivInput.prototype._startAnimateCaretWithRAF = function() {
	this._animationStartTime = null;
	this._requestID = window.requestAnimationFrame(this._animationRAFStep.bind(this));
	this._isAnimating = true;
};


/**
 * @param {number} timestamp
 * @protected
 */
zb.ui.DivInput.prototype._animationRAFStep = function(timestamp) {
	this._animationStartTime = this._animationStartTime || timestamp;

	if (timestamp - this._animationStartTime >= 500) {
		this.setCaretDOMVisible(!this._isCaretDOMVisible);
		this._animationStartTime = null;
	}

	this._requestID = window.requestAnimationFrame(this._animationRAFStep.bind(this));
};


/**
 * @protected
 */
zb.ui.DivInput.prototype._stopAnimateCaretWithRAF = function() {
	window.cancelAnimationFrame(this._requestID);
	this._isAnimating = false;
	this._animationStartTime = null;
	this.setCaretDOMVisible(false);
};


/**
 * @return {string}
 * @protected
 */
zb.ui.DivInput.prototype._valueToRenderValue = function() {
	return this._value;
};


/**
 * Toggle value of placeholder. Depending on value of real input.
 * @protected
 */
zb.ui.DivInput.prototype._showHidePlaceholder = function() {
	var placeholderElement = this._exported.placeholder;

	zb.html.showHide(placeholderElement, this._value.length === 0);
};


/**
 * @param {number} caretPosition
 * @protected
 */
zb.ui.DivInput.prototype._renderInputCaret = function(caretPosition) {
	var valueForRender = this._valueToRenderValue();
	var beforeCaretValue = '';

	if (caretPosition >= valueForRender.length) {
		beforeCaretValue = valueForRender;
	} else if (caretPosition > 0) {
		beforeCaretValue = valueForRender.substr(0, caretPosition);
	}

	zb.html.text(this._exported.textBeforeCaret, beforeCaretValue);

	this._placeCaretToInput(beforeCaretValue);
};


/**
 * Тут происходит расчет позиции текста, относительно родительского инпута. Если внутренний текст больше инпута,
 * то вычисляется смещение этого текста относительно родительского блока. Далее по тексту:
 * RI - Real Input, т.е. тот блок, который содержит в себе всю строку целиком и отображается;
 * FI - Fake Input, блок, который содержит в себе только текст до каретки и спрятан в DOM;
 * Слайдером буду называть весь движущийся механизм, состоящий из RI и FI, без родительского элемента;
 * @param {string} beforeCaretValue
 * @protected
 */
zb.ui.DivInput.prototype._placeCaretToInput = function(beforeCaretValue) {
	var textWidth = this._exported.inputText.offsetWidth;
	var inputTextPosition = Math.abs(this._inputTextPosition);
	var newFakeTextPosition = 0;

	if (this._inputWidth < textWidth) {
		var widthDiff = textWidth - this._inputWidth;
		var fakeTextWidth = this._exported.textBeforeCaret.offsetWidth;

		if (fakeTextWidth === textWidth + this._caretWidth) {
			/**
			 * Эта ситуация описывает поведение в случае нахождения каретки в крайнем правом положении относительно RI
			 * Если ширина FI равна ширине RI с шириной каретки, то смещаем слайдер
			 * относительно родителя влево. FI сдвигаем меньше на ширину каретки, чтобы не сливалась с бордером.
			 */
			newFakeTextPosition = -widthDiff - this._caretWidth;
		} else if (beforeCaretValue.length === 0) {
			/**
			 * Это ситуация с крайним левым положением каретки относительно RI,
			 * сбрасываем позицию слайдера к исходному положению
			 */
			newFakeTextPosition = 0;
		} else if (fakeTextWidth - inputTextPosition < 0) {
			/**
			 * Описывает ситуацию, когда каретка находится в крайнем левом положении относительно родителя,
			 * т.е. размер FI становится меньше, чем смещение этого самого FI по отношению к родителю,
			 * смещаем слайдер вправо относительно родителя, FI смещаем на 1px больше,
			 * чтобы не сливался с бордером
			 */
			newFakeTextPosition = -fakeTextWidth + this._caretWidth;
		} else if (fakeTextWidth - inputTextPosition >= this._inputWidth) {
			/**
			 * Описывает ситуацию, когда каретка находится в крайнем правом положении относительно родителя,
			 * т.е. размер FI без учета смещения относительно родителя, становится больше, чем размер самого родителя.
			 * Находим разницу между размерами родителя и FI и смещаем слайдер влево относительно родителя,
			 * FI смещаем на 1px меньше, чтобы он не сливался с бордером.
			 */
			newFakeTextPosition = this._inputWidth - fakeTextWidth;
		} else {
			return;
		}
	} else if (inputTextPosition !== 0) {
		/**
		 * Если значение было сброшено каким-то путем - возвращаем слайдер к исходному положению
		 */
		newFakeTextPosition = 0;
	} else {
		return;
	}

	this._inputTextPosition = newFakeTextPosition;
	this._exported.slider.style.marginLeft = newFakeTextPosition === 0 ? '' : newFakeTextPosition + 'px';
};


/**
 * @type {zb.ui.DivInput.CaretAnimationType}
 * @protected
 */
zb.ui.DivInput.prototype._caretAnimationType;


/**
 * @type {?number} timestamp
 * @protected
 */
zb.ui.DivInput.prototype._animationStartTime;


/**
 * @type {number}
 * @protected
 */
zb.ui.DivInput.prototype._requestID;


/**
 * @type {boolean}
 * @protected
 */
zb.ui.DivInput.prototype._isAnimating;


/**
 * @type {boolean}
 * @protected
 */
zb.ui.DivInput.prototype._isCaretVisible;


/**
 * @type {boolean}
 * @protected
 */
zb.ui.DivInput.prototype._isCaretDOMVisible;


/**
 * @type {boolean}
 * @protected
 */
zb.ui.DivInput.prototype._isCaretPermanent;


/**
 * @type {number}
 * @protected
 */
zb.ui.DivInput.prototype._inputWidth;


/**
 * Width of slider caret, right border of fake input
 * @type {number}
 * @protected
 */
zb.ui.DivInput.prototype._caretWidth;


/**
 * Current caret's offset position relative to the parent. This value always <= 0
 * @type {number}
 * @protected
 */
zb.ui.DivInput.prototype._inputTextPosition;


/**
 * @type {string}
 * @protected
 */
zb.ui.DivInput.prototype._value;


/**
 * @type {string}
 * @protected
 */
zb.ui.DivInput.prototype._placeholder;


/**
 * @type {number}
 * @protected
 */
zb.ui.DivInput.prototype._selectionStart;


/**
 * @type {zb.ui.templates.DivInputOut}
 * @protected
 */
zb.ui.DivInput.prototype._exported;


/**
 * Poor css animation cause performance problems in Presto-like browsers. And by default used RAF instead.
 * If there is no need to support these platforms you can switch to CSS animation painlessly.
 * @enum {string}
 */
zb.ui.DivInput.CaretAnimationType = {
	CSS: 'css-animation',
	REQUEST_ANIMATION_FRAME: 'request-animation-frame'
};


/**
 * @enum {string}
 */
zb.ui.DivInput.AnimationPropertyNames = {
	PRESTO: 'OAnimation',
	WEBKIT: 'WebkitAnimation',
	COMMON: 'animation'
};


/**
 * @typedef {{
 *     placeholder: (string|undefined),
 *     caretWidth: (number|undefined),
 *     caretAnimationType: (zb.ui.DivInput.CaretAnimationType|undefined)
 * }}
 */
zb.ui.DivInput.DivInputParams;
