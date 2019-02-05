describe('zb.ui.widgets.BaseListDataList: select next', () => {
	const expect = chai.expect;
	const given = mochaTestSteps.given;
	const when = mochaTestSteps.when;
	const then = mochaTestSteps.then;

	let dataList;
	let buffer;
	let bufferPromise;
	let spyChange;
	let spySelect;
	const helper = zb.ui.test.baseListHelper;

	beforeEach(() => {
		buffer = helper.createBuffer();
		dataList = helper.createDefaultDataList();
		bufferPromise = helper
			.setBufferSource(buffer, dataList)
			.then(() => {
				spyChange.resetHistory();
				spySelect.resetHistory();
			});

		spyChange = sinon.spy(helper, 'changeCallback');
		spySelect = sinon.spy(helper, 'selectCallback');
	});
	afterEach(() => {
		spyChange.restore();
		spySelect.restore();
	});

	it('Selecting next item', () => {
		// GIVEN
		given('created baselist-datalist', () => bufferPromise);
		// WHEN
		when('select next item', () => {
			dataList.selectNextItem();
		});
		// THEN
		then('selectCallback is called once with new item and old item', () => {
			expect(spySelect)
				.calledWith('B', 1, 'A', 0)
				.callCount(1);
		});
		then('changeCallback is not called', () => {
			expect(spyChange)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Selecting next next item', () => {
		// GIVEN
		given('created baselist-datalist', () => bufferPromise);
		// WHEN
		when('select next next item', () => {
			dataList.selectNextItem();
			dataList.selectNextItem();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', () => {
			expect(spySelect.withArgs('B', 1, 'A', 0))
				.callCount(1);
			expect(spySelect.withArgs('C', 2, 'B', 1))
				.callCount(1);
		});
		then('changeCallback is not called', () => {
			expect(spyChange)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Selecting last but one and last item', () => {
		// GIVEN
		given('created baselist-datalist', () => bufferPromise);
		// WHEN
		when('select last but one and next item', () => {
			dataList.selectAt(dataList.size() - 2);
			dataList.selectNextItem();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', () => {
			expect(spySelect.withArgs('Y', 6, null, NaN))
				.callCount(1);
			expect(spySelect.withArgs('Z', 7, 'Y', 6))
				.callCount(1);
		});
		then('changeCallback is called once with new buffer contents', () => {
			expect(spyChange)
				.calledWith([
					'S', 'T', 'U',
					'V', 'W', 'X',
					'Y', 'Z'
				])
				.callCount(1);
		});
		// DONE
		return then('done');
	});

	it('Selecting next after last item', () => {
		// GIVEN
		given('created baselist-datalist', () => bufferPromise);
		// WHEN
		when('select last and next item', () => {
			dataList.selectLast();
			dataList.selectNextItem();
		});
		// THEN
		then('selectCallback is called once with new item and old item', () => {
			expect(spySelect)
				.calledWith('Z', 7, null, NaN)
				.callCount(1);
		});
		then('changeCallback is called once with new buffer contents', () => {
			expect(spyChange)
				.calledWith([
					'S', 'T', 'U',
					'V', 'W', 'X',
					'Y', 'Z'
				])
				.callCount(1);
		});
		// DONE
		return then('done');
	});

	it('Selecting next index via buffer', () => {
		// GIVEN
		given('created baselist-datalist', () => bufferPromise);
		// WHEN
		when('select next index', () => {
			buffer.selectNextIndex();
		});
		// THEN
		then('selectCallback is called once with new item and old item', () => {
			expect(spySelect)
				.calledWith('B', 1, 'A', 0)
				.callCount(1);
		});
		then('changeCallback is not called', () => {
			expect(spyChange)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Selecting next next index via buffer', () => {
		// GIVEN
		given('created baselist-datalist', () => bufferPromise);
		// WHEN
		when('select next next index', () => {
			buffer.selectNextIndex();
			buffer.selectNextIndex();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', () => {
			expect(spySelect.withArgs('B', 1, 'A', 0))
				.callCount(1);
			expect(spySelect.withArgs('C', 2, 'B', 1))
				.callCount(1);
		});
		then('changeCallback is not called', () => {
			expect(spyChange)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Selecting last but one item and next index via buffer', () => {
		// GIVEN
		given('created baselist-datalist', () => bufferPromise);
		// WHEN
		when('select last item and next index', () => {
			dataList.selectAt(dataList.size() - 2);
			buffer.selectNextIndex();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', () => {
			expect(spySelect.withArgs('Y', 6, null, NaN))
				.callCount(1);
			expect(spySelect.withArgs('Z', 7, 'Y', 6))
				.callCount(1);
		});
		then('changeCallback is called once with new buffer contents', () => {
			expect(spyChange)
				.calledWith([
					'S', 'T', 'U',
					'V', 'W', 'X',
					'Y', 'Z'
				])
				.callCount(1);
		});
		// DONE
		return then('done');
	});

	it('Selecting last item and next index via buffer', () => {
		// GIVEN
		given('created baselist-datalist', () => bufferPromise);
		// WHEN
		when('select last item and next line', () => {
			dataList.selectLast();
			buffer.selectNextIndex();
		});
		// THEN
		then('selectCallback is called once with new item and old item', () => {
			expect(spySelect)
				.calledWith('Z', 7, null, NaN)
				.callCount(1);
		});
		then('changeCallback is called once with new buffer contents', () => {
			expect(spyChange)
				.calledWith([
					'S', 'T', 'U',
					'V', 'W', 'X',
					'Y', 'Z'
				])
				.callCount(1);
		});
		// DONE
		return then('done');
	});

	it('Selecting next line via buffer', () => {
		// GIVEN
		given('created baselist-datalist', () => bufferPromise);
		// WHEN
		when('select next line', () => {
			buffer.selectNextLine();
		});
		// THEN
		then('selectCallback is called once with new item and old item', () => {
			expect(spySelect)
				.calledWith('D', 3, 'A', 0)
				.callCount(1);
		});
		then('changeCallback is not called', () => {
			expect(spyChange)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Selecting next next line via buffer', () => {
		// GIVEN
		given('created baselist-datalist', () => bufferPromise);
		// WHEN
		when('select next next line', () => {
			buffer.selectNextLine();
			buffer.selectNextLine();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', () => {
			expect(spySelect.withArgs('D', 3, 'A', 0))
				.callCount(1);
			expect(spySelect.withArgs('G', 6, 'D', 3))
				.callCount(1);
		});
		then('changeCallback is called once with new buffer contents', () => {
			expect(spyChange)
				.calledWith([
					'A', 'B', 'C',
					'D', 'E', 'F',
					'G', 'H', 'I',
					'J', 'K', 'L',
					'M', 'N', 'O'
				])
				.callCount(1);
		});
		// DONE
		return then('done');
	});

	it('Selecting last but one line and next line via buffer', () => {
		// GIVEN
		given('created baselist-datalist', () => bufferPromise);
		// WHEN
		when('select last but one item and next line', () => {
			dataList.selectAt(dataList.size() - 5);
			buffer.selectNextLine();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', () => {
			expect(spySelect.withArgs('V', 6, null, NaN))
				.callCount(1);
			expect(spySelect.withArgs('Y', 9, 'V', 6))
				.callCount(1);
		});
		then('changeCallback is called once with new buffer contents', () => {
			expect(spyChange)
				.calledWith([
					'P', 'Q', 'R',
					'S', 'T', 'U',
					'V', 'W', 'X',
					'Y', 'Z'
				])
				.callCount(1);
		});
		// DONE
		return then('done');
	});

	it('Selecting last item and next line via buffer', () => {
		// GIVEN
		given('created baselist-datalist', () => bufferPromise);
		// WHEN
		when('select last item and next line', () => {
			dataList.selectLast();
			buffer.selectNextLine();
		});
		// THEN
		then('selectCallback is called once with new item and old item', () => {
			expect(spySelect)
				.calledWith('Z', 7, null, NaN)
				.callCount(1);
		});
		then('changeCallback is called once with new buffer contents', () => {
			expect(spyChange)
				.calledWith([
					'S', 'T', 'U',
					'V', 'W', 'X',
					'Y', 'Z'
				])
				.callCount(1);
		});
		// DONE
		return then('done');
	});
});
