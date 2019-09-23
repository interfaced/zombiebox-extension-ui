/**
 * @interface
 */
export default class IInputWidget {
	/**
	 * @return {boolean}
	 */
	moveCaretLeft() {}

	/**
	 * @return {boolean}
	 */
	moveCaretRight() {}

	/**
	 * @return {number}
	 */
	getCaretPosition() {}

	/**
	 * @param {number} position
	 * @return {boolean}
	 */
	setCaretPosition(position) {}

	/**
	 * @param {string} placeholder
	 */
	setPlaceholder(placeholder) {}

	/**
	 * @param {string} str
	 * @param {boolean=} silent
	 */
	setValue(str, silent) {}

	/**
	 * @return {string}
	 */
	getValue() {}

	/**
	 * Put given string to caret position.
	 * @param {string} str
	 */
	putStr(str) {}

	/**
	 * Remove char left of caret
	 */
	backspace() {}
}


/**
 * Fired with: {string} value
 * @const {string}
 */
IInputWidget.prototype.EVENT_CHANGE;


/**
 * Fired with: {string} value
 * @const {string}
 */
IInputWidget.prototype.EVENT_FINISH;
