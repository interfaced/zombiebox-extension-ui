describe('zb.ui.widgets.BaseListDataList: select', () => {
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

	it('inside passive zone', () => {
		const buffer = helper.createBuffer({
			padding: 1,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist with source', () => helper
			.setBufferSource(buffer, dataList)
			.then(() => {
				spyChange.resetHistory();
				spySelect.resetHistory();
			}));
		// WHEN
		when('select element in passive zone', () => {
			dataList.select('B');
		});
		// THEN
		then('selectCallback is called once with new item and old item', () => {
			expect(spySelect)
				.callCount(1)
				.calledWith('B', 1, 'A', 0);
		});
		then('changeCallback is not called', () => {
			expect(spyChange)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('inside passive zone with shifted index', () => {
		const buffer = helper.createBuffer({
			padding: 1,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist with source', () => helper.setBufferSource(buffer, dataList));
		given('frame is moved from source beginning' , () => {
			dataList.select('H');
			buffer._changeItems();

			spyChange.resetHistory();
			spySelect.resetHistory();
		});
		// WHEN
		when('select element in passive zone', () => {
			dataList.select('I');
		});
		// THEN
		then('selectCallback is called once with new item and old item', () => {
			expect(spySelect)
				.callCount(1)
				.calledWith('I', 5, 'H', 4);
		});
		then('changeCallback is not called', () => {
			expect(spyChange)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('on border of loadOnLeft zone', () => {
		const buffer = helper.createBuffer({
			padding: 2,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist with source', () => helper
			.setBufferSource(buffer, dataList)
			.then(() => {
				spyChange.resetHistory();
				spySelect.resetHistory();
			}));
		// WHEN
		when('select element on border of loadOnLeft zone' , () => {
			dataList.select('D');
		});
		// THEN
		then('selectCallback is called once with new item and old item', () => {
			expect(spySelect)
				.callCount(1)
				.calledWith('D', 3, 'A', 0);
		});
		then('changeCallback is not called', () => {
			expect(spyChange)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('on border of buffer (inside loadOnLeft zone)', () => {
		const buffer = helper.createBuffer({
			padding: 1,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist with source', () => helper
			.setBufferSource(buffer, dataList)
			.then(() => {
				spyChange.resetHistory();
				spySelect.resetHistory();
			}));
		// WHEN
		when('select element in on border of buffer zone' , () => {
			dataList.select('D');
		});
		// THEN
		then('selectCallback is called once with new item and old item', () => {
			expect(spySelect)
				.callCount(1)
				.calledWith('D', 3, 'A', 0);
		});
		then('changeCallback called once with new buffer contents', () => {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'A', 'B', 'C',
					'D', 'E', 'F',
					'G', 'H', 'I'
				]);
		});
		// DONE
		return then('done');
	});

	it('out of buffer', () => {
		const buffer = helper.createBuffer({
			padding: 2,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist with source', () => helper.setBufferSource(buffer, dataList));
		given('selected element is close to frame border', () => {
			dataList.select('B');
			buffer._changeItems();
			dataList.select('E');

			spyChange.resetHistory();
			spySelect.resetHistory();
		});
		// WHEN
		when('select element out of buffer zone' , () => {
			dataList.select('K');
		});
		// THEN
		then('selectCallback is called once with new item and old item', () => {
			expect(spySelect)
				.callCount(1)
				.calledWith('K', 7, 'E', 1);
		});
		then('changeCallback called once with new buffer contents', () => {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'D', 'E', 'F',
					'G', 'H', 'I',
					'J', 'K', 'L',
					'M', 'N', 'O',
					'P', 'Q', 'R'
				]);
		});
		// DONE
		return then('done');
	});

	it('old element outside new frame', () => {
		const buffer = helper.createBuffer({
			padding: 1,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist with source', () => helper
			.setBufferSource(buffer, dataList)
			.then(() => {
				spyChange.resetHistory();
				spySelect.resetHistory();
			}));
		// WHEN
		when('select element far outside current frame', () => {
			dataList.select('Q');
		});
		// THEN
		then('selectCallback is called once with null-NaN for old item', () => {
			expect(spySelect)
				.callCount(1)
				.calledWith('Q', 4, null, NaN);
		});
		then('changeCallback called once with new frame contents', () => {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'M', 'N', 'O',
					'P', 'Q', 'R',
					'S', 'T', 'U'
				]);
		});
		// DONE
		return then('done');
	});
});
