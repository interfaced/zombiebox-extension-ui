describe('zb.ui.BaseListDataList: set source', function() {
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

	it('Setting empty DataList', function() {
		// GIVEN
		given('created empty baselist-datalist', function() {
			var dataList = helper.createEmptyDataList();
			return w.createListWithSource(dataList);
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

	it('Setting not empty DataList', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return w.createList();
		});
		// WHEN
		when('set source', function() {
			var dataList = helper.createDefaultDataList();
			return w.doSetSource(dataList, {
				padding: 1,
				lineSize: 3,
				loadOnLeft: 1
			});
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

	// Repeated setting

	it('Setting other DataList', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return w.createListWithSetupSource();
		});
		// WHEN
		when('set source', function() {
			var dataList = helper.createOtherDataList();
			return w.doSetSource(dataList);
		});
		// THEN
		then('changedCallback called once with corresponding set', function() {
			expect(w.po.spyChange)
				.callCount(1)
				.calledWith([
					'alpha', 'beta', 'gamma',
					'delta', 'epsilon', 'zeta'
				]);
		});
		then('selectedCallback called once with first item', function() {
			expect(w.po.spySelected)
				.callCount(1)
				.calledWith('alpha', 0, null, NaN);
		});
		// DONE
		return then('done');
	});

	it('Re-setting same DataList', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return w.createListWithSetupSource();
		});
		// WHEN
		when('set source', function() {
			var dataList = helper.createDefaultDataList();
			return w.doSetSource(dataList);
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

	it('Re-setting same DataList after null', function() {
		var dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist', function() {
			return w.createListWithSource(dataList);
		});
		given('set null', function() {
			return w
				.doSetSource(null)
				.then(function() {
					w.po.spyChange.reset();
					w.po.spySelected.reset();
				});
		});
		// WHEN
		when('set source', function() {
			return w.doSetSource(dataList);
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

	// null

	it('Setting null', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return w.createListWithSource(null);
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

	it('Re-setting null', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return w.createListWithSource(null);
		});
		// WHEN
		when('set source', function() {
			return w.doSetSource(null);
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

	it('Setting null after DataList', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			var dataList = helper.createDefaultDataList();
			return w.createListWithSource(dataList);
		});
		// WHEN
		when('set source', function() {
			return w.doSetSource(null);
		});
		// THEN
		then('changedCallback called once with corresponding set', function() {
			expect(w.po.spyChange)
				.callCount(1)
				.calledWith([]);
		});
		then('selectedCallback not called', function() {
			expect(w.po.spySelected).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Setting DataList after null', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return w.createListWithSource(null);
		});
		// WHEN
		when('set source', function() {
			var dataList = helper.createDefaultDataList();
			return w.doSetSource(dataList);
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
});
