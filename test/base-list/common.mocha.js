describe('zb.ui.widgets.BaseListDataList', () => {
	const expect = chai.expect;
	const given = mochaTestSteps.given;
	const when = mochaTestSteps.when;
	const then = mochaTestSteps.then;

	const helper = zb.ui.test.baseListHelper;
	const BaseListDataList = zb.ui.widgets.BaseListDataList;

	describe('Class', () => {
		it('class exists', () => {
			expect(BaseListDataList)
				.is.a('function');
		});
		it('default constructor (options, changeCallback, selectCallback)', () => {
			expect(() => new BaseListDataList(
				{},
				items => {},
				(newItem, newIndex, oldItem, oldIndex) => {}
			)).not.to.throw();
		});
	});

	describe('Logic', () => {
		let buffer;

		beforeEach(() => {
			buffer = new BaseListDataList(
				{},
				items => {},
				(newItem, newIndex, oldItem, oldIndex) => {}
			);
		});

		it('Public methods should exist', () => {
			const publicMethodsNames = [
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

			publicMethodsNames.forEach((methodName) => {
				expect(buffer[methodName]).is.a('function');
			});
		});

		it('initially has no source (null)', () => {
			expect(buffer.getSource()).is.null;
		});

		it('set source and get it back', () => {
			const dataList = helper.createDefaultDataList();

			// WHEN
			when('set new source', () => helper.setBufferSource(buffer, dataList));
			// THEN
			then('set new source', () => {
				expect(buffer.getSource()).equal(dataList);
			});
		});
	});
});
