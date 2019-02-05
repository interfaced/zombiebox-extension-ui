describe('zb.ui.widgets.BaseListDataList: set source', () => {
	const expect = chai.expect;
	const given = mochaTestSteps.given;
	const when = mochaTestSteps.when;
	const then = mochaTestSteps.then;

	let buffer;
	let spyChange;
	let spySelect;
	const helper = zb.ui.test.baseListHelper;

	beforeEach(() => {
		buffer = helper.createBuffer({
			padding: 1,
			lineSize: 3,
			loadOnLeft: 1
		});

		spyChange = sinon.spy(helper, 'changeCallback');
		spySelect = sinon.spy(helper, 'selectCallback');
	});
	afterEach(() => {
		spyChange.restore();
		spySelect.restore();
	});

	it('Setting empty zb.ui.data.List', () => {
		// GIVEN
		given('empty given to fix mocha-test-steps bug', () => {});
		// WHEN
		when('set empty data-list', () => {
			const dataList = helper.createEmptyDataList();
			return helper.setBufferSource(buffer, dataList);
		});
		// THEN
		then('changeCallback not called', () => {
			expect(spyChange)
				.callCount(0);
		});
		then('selectCallback not called', () => {
			expect(spySelect)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Setting not empty zb.ui.data.List', () => {
		// GIVEN
		given('empty given to fix mocha-test-steps bug', () => {});
		// WHEN
		when('set default data-list', () => {
			const dataList = helper.createDefaultDataList();
			return helper.setBufferSource(buffer, dataList);
		});
		// THEN
		then('changeCallback called once with corresponding set', () => {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'A', 'B', 'C',
					'D', 'E', 'F'
				]);
		});
		then('selectCallback called once with first item', () => {
			expect(spySelect)
				.callCount(1)
				.calledWith('A', 0, null, NaN);
		});
		// DONE
		return then('done');
	});

	// Repeated setting

	it('Setting other zb.ui.data.List', () => {
		// GIVEN
		given('set default data-list', () => {
			const dataList = helper.createDefaultDataList();
			return helper
				.setBufferSource(buffer, dataList)
				.then(() => {
					spyChange.resetHistory();
					spySelect.resetHistory();
				});
		});
		// WHEN
		when('set other data-list', () => {
			const dataList = helper.createOtherDataList();
			return helper.setBufferSource(buffer, dataList);
		});
		// THEN
		then('changeCallback called once with corresponding set', () => {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'alpha', 'beta', 'gamma',
					'delta', 'epsilon', 'zeta'
				]);
		});
		then('selectCallback called once with first item', () => {
			expect(spySelect)
				.callCount(1)
				.calledWith('alpha', 0, null, NaN);
		});
		// DONE
		return then('done');
	});

	it('Re-setting same zb.ui.data.List', () => {
		const dataList = helper.createDefaultDataList();

		// GIVEN
		given('set default data-list', () => helper
			.setBufferSource(buffer, dataList)
			.then(() => {
				spyChange.resetHistory();
				spySelect.resetHistory();
			}));
		// WHEN
		when('set same data-list', () => helper.setBufferSource(buffer, dataList));
		// THEN
		then('changeCallback not called', () => {
			expect(spyChange)
				.callCount(0);
		});
		then('selectCallback not called', () => {
			expect(spySelect)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Re-setting almost same zb.ui.data.List', () => {
		// GIVEN
		given('set default data-list', () => {
			const dataList = helper.createDefaultDataList();
			return helper
				.setBufferSource(buffer, dataList)
				.then(() => {
					spyChange.resetHistory();
					spySelect.resetHistory();
				});
		});
		// WHEN
		when('set almost same data-list', () => {
			const dataList = helper.createDefaultDataList();
			return helper.setBufferSource(buffer, dataList);
		});
		// THEN
		then('changeCallback not called', () => {
			expect(spyChange)
				.callCount(0);
		});
		then('selectCallback not called', () => {
			expect(spySelect)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Re-setting same zb.ui.data.List after null', () => {
		const dataList = helper.createDefaultDataList();

		// GIVEN
		given('set default data-list', () => helper.setBufferSource(buffer, dataList));
		given('set null', () => helper
			.setBufferSource(buffer, null)
			.then(() => {
				spyChange.resetHistory();
				spySelect.resetHistory();
			}));
		// WHEN
		when('set same data-list', () => helper.setBufferSource(buffer, dataList));
		// THEN
		then('changeCallback called once with corresponding set', () => {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'A', 'B', 'C',
					'D', 'E', 'F'
				]);
		});
		then('selectCallback called once with first item', () => {
			expect(spySelect)
				.callCount(1)
				.calledWith('A', 0, null, NaN);
		});
		// DONE
		return then('done');
	});

	// null

	it('Setting null', () => {
		// GIVEN
		given('empty given to fix mocha-test-steps bug', () => {});
		// WHEN
		when('set null', () => helper.setBufferSource(buffer, null));
		// THEN
		then('changeCallback not called', () => {
			expect(spyChange)
				.callCount(0);
		});
		then('selectCallback not called', () => {
			expect(spySelect)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Re-setting null', () => {
		// GIVEN
		given('set null', () => helper
			.setBufferSource(buffer, null)
			.then(() => {
				spyChange.resetHistory();
				spySelect.resetHistory();
			}));
		// WHEN
		when('re-set null', () => helper.setBufferSource(buffer, null));
		// THEN
		then('changeCallback not called', () => {
			expect(spyChange)
				.callCount(0);
		});
		then('selectCallback not called', () => {
			expect(spySelect)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Setting null after zb.ui.data.List', () => {
		// GIVEN
		given('set default data-list', () => {
			const dataList = helper.createDefaultDataList();
			return helper
				.setBufferSource(buffer, dataList)
				.then(() => {
					spyChange.resetHistory();
					spySelect.resetHistory();
				});
		});
		// WHEN
		when('set null', () => helper.setBufferSource(buffer, null));
		// THEN
		then('changeCallback called once with corresponding set', () => {
			expect(spyChange)
				.callCount(1)
				.calledWith([]);
		});
		then('selectCallback not called', () => {
			expect(spySelect)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Setting zb.ui.data.List after null', () => {
		// GIVEN
		given('set null', () => helper
			.setBufferSource(buffer, null)
			.then(() => {
				spyChange.resetHistory();
				spySelect.resetHistory();
			}));
		// WHEN
		when('set default data-list', () => {
			const dataList = helper.createDefaultDataList();
			return helper.setBufferSource(buffer, dataList);
		});
		// THEN
		then('changeCallback called once with corresponding set', () => {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'A', 'B', 'C',
					'D', 'E', 'F'
				]);
		});
		then('selectCallback called once with first item', () => {
			expect(spySelect)
				.callCount(1)
				.calledWith('A', 0, null, NaN);
		});
		// DONE
		return then('done');
	});
});
