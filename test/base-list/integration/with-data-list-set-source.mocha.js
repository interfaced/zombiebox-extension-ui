describe('zb.ui.BaseListDataList: set source', function() {
	var expect = chai.expect;
	var given = mochaTestSteps.given;
	var when = mochaTestSteps.when;
	var then = mochaTestSteps.then;

	var buffer, spyChange, spySelect;
	var helper = zb.ui.test.baseListHelper;

	beforeEach(function() {
		buffer = helper.createBuffer({
			padding: 1,
			lineSize: 3,
			loadOnLeft: 1
		});

		spyChange = sinon.spy(helper, 'changeCallback');
		spySelect = sinon.spy(helper, 'selectCallback');
	});
	afterEach(function() {
		spyChange.restore();
		spySelect.restore();
	});

	it('Setting empty DataList', function() {
		// GIVEN
		given('empty given to fix mocha-test-steps bug', function() {});
		// WHEN
		when('set empty data-list', function() {
			var dataList = helper.createEmptyDataList();
			return helper.setBufferSource(buffer, dataList);
		});
		// THEN
		then('changeCallback not called', function() {
			expect(spyChange)
				.callCount(0);
		});
		then('selectCallback not called', function() {
			expect(spySelect)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Setting not empty DataList', function() {
		// GIVEN
		given('empty given to fix mocha-test-steps bug', function() {});
		// WHEN
		when('set default data-list', function() {
			var dataList = helper.createDefaultDataList();
			return helper.setBufferSource(buffer, dataList);
		});
		// THEN
		then('changeCallback called once with corresponding set', function() {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'A', 'B', 'C',
					'D', 'E', 'F'
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

	// Repeated setting

	it('Setting other DataList', function() {
		// GIVEN
		given('set default data-list', function() {
			var dataList = helper.createDefaultDataList();
			return helper
				.setBufferSource(buffer, dataList)
				.then(function() {
					spyChange.reset();
					spySelect.reset();
				});
		});
		// WHEN
		when('set other data-list', function() {
			var dataList = helper.createOtherDataList();
			return helper.setBufferSource(buffer, dataList);
		});
		// THEN
		then('changeCallback called once with corresponding set', function() {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'alpha', 'beta', 'gamma',
					'delta', 'epsilon', 'zeta'
				]);
		});
		then('selectCallback called once with first item', function() {
			expect(spySelect)
				.callCount(1)
				.calledWith('alpha', 0, null, NaN);
		});
		// DONE
		return then('done');
	});

	it('Re-setting same DataList', function() {
		var dataList = helper.createDefaultDataList();

		// GIVEN
		given('set default data-list', function() {
			return helper
				.setBufferSource(buffer, dataList)
				.then(function() {
					spyChange.reset();
					spySelect.reset();
				});
		});
		// WHEN
		when('set same data-list', function() {
			return helper.setBufferSource(buffer, dataList);
		});
		// THEN
		then('changeCallback not called', function() {
			expect(spyChange)
				.callCount(0);
		});
		then('selectCallback not called', function() {
			expect(spySelect)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Re-setting almost same DataList', function() {
		// GIVEN
		given('set default data-list', function() {
			var dataList = helper.createDefaultDataList();
			return helper
				.setBufferSource(buffer, dataList)
				.then(function() {
					spyChange.reset();
					spySelect.reset();
				});
		});
		// WHEN
		when('set almost same data-list', function() {
			var dataList = helper.createDefaultDataList();
			return helper.setBufferSource(buffer, dataList);
		});
		// THEN
		then('changeCallback not called', function() {
			expect(spyChange)
				.callCount(0);
		});
		then('selectCallback not called', function() {
			expect(spySelect)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Re-setting same DataList after null', function() {
		var dataList = helper.createDefaultDataList();

		// GIVEN
		given('set default data-list', function() {
			return helper.setBufferSource(buffer, dataList);
		});
		given('set null', function() {
			return helper
				.setBufferSource(buffer, null)
				.then(function() {
					spyChange.reset();
					spySelect.reset();
				});
		});
		// WHEN
		when('set same data-list', function() {
			return helper.setBufferSource(buffer, dataList);
		});
		// THEN
		then('changeCallback called once with corresponding set', function() {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'A', 'B', 'C',
					'D', 'E', 'F'
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

	// null

	it('Setting null', function() {
		// GIVEN
		given('empty given to fix mocha-test-steps bug', function() {});
		// WHEN
		when('set null', function() {
			return helper.setBufferSource(buffer, null);
		});
		// THEN
		then('changeCallback not called', function() {
			expect(spyChange)
				.callCount(0);
		});
		then('selectCallback not called', function() {
			expect(spySelect)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Re-setting null', function() {
		// GIVEN
		given('set null', function() {
			return helper
				.setBufferSource(buffer, null)
				.then(function() {
					spyChange.reset();
					spySelect.reset();
				});
		});
		// WHEN
		when('re-set null', function() {
			return helper.setBufferSource(buffer, null);
		});
		// THEN
		then('changeCallback not called', function() {
			expect(spyChange)
				.callCount(0);
		});
		then('selectCallback not called', function() {
			expect(spySelect)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Setting null after DataList', function() {
		// GIVEN
		given('set default data-list', function() {
			var dataList = helper.createDefaultDataList();
			return helper
				.setBufferSource(buffer, dataList)
				.then(function() {
					spyChange.reset();
					spySelect.reset();
				});
		});
		// WHEN
		when('set null', function() {
			return helper.setBufferSource(buffer, null);
		});
		// THEN
		then('changeCallback called once with corresponding set', function() {
			expect(spyChange)
				.callCount(1)
				.calledWith([]);
		});
		then('selectCallback not called', function() {
			expect(spySelect)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Setting DataList after null', function() {
		// GIVEN
		given('set null', function() {
			return helper
				.setBufferSource(buffer, null)
				.then(function() {
					spyChange.reset();
					spySelect.reset();
				});
		});
		// WHEN
		when('set default data-list', function() {
			var dataList = helper.createDefaultDataList();
			return helper.setBufferSource(buffer, dataList);
		});
		// THEN
		then('changeCallback called once with corresponding set', function() {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'A', 'B', 'C',
					'D', 'E', 'F'
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
});
