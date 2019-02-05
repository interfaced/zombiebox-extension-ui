describe('zb.ui.widgets.BaseListDataList: add one item', () => {
	const expect = chai.expect;
	const given = mochaTestSteps.given;
	const when = mochaTestSteps.when;
	const then = mochaTestSteps.then;

	let spyChange;
	let spySelect;
	const helper = zb.ui.test.baseListHelper;

	beforeEach(() => {
		spyChange = sinon.spy(helper, 'changeCallback');
		spySelect = sinon.spy(helper, 'selectCallback');
	});

	afterEach(() => {
		spyChange.restore();
		spySelect.restore();
	});

	it('before the frame', () => {
		const buffer = helper.createBuffer({
			padding: 1,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist with source', () => helper.setBufferSource(buffer, dataList));
		given('frame moved from source beginning', () => {
			dataList.select('H');
			buffer._changeItems();

			spyChange.resetHistory();
			spySelect.resetHistory();
		});
		// WHEN
		when('add element to source - before buffer frame', () => {
			dataList.addAt('+1', 0);
		});
		// THEN
		then('changeCallback should be called once with shifted items around new index', () => {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'C', 'D', 'E',
					'F', 'G', 'H',
					'I', 'J', 'K'
				]);
		});
		then('selectCallback should be called with same element on new index', () => {
			expect(spySelect)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('before the frame, pushing selected item to new line', () => {
		const buffer = helper.createBuffer({
			padding: 2,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = helper.createDefaultDataList();

		// buffer frame position should change
		// GIVEN
		given('created baselist-datalist with source', () => helper.setBufferSource(buffer, dataList));
		given('frame moved from source beginning', () => {
			dataList.select('H');
			buffer._changeItems();
			dataList.select('I');

			spyChange.resetHistory();
			spySelect.resetHistory();
		});
		// WHEN
		when('add element to source - before buffer frame', () => {
			dataList.addAt('+1', 0);
		});
		// THEN - buffer frame should be moved
		then('changeCallback should be called with CHANGED buffer frame position', () => {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'C', 'D', 'E',
					'F', 'G', 'H',
					'I', 'J', 'K',
					'L', 'M', 'N',
					'O', 'P', 'Q'
				]);
		});
		then('selectCallback should be called with same element on new index', () => {
			expect(spySelect)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('before the frame, pushing selected item to LOL', () => {
		const buffer = helper.createBuffer({
			padding: 1,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = helper.createDefaultDataList();

		// buffer frame position should change ONCE
		// GIVEN
		given('created baselist-datalist with source', () => helper.setBufferSource(buffer, dataList));
		given('frame moved from source beginning', () => {
			dataList.select('H');
			buffer._changeItems();
			dataList.select('I');

			spyChange.resetHistory();
			spySelect.resetHistory();
		});
		// WHEN
		when('add element to source - before buffer frame', () => {
			dataList.addAt('+1', 0);
		});
		// THEN - buffer frame should be moved
		then('changeCallback should be called with CHANGED buffer frame position', () => {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'F', 'G', 'H',
					'I', 'J', 'K',
					'L', 'M', 'N'
				]);
		});
		then('selectCallback should be called with same element on new index', () => {
			expect(spySelect)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('in the frame before selected', () => {
		const buffer = helper.createBuffer({
			padding: 1,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist with source', () => helper.setBufferSource(buffer, dataList));
		given('frame moved from source beginning', () => {
			dataList.select('H');
			buffer._changeItems();

			spyChange.resetHistory();
			spySelect.resetHistory();
		});
		// WHEN
		when('add element to source - in the frame before selected', () => {
			dataList.addAt('+', 4);
		});
		// THEN
		then('changeCallback should be called ONCE with shifted items around new index', () => {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'D', '+', 'E',
					'F', 'G', 'H',
					'I', 'J', 'K'
				]);
		});
		then('selectCallback should be called with same element on new index', () => {
			expect(spySelect)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('selected', () => {
		const buffer = helper.createBuffer({
			padding: 2,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist with source', () => helper.setBufferSource(buffer, dataList));
		given('frame moved from source beginning', () => {
			dataList.select('K');
			buffer._changeItems();

			spyChange.resetHistory();
			spySelect.resetHistory();
		});
		// WHEN
		when('add element to source - at the index of selected element', () => {
			dataList.addAt('+', 10);
		});
		// THEN
		then('selected element must shift right', () => {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'D', 'E', 'F',
					'G', 'H', 'I',
					'J', '+', 'K',
					'L', 'M', 'N',
					'O', 'P', 'Q'
				]);
		});
		then('selected element new index', () => {
			expect(spySelect)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('in buffer frame after selected', () => {
		const buffer = helper.createBuffer({
			padding: 2,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist with source', () => helper.setBufferSource(buffer, dataList));
		given('frame moved from source beginning', () => {
			dataList.select('K');
			buffer._changeItems();

			spyChange.resetHistory();
			spySelect.resetHistory();
		});
		// WHEN
		when('add element to source - at the index in buffer frame after selected element', () => {
			dataList.addAt('+', 11);
		});
		// THEN
		then('elements after selected must shift right', () => {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'D', 'E', 'F',
					'G', 'H', 'I',
					'J', 'K', '+',
					'L', 'M', 'N',
					'O', 'P', 'Q'
				]);
		});
		then('selectCallback should not be called', () => {
			expect(spySelect)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('after buffer frame', () => {
		const buffer = helper.createBuffer({
			padding: 2,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist with source', () => helper.setBufferSource(buffer, dataList));
		given('frame moved from source beginning', () => {
			dataList.select('K');
			buffer._changeItems();

			spyChange.resetHistory();
			spySelect.resetHistory();
		});
		// WHEN
		when('after buffer frame', () => {
			dataList.addAt('+', 18);
		});
		// THEN
		then('changeCallback should not be called', () => {
			expect(spyChange)
				.callCount(0);
		});
		then('selectCallback should not be called', () => {
			expect(spySelect)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	// TODO: протестировать работу с DynamicList
});
