describe('zb.ui.BaseListDataList', function() {
	var expect = chai.expect;
	var given = mochaTestSteps.given;
	var when = mochaTestSteps.when;
	var then = mochaTestSteps.then;

	var helper = zb.ui.test.baseListHelper;
	var BaseListDataList = zb.ui.BaseListDataList;

	describe('Class', function() {
		it('class exists', function() {
			expect(BaseListDataList)
				.is.a('function');
		});
		it('default constructor (options, changeCallback, selectCallback)', function() {
			expect(function() {
				return new BaseListDataList(
					{},
					function(items) {},
					function(newItem, newIndex, oldItem, oldIndex) {}
				);
			}).not.to.throw();
		});
	});

	describe('Logic', function() {
		var buffer;

		beforeEach(function() {
			buffer = new BaseListDataList(
				{},
				function(items) {},
				function(newItem, newIndex, oldItem, oldIndex) {}
			);
		});

		it('Public methods should exist', function() {
			var publicMethodsNames = [
				'setSource',
				'getSource',
				'hasSource',
				'isCyclical',
				'isDynamic',
				'isLoading',
				'isGlobalStart',
				'isGlobalEnd',
				'getSourceStart',
				'getSourceEnd',
				'isSourceIndex',
				'getSourceSize',
				'getSourceIndex',
				'getSourceItem',
				'getSourceItemIndex',
				'getSourceItems',
				'isLocalIndex',
				'getLocalStart',
				'getLocalEnd',
				'getLocalSize',
				'getLocalIndex',
				'getLocalItems',
				'isGlobalIndex',
				'getGlobalStart',
				'setGlobalEnd',
				'getGlobalEnd',
				'getGlobalSize',
				'getGlobalIndex',
				'getItemsByLines',
				'getLinesByItems',
				'getLineByIndex',
				'selectNextLine',
				'selectPrevLine',
				'selectNextIndex',
				'selectPrevIndex',
				'setIndexByItem',
				'setGlobalIndex'
			];

			publicMethodsNames.forEach(function(methodName) {
				expect(buffer[methodName]).is.a('function');
			});
		});

		it('initially has no source (null)', function() {
			expect(buffer.getSource()).is.null;
		});

		it('set source and get it back', function() {
			var dataList = helper.createDefaultDataList();

			// WHEN
			when('set new source', function() {
				return helper.setBufferSource(buffer, dataList);
			});
			// THEN
			then('set new source', function() {
				expect(buffer.getSource()).equal(dataList);
			});
		});
	});
});
