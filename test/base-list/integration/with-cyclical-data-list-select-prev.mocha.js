describe('zb.ui.BaseListDataList with zb.ui.CyclicalDataList: select prev', function() {
	var expect = chai.expect;
	var given = mochaTestSteps.given;
	var when = mochaTestSteps.when;
	var then = mochaTestSteps.then;

	var dataList, buffer, bufferPromise, spyChange, spySelect;
	var helper = zb.ui.test.baseListHelper;

	beforeEach(function() {
		buffer = helper.createBuffer();
		dataList = new zb.ui.CyclicalDataList(helper.createDefaultArray());
		bufferPromise = helper
			.setBufferSource(buffer, dataList)
			.then(function() {
				spyChange.reset();
				spySelect.reset();
			});

		spyChange = sinon.spy(helper, 'changeCallback');
		spySelect = sinon.spy(helper, 'selectCallback');
	});
	afterEach(function() {
		spyChange.restore();
		spySelect.restore();
	});

	it('Selecting prev item', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return bufferPromise;
		});
		// WHEN
		when('select prev item', function() {
			dataList.selectPrevItem();
		});
		// THEN
		then('selectCallback is called once with new item and old item', function() {
			expect(spySelect)
				.calledWith('Z', 7, null, NaN)
				.callCount(1);
		});
		then('changeCallback is called once with new buffer contents', function() {
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

	it('Selecting prev prev item', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return bufferPromise;
		});
		// WHEN
		when('select prev prev item', function() {
			dataList.selectPrevItem();
			dataList.selectPrevItem();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', function() {
			expect(spySelect.withArgs('Z', 7, null, NaN))
				.callCount(1);
			expect(spySelect.withArgs('Y', 6, 'Z', 7))
				.callCount(1);
		});
		then('changeCallback is called twice with new item and old item', function() {
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

	it('Selecting second and prev item', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return bufferPromise;
		});
		// WHEN
		when('select second and prev item', function() {
			dataList.selectAt(1);
			dataList.selectPrevItem();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', function() {
			expect(spySelect.withArgs('B', 1, 'A', 0))
				.callCount(1);
			expect(spySelect.withArgs('A', 0, 'B', 1))
				.callCount(1);
		});
		then('changeCallback is not called', function() {
			expect(spyChange)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Selecting prev index via buffer', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return bufferPromise;
		});
		// WHEN
		when('select prev index', function() {
			buffer.selectPrevIndex();
		});
		// THEN
		then('selectCallback is called once with new item and old item', function() {
			expect(spySelect)
				.calledWith('Z', 7, null, NaN)
				.callCount(1);
		});
		then('changeCallback is called once with new buffer contents', function() {
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

	it('Selecting prev prev index via buffer', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return bufferPromise;
		});
		// WHEN
		when('select prev prev index', function() {
			buffer.selectPrevIndex();
			buffer.selectPrevIndex();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', function() {
			expect(spySelect.withArgs('Z', 7, null, NaN))
				.callCount(1);
			expect(spySelect.withArgs('Y', 6, 'Z', 7))
				.callCount(1);
		});
		then('changeCallback is called once with new item and old item', function() {
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

	it('Selecting second item and prev index via buffer', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return bufferPromise;
		});
		// WHEN
		when('select last item and prev index', function() {
			dataList.selectAt(1);
			buffer.selectPrevIndex();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', function() {
			expect(spySelect.withArgs('B', 1, 'A', 0))
				.callCount(1);
			expect(spySelect.withArgs('A', 0, 'B', 1))
				.callCount(1);
		});
		then('changeCallback is not called', function() {
			expect(spyChange)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Selecting prev line via buffer', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return bufferPromise;
		});
		// WHEN
		when('select prev index', function() {
			buffer.selectPrevLine();
		});
		// THEN
		then('selectCallback is called once with new item and old item', function() {
			expect(spySelect)
				.calledWith('Y', 6, null, NaN)
				.callCount(1);
		});
		then('changeCallback is called once with new buffer contents', function() {
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

	it('Selecting prev prev line via buffer', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return bufferPromise;
		});
		// WHEN
		when('select prev prev line', function() {
			buffer.selectPrevLine();
			buffer.selectPrevLine();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', function() {
			expect(spySelect.withArgs('Y', 6, null, NaN))
				.callCount(1);
			expect(spySelect.withArgs('V', 3, 'Y', 6))
				.callCount(1);
		});
		then('changeCallback is called once with new item and old item', function() {
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

	it('Selecting second item and prev line via buffer', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return bufferPromise;
		});
		// WHEN
		when('select second item and prev line', function() {
			dataList.selectAt(1);
			buffer.selectPrevLine();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', function() {
			expect(spySelect.withArgs('B', 1, 'A', 0))
				.callCount(1);
			expect(spySelect.withArgs('Z', 7, null, NaN))
				.callCount(1);
		});
		then('changeCallback is called once with new item and old item', function() {
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

	it('Selecting third item and prev line via buffer', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return bufferPromise;
		});
		// WHEN
		when('select third item and prev line', function() {
			dataList.selectAt(2);
			buffer.selectPrevLine();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', function() {
			expect(spySelect.withArgs('C', 2, 'A', 0))
				.callCount(1);
			expect(spySelect.withArgs('X', 8, null, NaN))
				.callCount(1);
		});
		then('changeCallback is called once with new item and old item', function() {
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

	it('Selecting second line and prev line via buffer', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return bufferPromise;
		});
		// WHEN
		when('select second line and prev line', function() {
			buffer.selectNextLine();
			buffer.selectPrevLine();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', function() {
			expect(spySelect.withArgs('D', 3, 'A', 0))
				.callCount(1);
			expect(spySelect.withArgs('A', 0, 'D', 3))
				.callCount(1);
		});
		then('changeCallback is not called', function() {
			expect(spyChange)
				.callCount(0);
		});
		// DONE
		return then('done');
	});
});
