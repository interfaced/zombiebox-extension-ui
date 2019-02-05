describe('zb.ui.BaseListDataList: change group of items', function() {
	var expect = chai.expect;
	var given = mochaTestSteps.given;
	var when = mochaTestSteps.when;
	var then = mochaTestSteps.then;

	var w = new zb.ui.test.support.World();
	var helper = zb.ui.test.support.Helper;
	mochaTestSteps.world(w);

	beforeEach(function() {
		w.setup.datalist = w.setup.createDataList();
		w.po.spyChange = sinon.spy(w.setup, 'changeCallback');
		w.po.spySelected = sinon.spy(w.setup, 'selectCallback');
	});

	afterEach(function() {
		w.po.spyChange.restore();
		w.po.spySelected.restore();
	});

	it('Setting empty Array', function() {
		// GIVEN
		given('created empty baselist-datalist', function() {
			return w.createListWithSource(helper.createEmptyDataList());
		});
		// THEN
		then('changedCallback not called', function() {
			expect(w.po.spyChange).callCount(0);
		});
		then('selectedCallback not called', function() {
			expect(w.po.spySelected).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Re-setting empty Array', function() {
		// GIVEN
		given('created empty baselist-datalist', function() {
			return w.createListWithSource(helper.createEmptyDataList());
		});
		// WHEN
		when('set empty array of items', function() {
			var dataList = w.sut.list.getSource();
			return dataList.setItems(helper.createEmptyArray());
		});
		// THEN
		then('changedCallback not called', function() {
			expect(w.po.spyChange).callCount(0);
		});
		then('selectedCallback not called', function() {
			expect(w.po.spySelected).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Setting items to DataList with setItems method', function() {
		// GIVEN
		given('created empty baselist-datalist', function() {
			return w.createListWithSource(helper.createEmptyDataList());
		});
		// WHEN
		when('set array of items', function() {
			var dataList = w.sut.list.getSource();
			return dataList.setItems(helper.createDefaultArray());
		});
		// THEN
		then('changedCallback called once with corresponding set', function() {
			expect(w.po.spyChange)
				.callCount(1)
				.calledWith([
					'A', 'B', 'C',
					'D', 'E', 'F'
				]);
		});
		then('selectedCallback called once with first item', function() {
			expect(w.po.spySelected)
				.callCount(1)
				.calledWith('A', 0, null, NaN);
		});
		// DONE
		return then('done');
	});

	it('Clearing not empty DataList', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return w.createListWithSetupSource();
		});
		// WHEN
		when('set array of items', function() {
			var dataList = w.sut.list.getSource();
			return dataList.clear();
		});
		// THEN
		then('changedCallback called once with corresponding set', function() {
			expect(w.po.spyChange)
				.callCount(1)
				.calledWith([]);
		});
		then('selectedCallback called once with null item', function() {
			// Из-за особенностей DataList.clear(), будет вызываться selectCallback.
			// Не сильно критично, но по логике этот вызов не нужен.
			expect(w.po.spySelected)
				.callCount(1)
				.calledWith(null, NaN, 'A', 0);
		});
		// DONE
		return then('done');
	});

	it('Clearing empty DataList', function() {
		// GIVEN
		given('created empty baselist-datalist', function() {
			return w.createListWithSource(helper.createEmptyDataList());
		});
		// WHEN
		when('set array of items', function() {
			var dataList = w.sut.list.getSource();
			return dataList.clear();
		});
		// THEN
		then('changedCallback not called', function() {
			expect(w.po.spyChange).callCount(0);
		});
		then('selectedCallback not called', function() {
			expect(w.po.spySelected).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Adding empty array to empty DataList', function() {
		// GIVEN
		given('created empty baselist-datalist', function() {
			return w.createListWithSource(helper.createEmptyDataList());
		});
		// WHEN
		when('set array of items', function() {
			var dataList = w.sut.list.getSource();
			var array = helper.createEmptyArray();
			return dataList.addItems(array);
		});
		// THEN
		then('changedCallback not called', function() {
			expect(w.po.spyChange).callCount(0);
		});
		then('selectedCallback not called', function() {
			expect(w.po.spySelected).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Adding empty array to filled DataList', function() {
		// GIVEN
		given('created empty baselist-datalist', function() {
			return w.createListWithSetupSource();
		});
		// WHEN
		when('set array of items', function() {
			var dataList = w.sut.list.getSource();
			var array = helper.createEmptyArray();
			return dataList.addItems(array);
		});
		// THEN
		then('changedCallback not called', function() {
			expect(w.po.spyChange).callCount(0);
		});
		then('selectedCallback not called', function() {
			expect(w.po.spySelected).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Adding filled array to empty DataList', function() {
		// GIVEN
		given('created empty baselist-datalist', function() {
			return w.createListWithSource(helper.createEmptyDataList());
		});
		// WHEN
		when('set array of items', function() {
			var dataList = w.sut.list.getSource();
			var array = helper.createDefaultArray();
			return dataList.addItems(array);
		});
		// THEN
		then('changedCallback called once with corresponding set', function() {
			expect(w.po.spyChange)
				.callCount(1)
				.calledWith([
					'A', 'B', 'C',
					'D', 'E', 'F'
				]);
		});
		then('selectedCallback called once with A item', function() {
			expect(w.po.spySelected)
				.callCount(1)
				.calledWith('A', 0, null, NaN);
		});
		// DONE
		return then('done');
	});

	it('Adding filled array to filled DataList', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return w.createListWithSetupSource();
		});
		// WHEN
		when('set array of items', function() {
			var dataList = w.sut.list.getSource();
			var array = helper.createOtherArray();
			return dataList.addItems(array);
		});
		// THEN
		then('changedCallback not called', function() {
			expect(w.po.spyChange).callCount(0);
		});
		then('selectedCallback not called', function() {
			expect(w.po.spySelected).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Adding array before buffer without line shifting', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return w.createListWithSetupSource();
		});
		given('selected element', function() {
			var dataList = w.sut.list.getSource();
			dataList.select('K');

			w.po.spyChange.reset();
			w.po.spySelected.reset();
		});
		// WHEN
		when('set array of items', function() {
			var dataList = w.sut.list.getSource();
			var array = helper.createOtherArray().slice(0, 3);
			return dataList.addItemsAt(array, 0);
		});
		// THEN
		then('changedCallback not called', function() {
			expect(w.po.spyChange).callCount(0);
		});
		then('selectedCallback not called', function() {
			expect(w.po.spySelected).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Adding array before buffer with line shifting', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return w.createListWithSetupSource();
		});
		given('selected element', function() {
			var dataList = w.sut.list.getSource();
			dataList.select('K');

			w.po.spyChange.reset();
			w.po.spySelected.reset();
		});
		// WHEN
		when('set array of items', function() {
			var dataList = w.sut.list.getSource();
			var array = helper.createOtherArray().slice(0, 2);
			return dataList.addItemsAt(array, 0);
		});
		// THEN
		then('changedCallback called once with corresponding set', function() {
			expect(w.po.spyChange)
				.callCount(1)
				.calledWith([
					'H', 'I', 'J',
					'K', 'L', 'M',
					'N', 'O', 'P'
				]);
		});
		then('selectedCallback not called', function() {
			expect(w.po.spySelected).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Adding array after buffer', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return w.createListWithSetupSource();
		});
		// WHEN
		when('set array of items', function() {
			var dataList = w.sut.list.getSource();
			var array = helper.createOtherArray().slice(0, 3);
			return dataList.addItemsAt(array, dataList.size());
		});
		// THEN
		then('changedCallback not called', function() {
			expect(w.po.spyChange).callCount(0);
		});
		then('selectedCallback not called', function() {
			expect(w.po.spySelected).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Adding array in buffer before selected element without line shifting', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return w.createListWithSetupSource();
		});
		// WHEN
		when('set array of items', function() {
			var dataList = w.sut.list.getSource();
			var array = helper.createOtherArray().slice(0, 3);
			return dataList.addItemsAt(array, 0);
		});
		// THEN
		then('changedCallback called once with corresponding set', function() {
			expect(w.po.spyChange)
				.callCount(1)
				.calledWith([
					'alpha', 'beta', 'gamma',
					'A', 'B', 'C',
					'D', 'E', 'F'
				]);
		});
		then('selectedCallback not called', function() {
			expect(w.po.spySelected).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Adding double array in buffer before selected element without line shifting', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return w.createListWithSetupSource();
		});
		// WHEN
		when('set array of items', function() {
			var dataList = w.sut.list.getSource();
			var array = helper.createOtherArray().slice(0, 6);
			return dataList.addItemsAt(array, 0);
		});
		// THEN
		then('changedCallback called once with corresponding set', function() {
			expect(w.po.spyChange)
				.callCount(1)
				.calledWith([
					'delta', 'epsilon', 'zeta',
					'A', 'B', 'C',
					'D', 'E', 'F'
				]);
		});
		then('selectedCallback not called', function() {
			expect(w.po.spySelected).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Adding array in buffer before selected element with line shifting', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return w.createListWithSetupSource();
		});
		// WHEN
		when('set array of items', function() {
			var dataList = w.sut.list.getSource();
			var array = helper.createOtherArray().slice(0, 2);
			return dataList.addItemsAt(array, 0);
		});
		// THEN
		then('changedCallback called once with corresponding set', function() {
			expect(w.po.spyChange)
				.callCount(1)
				.calledWith([
					'alpha', 'beta', 'A',
					'B', 'C', 'D'
				]);
		});
		then('selectedCallback not called', function() {
			expect(w.po.spySelected).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Adding array in buffer after selected element', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return w.createListWithSetupSource();
		});
		// WHEN
		when('set array of items', function() {
			var dataList = w.sut.list.getSource();
			var array = helper.createOtherArray().slice(0, 3);
			return dataList.addItemsAt(array, 1);
		});
		// THEN
		then('changedCallback called once with corresponding set', function() {
			expect(w.po.spyChange)
				.callCount(1)
				.calledWith([
					'A', 'alpha', 'beta',
					'gamma', 'B', 'C'
				]);
		});
		then('selectedCallback not called', function() {
			expect(w.po.spySelected).callCount(0);
		});
		// DONE
		return then('done');
	});
});
