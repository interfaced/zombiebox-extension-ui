goog.provide('zb.ui.data.CyclicalList');
goog.require('zb.ui.data.List');


/**
 * @template ItemType
 */
zb.ui.data.CyclicalList = class extends zb.ui.data.List {
	/**
	 * @override
	 */
	itemAt(index) {
		const remainder = index % this.size();
		let fixedIndex = index;
		if (remainder < 0) {
			fixedIndex = this.size() + remainder;
		}
		return super.itemAt(fixedIndex);
	}

	/**
	 * @override
	 */
	selectNextItem(opt_step) {
		const step = isNaN(opt_step) ? 1 : (opt_step < 1 ? 1 : opt_step);
		let index = this.currentIndex() + step;
		if (index > this.size() - 1) {
			index = index - this.size();
		}
		return this.selectAt(index);
	}

	/**
	 * @override
	 */
	selectPrevItem(opt_step) {
		const step = isNaN(opt_step) ? 1 : (opt_step < 1 ? 1 : opt_step);
		let index = this.currentIndex() - step;
		if (index < 0) {
			index = this.size() + index;
		}
		return this.selectAt(index);
	}
};
