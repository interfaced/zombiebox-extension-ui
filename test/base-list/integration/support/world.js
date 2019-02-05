goog.provide('zb.ui.test.support.World');
goog.require('zb.ui.test.support.Helper');



/**
 * @constructor
 */
zb.ui.test.support.World = function() {
	this.setup = {};
	this.sut = {};
	this.po = {};
	this.co = {};

	var w = this;
	var helper = zb.ui.test.support.Helper;

	// Setup

	w.setup.changeCallback = function(items) {
		return 'changeCallback';
	};
	w.setup.selectCallback = function() {
		return 'selectCallback';
	};

	w.setup.createArray = function() {
		return helper.createDefaultArray();
	};

	w.setup.createOtherArray = function() {
		return helper.createOtherArray();
	};

	w.setup.createDataList = function() {
		return helper.createDefaultDataList();
	};

	w.setup.bufferOptions = {
		padding: 2,
		lineSize: 3,
		loadOnLeft: 1
	};

};


/**
 * @return {IThenable}
 */
zb.ui.test.support.World.prototype.createListWithSetupSource = function() {
	var w = this;
	return w.createListWithSource(w.setup.datalist, {
		padding: 1,
		lineSize: 3,
		loadOnLeft: 1
	});
};


/**
 * @return {string}
 */
zb.ui.test.support.World.prototype.createListWithSetupSource.toString = function() {
	return 'created list with setup source';
};


/**
 * create into w.sut.list
 */
zb.ui.test.support.World.prototype.createList = function() {
	var w = this;
	w.sut.list = new zb.ui.BaseListDataList(function() {
		w.setup.changeCallback.apply(w.setup, arguments);
	}, function() {
		w.setup.selectCallback.apply(w.setup, arguments);
	});
};


/**
 * @param {zb.ui.DataList} datalist
 * @param {zb.ui.BaseListBuffer.Options=} opt_options
 * @return {IThenable}
 */
zb.ui.test.support.World.prototype.createListWithSource = function(datalist, opt_options) {
	var w = this;
	this.createList();
	return this
		.doSetSource(datalist, opt_options)
		.then(function() {
			w.po.spyChange.reset();
			w.po.spySelected.reset();
		});
};


/**
 * @param {Array} args
 * @return {string}
 */
zb.ui.test.support.World.prototype.createListWithSource.toString = function(args) {
	return 'created baselist-datalist with source and options ' + JSON.stringify(args[1]);
};


/**
 * @param {*} centerIndex
 * @param {*=} opt_selectedIndex
 */
zb.ui.test.support.World.prototype.provideCurrentFrameCenterByIndex = function(centerIndex, opt_selectedIndex) {
	var w = this;
	var selectedIndex = opt_selectedIndex === undefined ? centerIndex : opt_selectedIndex;

	w.setup.datalist.selectAt(centerIndex);
	w.sut.list._changeItems();
	w.setup.datalist.selectAt(selectedIndex);
	if (w.sut.list._globalCenter !== centerIndex) {
		throw new Error('Global center shifted during its own setup');
	}

	w.po.spyChange.reset();
	w.po.spySelected.reset();
};


/**
 * @param {*} centerValue
 * @param {*=} opt_selectedValue
 */
zb.ui.test.support.World.prototype.provideCurrentFrameCenterByValue = function(centerValue, opt_selectedValue) {
	var w = this;
	var selectedValue = opt_selectedValue === undefined ? centerValue : opt_selectedValue;

	var centerIndex = w.setup.datalist.indexOf(centerValue);
	var selectedIndex = w.setup.datalist.indexOf(selectedValue);

	if (centerIndex === -1 || selectedIndex === -1) {
		throw new Error('Used value is outside of datalist');
	}

	this.provideCurrentFrameCenterByIndex(centerIndex, selectedIndex);
};


/**
 * @param {zb.ui.DataList} datalist
 * @param {zb.ui.BaseListBuffer.Options=} opt_options
 * @return {IThenable}
 */
zb.ui.test.support.World.prototype.doSetSource = function(datalist, opt_options) {
	var w = this;
	w.sut.list.setSource(datalist, opt_options);

	return datalist ? w.setup.datalist.preload() : Promise.resolve();
};


/**
 * @param {*} value
 * @deprecated
 */
zb.ui.test.support.World.prototype.provideSelected = function(value) {
	var w = this;
	w.setup.datalist.select(value);
	w.po.spyChange.reset();
	w.po.spySelected.reset();
};


/**
 * @param {*} item
 * @deprecated
 */
zb.ui.test.support.World.prototype.doSelectItem = function(item) {
	var w = this;
	w.setup.datalist.select(item);
};


/**
 * @param {Array} args
 * @param {string} comment
 * @return {string}
 * @deprecated
 */
zb.ui.test.support.World.prototype.doSelectItem.toString = function(args, comment) {
	var details = comment || args[0];
	return 'select element ' + details;
};


/**
 * @param {number} newItem
 * @param {number} newIndex
 * @param {number} oldItem
 * @param {number} oldIndex
 * @deprecated
 */
zb.ui.test.support.World.prototype.checkSelectHookCalledOnceWith = function(newItem, newIndex, oldItem, oldIndex) {
	var w = this;
	expect(w.po.spySelected)
		.callCount(1)
		.calledWith('B', 1, 'A', 0);
};


/**
 * @param {Array} args
 * @param {string} comment
 * @return {string}
 * @deprecated
 */
zb.ui.test.support.World.prototype.checkSelectHookCalledOnceWith.toString = function(args, comment) {
	var details = comment || args;
	return 'selectCall hook SHALL be called once, with ' + details;
};


/**
 * @deprecated
 */
zb.ui.test.support.World.prototype.checkChangeHookNotCalled = function() {
	var w = this;
	expect(w.po.spyChange)
		.callCount(0);
};


/**
 * @param {Array} args
 * @param {string} comment
 * @return {string}
 * @deprecated
 */
zb.ui.test.support.World.prototype.checkChangeHookNotCalled.toString = function(args, comment) {
	return 'changeCallback SHALL NOT be called';
};
