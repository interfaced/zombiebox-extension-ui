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
 * @inheritDoc
 * @extends {zb.ui.AbstractInput}
 * @implements {zb.ui.IInputWidget}
 * @constructor
 */
zb.ui.DivInput = function(container, opt_params) {
	this._caretWidth = 1;
	this._value = '';
	this._selectionStart = 0;
	this._inputTextPosition = 0;
	this._isCaretPermanent = false;
	this._isCaretVisible = false;
	this._exported = zb.ui.templates.divInput({});

	container.appendChild(this._exported.root);
	container.classList.add('w-zbui-div-input');
	goog.base(this, container, opt_params);
	this._showHidePlaceholder();
};
goog.inherits(zb.ui.DivInput, zb.ui.AbstractInput);


/**
 * @inheritDoc
 */
zb.ui.DivInput.prototype.afterDOMShow = function() {
	goog.base(this, 'afterDOMShow');
	this.updateInputWidth();
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
 */
zb.ui.DivInput.prototype.updateInputWidth = function() {
	this._inputWidth = this._container.offsetWidth;
};


/**
 * @param {boolean=} opt_permanent
 */
zb.ui.DivInput.prototype.showCaret = function(opt_permanent) {
	if (opt_permanent) {
		this._isCaretPermanent = true;
	}
	this._container.classList.add('_caret-visible');
	this._isCaretVisible = true;
};


/**
 * @param {boolean=} opt_force Hide permanent caret too.
 * @return {boolean}
 */
zb.ui.DivInput.prototype.hideCaret = function(opt_force) {
	var force = opt_force === true;

	if (!this._isCaretPermanent || force) {
		this._container.classList.remove('_caret-visible');
		this._isCaretVisible = false;
		this._isCaretPermanent = false;
		return true;
	}
	return false;
};


/**
 * @inheritDoc
 */
zb.ui.DivInput.prototype.setPlaceholder = function(placeholderText) {
	this._placeholder = placeholderText;
	zb.html.text(this._exported.placeholder, placeholderText);
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
 * тут происходит расчет позиции текста, относительно родительского инпута. Если внутренний текст больше инпута,
 * то вычисляется смещение этого текста относительно родительского блока. Далее по тексту:
 * RI - Real Input, т.е. тот блок, который содержит в себе всю строку целиком и отображается
 * FI - Fake Input, блок, который содержит в себе только текст до каретки и спрятан через visibility: hidden
 * слайдером буду называть весь движущийся механизм, состоящий из RI и FI, без родительского элемента
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
			widthDiff *= -1;
			newFakeTextPosition = widthDiff - this._caretWidth;
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
			fakeTextWidth *= -1;
			newFakeTextPosition = fakeTextWidth + this._caretWidth;
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
 * @type {boolean}
 * @protected
 */
zb.ui.DivInput.prototype._isCaretVisible;


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
 * TODO use CSS, luke!
 * Width of slider caret, :after element
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
