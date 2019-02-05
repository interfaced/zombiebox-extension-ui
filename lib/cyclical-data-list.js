goog.provide('zb.ui.CyclicalDataList');
goog.require('zb.ui.DataList');


/**
 * @template ItemType
 */
zb.ui.CyclicalDataList = class extends zb.ui.DataList {
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
