describe('zb.ui.BaseListDataList: change group of items', function() {
	var expect = chai.expect;
	var given = mochaTestSteps.given;
	var when = mochaTestSteps.when;
	var then = mochaTestSteps.then;

	var buffer, spyChange, spySelect;
	var helper = zb.ui.test.baseListHelper;

	beforeEach(function() {
		buffer = helper.createBuffer();

		spyChange = sinon.spy(helper, 'changeCallback');
		spySelect = sinon.spy(helper, 'selectCallback');
	});

	afterEach(function() {
		spyChange.restore();
		spySelect.restore();
	});

	it('Setting empty DataList', function() {
		var dataList = helper.createEmptyDataList();

		// GIVEN
		given('created empty baselist-datalist', function() {
			return helper.setBufferSource(buffer, dataList);
		});
		// THEN
		then('changeCallback not called', function() {
			expect(spyChange).callCount(0);
		});
		then('selectCallback not called', function() {
			expect(spySelect).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Re-setting empty Array', function() {
		var dataList = helper.createEmptyDataList();

		// GIVEN
		given('created empty baselist-datalist', function() {
			return helper
				.setBufferSource(buffer, dataList)
				.then(function() {
					spyChange.reset();
					spySelect.reset();
				});
		});
		// WHEN
		when('set empty array of items', function() {
			return dataList.setItems(helper.createEmptyArray());
		});
		// THEN
		then('changeCallback not called', function() {
			expect(spyChange).callCount(0);
		});
		then('selectCallback not called', function() {
			expect(spySelect).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Setting items to DataList with setItems method', function() {
		var dataList = helper.createEmptyDataList();

		// GIVEN
		given('created empty baselist-datalist', function() {
			return helper
				.setBufferSource(buffer, dataList)
				.then(function() {
					spyChange.reset();
					spySelect.reset();
				});
		});
		// WHEN
		when('set array of items', function() {
			return dataList.setItems(helper.createDefaultArray());
		});
		// THEN
		then('changeCallback called once with corresponding set', function() {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'A', 'B', 'C',
					'D', 'E', 'F',
					'G', 'H', 'I'
				]);
		});
		then('selectCallback called once with first item', function() {
			expect(spySelect)
				.callCount(1)
				.calledWith('A', 0, null, NaN);
		});
		// DONE
		return then('done');
	});

	it('Clearing not empty DataList', function() {
		var dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist', function() {
			return helper
				.setBufferSource(buffer, dataList)
				.then(function() {
					spyChange.reset();
					spySelect.reset();
				});
		});
		// WHEN
		when('set array of items', function() {
			return dataList.clear();
		});
		// THEN
		then('changeCallback called once with corresponding set', function() {
			expect(spyChange)
				.callCount(1)
				.calledWith([]);
		});
		then('selectCallback called once with null item', function() {
			// Из-за особенностей DataList.clear(), будет вызываться selectCallback.
			// Не сильно критично, но по логике этот вызов не нужен.
			expect(spySelect)
				.callCount(1)
				.calledWith(null, NaN, 'A', 0);
		});
		// DONE
		return then('done');
	});

	it('Clearing empty DataList', function() {
		var dataList = helper.createEmptyDataList();

		// GIVEN
		given('created empty baselist-datalist', function() {
			return helper
				.setBufferSource(buffer, dataList)
				.then(function() {
					spyChange.reset();
					spySelect.reset();
				});
		});
		// WHEN
		when('set array of items', function() {
			return dataList.clear();
		});
		// THEN
		then('changeCallback not called', function() {
			expect(spyChange).callCount(0);
		});
		then('selectCallback not called', function() {
			expect(spySelect).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Adding empty array to empty DataList', function() {
		var dataList = helper.createEmptyDataList();

		// GIVEN
		given('created empty baselist-datalist', function() {
			return helper
				.setBufferSource(buffer, dataList)
				.then(function() {
					spyChange.reset();
					spySelect.reset();
				});
		});
		// WHEN
		when('set array of items', function() {
			var array = helper.createEmptyArray();
			return dataList.addItems(array);
		});
		// THEN
		then('changeCallback not called', function() {
			expect(spyChange).callCount(0);
		});
		then('selectCallback not called', function() {
			expect(spySelect).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Adding empty array to filled DataList', function() {
		var dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist', function() {
			return helper
				.setBufferSource(buffer, dataList)
				.then(function() {
					spyChange.reset();
					spySelect.reset();
				});
		});
		// WHEN
		when('set array of items', function() {
			var array = helper.createEmptyArray();
			return dataList.addItems(array);
		});
		// THEN
		then('changeCallback not called', function() {
			expect(spyChange).callCount(0);
		});
		then('selectCallback not called', function() {
			expect(spySelect).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Adding filled array to empty DataList', function() {
		var dataList = helper.createEmptyDataList();

		// GIVEN
		given('created empty baselist-datalist', function() {
			return helper
				.setBufferSource(buffer, dataList)
				.then(function() {
					spyChange.reset();
					spySelect.reset();
				});
		});
		// WHEN
		when('set array of items', function() {
			var array = helper.createDefaultArray();
			return dataList.addItems(array);
		});
		// THEN
		then('changeCallback called once with corresponding set', function() {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'A', 'B', 'C',
					'D', 'E', 'F',
					'G', 'H', 'I'
				]);
		});
		then('selectCallback called once with A item', function() {
			expect(spySelect)
				.callCount(1)
				.calledWith('A', 0, null, NaN);
		});
		// DONE
		return then('done');
	});

	it('Adding filled array to filled DataList', function() {
		var dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist', function() {
			return helper
				.setBufferSource(buffer, dataList)
				.then(function() {
					spyChange.reset();
					spySelect.reset();
				});
		});
		// WHEN
		when('set array of items', function() {
			var array = helper.createOtherArray();
			return dataList.addItems(array);
		});
		// THEN
		then('changeCallback not called', function() {
			expect(spyChange).callCount(0);
		});
		then('selectCallback not called', function() {
			expect(spySelect).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Adding array before buffer without line shifting', function() {
		var dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist', function() {
			return helper
				.setBufferSource(buffer, dataList)
				.then(function() {
					dataList.select('K');

					spyChange.reset();
					spySelect.reset();
				});
		});
		// WHEN
		when('set array of items', function() {
			var array = helper.createOtherArray().slice(0, 3);
			return dataList.addItemsAt(array, 0);
		});
		// THEN
		then('changeCallback not called', function() {
			expect(spyChange).callCount(0);
		});
		then('selectCallback not called', function() {
			expect(spySelect).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Adding array before buffer with line shifting', function() {
		var dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist', function() {
			return helper
				.setBufferSource(buffer, dataList)
				.then(function() {
					dataList.select('K');

					spyChange.reset();
					spySelect.reset();
				});
		});
		// WHEN
		when('set array of items', function() {
			var array = helper.createOtherArray().slice(0, 2);
			return dataList.addItemsAt(array, 0);
		});
		// THEN
		then('changeCallback called once with corresponding set', function() {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'E', 'F', 'G',
					'H', 'I', 'J',
					'K', 'L', 'M',
					'N', 'O', 'P',
					'Q', 'R', 'S'
				]);
		});
		then('selectCallback not called', function() {
			expect(spySelect).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Adding array after buffer', function() {
		var dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist', function() {
			return helper
				.setBufferSource(buffer, dataList)
				.then(function() {
					spyChange.reset();
					spySelect.reset();
				});
		});
		// WHEN
		when('set array of items', function() {
			var array = helper.createOtherArray().slice(0, 3);
			return dataList.addItemsAt(array, dataList.size());
		});
		// THEN
		then('changeCallback not called', function() {
			expect(spyChange).callCount(0);
		});
		then('selectCallback not called', function() {
			expect(spySelect).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Adding array in buffer before selected element without line shifting', function() {
		var dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist', function() {
			return helper
				.setBufferSource(buffer, dataList)
				.then(function() {
					spyChange.reset();
					spySelect.reset();
				});
		});
		// WHEN
		when('set array of items', function() {
			var array = helper.createOtherArray().slice(0, 3);
			return dataList.addItemsAt(array, 0);
		});
		// THEN
		then('changeCallback called once with corresponding set', function() {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'alpha', 'beta', 'gamma',
					'A', 'B', 'C',
					'D', 'E', 'F',
					'G', 'H', 'I'
				]);
		});
		then('selectCallback not called', function() {
			expect(spySelect).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Adding double array in buffer before selected element without line shifting', function() {
		var dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist', function() {
			return helper
				.setBufferSource(buffer, dataList)
				.then(function() {
					spyChange.reset();
					spySelect.reset();
				});
		});
		// WHEN
		when('set array of items', function() {
			var array = helper.createOtherArray().slice(0, 6);
			return dataList.addItemsAt(array, 0);
		});
		// THEN
		then('changeCallback called once with corresponding set', function() {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'alpha', 'beta', 'gamma',
					'delta', 'epsilon', 'zeta',
					'A', 'B', 'C',
					'D', 'E', 'F',
					'G', 'H', 'I'
				]);
		});
		then('selectCallback not called', function() {
			expect(spySelect).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Adding array in buffer before selected element with line shifting', function() {
		var dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist', function() {
			return helper
				.setBufferSource(buffer, dataList)
				.then(function() {
					spyChange.reset();
					spySelect.reset();
				});
		});
		// WHEN
		when('set array of items', function() {
			var array = helper.createOtherArray().slice(0, 2);
			return dataList.addItemsAt(array, 0);
		});
		// THEN
		then('changeCallback called once with corresponding set', function() {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'alpha', 'beta', 'A',
					'B', 'C', 'D',
					'E', 'F', 'G'
				]);
		});
		then('selectCallback not called', function() {
			expect(spySelect).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Adding array in buffer after selected element', function() {
		var dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist', function() {
			return helper
				.setBufferSource(buffer, dataList)
				.then(function() {
					spyChange.reset();
					spySelect.reset();
				});
		});
		// WHEN
		when('set array of items', function() {
			var array = helper.createOtherArray().slice(0, 3);
			return dataList.addItemsAt(array, 1);
		});
		// THEN
		then('changeCallback called once with corresponding set', function() {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'A', 'alpha', 'beta',
					'gamma', 'B', 'C',
					'D', 'E', 'F'
				]);
		});
		then('selectCallback not called', function() {
			expect(spySelect).callCount(0);
		});
		// DONE
		return then('done');
	});
});
