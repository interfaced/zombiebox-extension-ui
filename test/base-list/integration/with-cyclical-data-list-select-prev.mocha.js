describe('zb.ui.widgets.BaseListDataList with zb.ui.data.CyclicalList: select prev', () => {
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
		dataList = new zb.ui.data.CyclicalList(helper.createDefaultArray());
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

	it('Selecting prev item', () => {
		// GIVEN
		given('created baselist-datalist', () => bufferPromise);
		// WHEN
		when('select prev item', () => {
			dataList.selectPrevItem();
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

	it('Selecting prev prev item', () => {
		// GIVEN
		given('created baselist-datalist', () => bufferPromise);
		// WHEN
		when('select prev prev item', () => {
			dataList.selectPrevItem();
			dataList.selectPrevItem();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', () => {
			expect(spySelect.withArgs('Z', 7, null, NaN))
				.callCount(1);
			expect(spySelect.withArgs('Y', 6, 'Z', 7))
				.callCount(1);
		});
		then('changeCallback is called twice with new item and old item', () => {
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

	it('Selecting second and prev item', () => {
		// GIVEN
		given('created baselist-datalist', () => bufferPromise);
		// WHEN
		when('select second and prev item', () => {
			dataList.selectAt(1);
			dataList.selectPrevItem();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', () => {
			expect(spySelect.withArgs('B', 1, 'A', 0))
				.callCount(1);
			expect(spySelect.withArgs('A', 0, 'B', 1))
				.callCount(1);
		});
		then('changeCallback is not called', () => {
			expect(spyChange)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Selecting prev index via buffer', () => {
		// GIVEN
		given('created baselist-datalist', () => bufferPromise);
		// WHEN
		when('select prev index', () => {
			buffer.selectPrevIndex();
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

	it('Selecting prev prev index via buffer', () => {
		// GIVEN
		given('created baselist-datalist', () => bufferPromise);
		// WHEN
		when('select prev prev index', () => {
			buffer.selectPrevIndex();
			buffer.selectPrevIndex();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', () => {
			expect(spySelect.withArgs('Z', 7, null, NaN))
				.callCount(1);
			expect(spySelect.withArgs('Y', 6, 'Z', 7))
				.callCount(1);
		});
		then('changeCallback is called once with new item and old item', () => {
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

	it('Selecting second item and prev index via buffer', () => {
		// GIVEN
		given('created baselist-datalist', () => bufferPromise);
		// WHEN
		when('select last item and prev index', () => {
			dataList.selectAt(1);
			buffer.selectPrevIndex();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', () => {
			expect(spySelect.withArgs('B', 1, 'A', 0))
				.callCount(1);
			expect(spySelect.withArgs('A', 0, 'B', 1))
				.callCount(1);
		});
		then('changeCallback is not called', () => {
			expect(spyChange)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Selecting prev line via buffer', () => {
		// GIVEN
		given('created baselist-datalist', () => bufferPromise);
		// WHEN
		when('select prev index', () => {
			buffer.selectPrevLine();
		});
		// THEN
		then('selectCallback is called once with new item and old item', () => {
			expect(spySelect)
				.calledWith('Y', 6, null, NaN)
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

	it('Selecting prev prev line via buffer', () => {
		// GIVEN
		given('created baselist-datalist', () => bufferPromise);
		// WHEN
		when('select prev prev line', () => {
			buffer.selectPrevLine();
			buffer.selectPrevLine();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', () => {
			expect(spySelect.withArgs('Y', 6, null, NaN))
				.callCount(1);
			expect(spySelect.withArgs('V', 3, 'Y', 6))
				.callCount(1);
		});
		then('changeCallback is called once with new item and old item', () => {
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

	it('Selecting second item and prev line via buffer', () => {
		// GIVEN
		given('created baselist-datalist', () => bufferPromise);
		// WHEN
		when('select second item and prev line', () => {
			dataList.selectAt(1);
			buffer.selectPrevLine();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', () => {
			expect(spySelect.withArgs('B', 1, 'A', 0))
				.callCount(1);
			expect(spySelect.withArgs('Z', 7, null, NaN))
				.callCount(1);
		});
		then('changeCallback is called once with new item and old item', () => {
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

	it('Selecting third item and prev line via buffer', () => {
		// GIVEN
		given('created baselist-datalist', () => bufferPromise);
		// WHEN
		when('select third item and prev line', () => {
			dataList.selectAt(2);
			buffer.selectPrevLine();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', () => {
			expect(spySelect.withArgs('C', 2, 'A', 0))
				.callCount(1);
			expect(spySelect.withArgs('X', 8, null, NaN))
				.callCount(1);
		});
		then('changeCallback is called once with new item and old item', () => {
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

	it('Selecting second line and prev line via buffer', () => {
		// GIVEN
		given('created baselist-datalist', () => bufferPromise);
		// WHEN
		when('select second line and prev line', () => {
			buffer.selectNextLine();
			buffer.selectPrevLine();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', () => {
			expect(spySelect.withArgs('D', 3, 'A', 0))
				.callCount(1);
			expect(spySelect.withArgs('A', 0, 'D', 3))
				.callCount(1);
		});
		then('changeCallback is not called', () => {
			expect(spyChange)
				.callCount(0);
		});
		// DONE
		return then('done');
	});
});
