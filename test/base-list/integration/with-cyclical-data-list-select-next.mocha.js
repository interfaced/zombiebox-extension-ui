describe('zb.ui.BaseListDataList with zb.ui.CyclicalDataList: select next', function() {
	var expect = chai.expect;
	var given = mochaTestSteps.given;
	var when = mochaTestSteps.when;
	var then = mochaTestSteps.then;

	var dataList, buffer, bufferPromise, spyChange, spySelect;
	var helper = zb.ui.test.support.Helper;

	beforeEach(function() {
		dataList = new zb.ui.CyclicalDataList(helper.createDefaultArray());
		bufferPromise = helper
			.createBuffer(dataList)
			.then(function(result) {
				spySelect.reset();
				spyChange.reset();

				buffer = result;

				return result;
			});

		spySelect = sinon.spy(helper, 'selectCallback');
		spyChange = sinon.spy(helper, 'changeCallback');
	});
	afterEach(function() {
		spySelect.restore();
		spyChange.restore();
	});

	it('Selecting next item', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return bufferPromise;
		});
		// WHEN
		when('select next item', function() {
			dataList.selectNextItem();
		});
		// THEN
		then('selectCallback is called once with new item and old item', function() {
			expect(spySelect)
				.calledWith('B', 1, 'A', 0)
				.callCount(1);
		});
		then('changeCallback is not called', function() {
			expect(spyChange)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Selecting next next item', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return bufferPromise;
		});
		// WHEN
		when('select next next item', function() {
			dataList.selectNextItem();
			dataList.selectNextItem();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', function() {
			expect(spySelect.withArgs('B', 1, 'A', 0))
				.callCount(1);
			expect(spySelect.withArgs('C', 2, 'B', 1))
				.callCount(1);
		});
		then('changeCallback is not called', function() {
			expect(spyChange)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Selecting last but one and last item', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return bufferPromise;
		});
		// WHEN
		when('select last but one and next item', function() {
			dataList.selectAt(dataList.size() - 2);
			dataList.selectNextItem();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', function() {
			expect(spySelect.withArgs('Y', 6, null, NaN))
				.callCount(1);
			expect(spySelect.withArgs('Z', 7, 'Y', 6))
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

	it('Selecting next after last item', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return bufferPromise;
		});
		// WHEN
		when('select last and next item', function() {
			dataList.selectLast();
			dataList.selectNextItem();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', function() {
			expect(spySelect.withArgs('Z', 7, null, NaN))
				.callCount(1);
			expect(spySelect.withArgs('A', 0, null, NaN))
				.callCount(1);
		});
		then('changeCallback is called twice with new buffer contents', function() {
			expect(spyChange.withArgs([
					'S', 'T', 'U',
					'V', 'W', 'X',
					'Y', 'Z'
				]))
				.callCount(1);
			expect(spyChange.withArgs([
					'A', 'B', 'C',
					'D', 'E', 'F',
					'G', 'H', 'I'
				]))
				.callCount(1);
		});
		// DONE
		return then('done');
	});

	it('Selecting next index via buffer', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return bufferPromise;
		});
		// WHEN
		when('select next index', function() {
			buffer.selectNextIndex();
		});
		// THEN
		then('selectCallback is called once with new item and old item', function() {
			expect(spySelect)
				.calledWith('B', 1, 'A', 0)
				.callCount(1);
		});
		then('changeCallback is not called', function() {
			expect(spyChange)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Selecting next next index via buffer', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return bufferPromise;
		});
		// WHEN
		when('select next next index', function() {
			buffer.selectNextIndex();
			buffer.selectNextIndex();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', function() {
			expect(spySelect.withArgs('B', 1, 'A', 0))
				.callCount(1);
			expect(spySelect.withArgs('C', 2, 'B', 1))
				.callCount(1);
		});
		then('changeCallback is not called', function() {
			expect(spyChange)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Selecting last but one item and next index via buffer', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return bufferPromise;
		});
		// WHEN
		when('select last item and next index', function() {
			dataList.selectAt(dataList.size() - 2);
			buffer.selectNextIndex();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', function() {
			expect(spySelect.withArgs('Y', 6, null, NaN))
				.callCount(1);
			expect(spySelect.withArgs('Z', 7, 'Y', 6))
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

	it('Selecting last item and next index via buffer', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return bufferPromise;
		});
		// WHEN
		when('select last item and next line', function() {
			dataList.selectLast();
			buffer.selectNextIndex();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', function() {
			expect(spySelect.withArgs('Z', 7, null, NaN))
				.callCount(1);
			expect(spySelect.withArgs('A', 0, null, NaN))
				.callCount(1);
		});
		then('changeCallback is called twice with new buffer contents', function() {
			expect(spyChange.withArgs([
					'S', 'T', 'U',
					'V', 'W', 'X',
					'Y', 'Z'
				]))
				.callCount(1);
			expect(spyChange.withArgs([
					'A', 'B', 'C',
					'D', 'E', 'F',
					'G', 'H', 'I'
				]))
				.callCount(1);
		});
		// DONE
		return then('done');
	});

	it('Selecting next line via buffer', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return bufferPromise;
		});
		// WHEN
		when('select next line', function() {
			buffer.selectNextLine();
		});
		// THEN
		then('selectCallback is called once with new item and old item', function() {
			expect(spySelect)
				.calledWith('D', 3, 'A', 0)
				.callCount(1);
		});
		then('changeCallback is not called', function() {
			expect(spyChange)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Selecting next next line via buffer', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return bufferPromise;
		});
		// WHEN
		when('select next next line', function() {
			buffer.selectNextLine();
			buffer.selectNextLine();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', function() {
			expect(spySelect.withArgs('D', 3, 'A', 0))
				.callCount(1);
			expect(spySelect.withArgs('G', 6, 'D', 3))
				.callCount(1);
		});
		then('changeCallback is called once with new buffer contents', function() {
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

	it('Selecting next item and next line via buffer', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return bufferPromise;
		});
		// WHEN
		when('select next item and next line', function() {
			dataList.selectNextItem();
			buffer.selectNextLine();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', function() {
			expect(spySelect.withArgs('B', 1, 'A', 0))
				.callCount(1);
			expect(spySelect.withArgs('E', 4, 'B', 1))
				.callCount(1);
		});
		then('changeCallback is not called', function() {
			expect(spyChange)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Selecting next next item and next line via buffer', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return bufferPromise;
		});
		// WHEN
		when('select next item and next line', function() {
			dataList.selectNextItem();
			dataList.selectNextItem();
			buffer.selectNextLine();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', function() {
			expect(spySelect.withArgs('B', 1, 'A', 0))
				.callCount(1);
			expect(spySelect.withArgs('C', 2, 'B', 1))
				.callCount(1);
			expect(spySelect.withArgs('F', 5, 'C', 2))
				.callCount(1);
		});
		then('changeCallback is not called', function() {
			expect(spyChange)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Selecting last but one line and next line via buffer', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return bufferPromise;
		});
		// WHEN
		when('select last but one line and next line', function() {
			dataList.selectAt(dataList.size() - 5);
			buffer.selectNextLine();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', function() {
			expect(spySelect.withArgs('V', 6, null, NaN))
				.callCount(1);
			expect(spySelect.withArgs('Y', 9, 'V', 6))
				.callCount(1);
		});
		then('changeCallback is called once with new buffer contents', function() {
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

	it('Selecting last but one item and next line via buffer', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return bufferPromise;
		});
		// WHEN
		when('select last but one item and next line', function() {
			dataList.selectAt(dataList.size() - 2);
			buffer.selectNextLine();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', function() {
			expect(spySelect.withArgs('Y', 6, null, NaN))
				.callCount(1);
			expect(spySelect.withArgs('A', 0, null, NaN))
				.callCount(1);
		});
		then('changeCallback is called twice with new buffer contents', function() {
			expect(spyChange.withArgs([
					'S', 'T', 'U',
					'V', 'W', 'X',
					'Y', 'Z'
				]))
				.callCount(1);
			expect(spyChange.withArgs([
					'A', 'B', 'C',
					'D', 'E', 'F',
					'G', 'H', 'I'
				]))
				.callCount(1);
		});
		// DONE
		return then('done');
	});

	it('Selecting last but two item and next line via buffer', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return bufferPromise;
		});
		// WHEN
		when('select last but two item and next line', function() {
			dataList.selectAt(dataList.size() - 3);
			buffer.selectNextLine();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', function() {
			expect(spySelect.withArgs('X', 8, null, NaN))
				.callCount(1);
			expect(spySelect.withArgs('C', 2, null, NaN))
				.callCount(1);
		});
		then('changeCallback is called twice with new buffer contents', function() {
			expect(spyChange.withArgs([
					'P', 'Q', 'R',
					'S', 'T', 'U',
					'V', 'W', 'X',
					'Y', 'Z'
				]))
				.callCount(1);
			expect(spyChange.withArgs([
					'A', 'B', 'C',
					'D', 'E', 'F',
					'G', 'H', 'I'
				]))
				.callCount(1);
		});
		// DONE
		return then('done');
	});

	it('Selecting last item and next line via buffer', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return bufferPromise;
		});
		// WHEN
		when('select last item and next line', function() {
			dataList.selectLast();
			buffer.selectNextLine();
		});
		// THEN
		then('selectCallback is called twice with new item and old item', function() {
			expect(spySelect.withArgs('Z', 7, null, NaN))
				.callCount(1);
			expect(spySelect.withArgs('B', 1, null, NaN))
				.callCount(1);
		});
		then('changeCallback is called twice with new buffer contents', function() {
			expect(spyChange.withArgs([
					'S', 'T', 'U',
					'V', 'W', 'X',
					'Y', 'Z'
				]))
				.callCount(1);
			expect(spyChange.withArgs([
					'A', 'B', 'C',
					'D', 'E', 'F',
					'G', 'H', 'I'
				]))
				.callCount(1);
		});
		// DONE
		return then('done');
	});
});
