describe('zb.ui.widgets.BaseListDataList: change group of items', () => {
	const expect = chai.expect;
	const given = mochaTestSteps.given;
	const when = mochaTestSteps.when;
	const then = mochaTestSteps.then;

	let buffer;
	let spyChange;
	let spySelect;
	const helper = zb.ui.test.baseListHelper;

	beforeEach(() => {
		buffer = helper.createBuffer();

		spyChange = sinon.spy(helper, 'changeCallback');
		spySelect = sinon.spy(helper, 'selectCallback');
	});

	afterEach(() => {
		spyChange.restore();
		spySelect.restore();
	});

	it('Setting empty zb.ui.data.List', () => {
		const dataList = helper.createEmptyDataList();

		// GIVEN
		given('created empty baselist-datalist', () => helper.setBufferSource(buffer, dataList));
		// THEN
		then('changeCallback not called', () => {
			expect(spyChange).callCount(0);
		});
		then('selectCallback not called', () => {
			expect(spySelect).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Re-setting empty Array', () => {
		const dataList = helper.createEmptyDataList();

		// GIVEN
		given('created empty baselist-datalist', () => helper
			.setBufferSource(buffer, dataList)
			.then(() => {
				spyChange.resetHistory();
				spySelect.resetHistory();
			}));
		// WHEN
		when('set empty array of items', () => dataList.setItems(helper.createEmptyArray()));
		// THEN
		then('changeCallback not called', () => {
			expect(spyChange).callCount(0);
		});
		then('selectCallback not called', () => {
			expect(spySelect).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Setting items to zb.ui.data.List with setItems method', () => {
		const dataList = helper.createEmptyDataList();

		// GIVEN
		given('created empty baselist-datalist', () => helper
			.setBufferSource(buffer, dataList)
			.then(() => {
				spyChange.resetHistory();
				spySelect.resetHistory();
			}));
		// WHEN
		when('set array of items', () => dataList.setItems(helper.createDefaultArray()));
		// THEN
		then('changeCallback called once with corresponding set', () => {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'A', 'B', 'C',
					'D', 'E', 'F',
					'G', 'H', 'I'
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

	it('Clearing not empty zb.ui.data.List', () => {
		const dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist', () => helper
			.setBufferSource(buffer, dataList)
			.then(() => {
				spyChange.resetHistory();
				spySelect.resetHistory();
			}));
		// WHEN
		when('set array of items', () => dataList.clear());
		// THEN
		then('changeCallback called once with corresponding set', () => {
			expect(spyChange)
				.callCount(1)
				.calledWith([]);
		});
		then('selectCallback called once with null item', () => {
			// Из-за особенностей zb.ui.data.List.clear(), будет вызываться selectCallback.
			// Не сильно критично, но по логике этот вызов не нужен.
			expect(spySelect)
				.callCount(1)
				.calledWith(null, NaN, 'A', 0);
		});
		// DONE
		return then('done');
	});

	it('Clearing empty zb.ui.data.List', () => {
		const dataList = helper.createEmptyDataList();

		// GIVEN
		given('created empty baselist-datalist', () => helper
			.setBufferSource(buffer, dataList)
			.then(() => {
				spyChange.resetHistory();
				spySelect.resetHistory();
			}));
		// WHEN
		when('set array of items', () => dataList.clear());
		// THEN
		then('changeCallback not called', () => {
			expect(spyChange).callCount(0);
		});
		then('selectCallback not called', () => {
			expect(spySelect).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Adding empty array to empty zb.ui.data.List', () => {
		const dataList = helper.createEmptyDataList();

		// GIVEN
		given('created empty baselist-datalist', () => helper
			.setBufferSource(buffer, dataList)
			.then(() => {
				spyChange.resetHistory();
				spySelect.resetHistory();
			}));
		// WHEN
		when('set array of items', () => {
			const array = helper.createEmptyArray();
			return dataList.addItems(array);
		});
		// THEN
		then('changeCallback not called', () => {
			expect(spyChange).callCount(0);
		});
		then('selectCallback not called', () => {
			expect(spySelect).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Adding empty array to filled zb.ui.data.List', () => {
		const dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist', () => helper
			.setBufferSource(buffer, dataList)
			.then(() => {
				spyChange.resetHistory();
				spySelect.resetHistory();
			}));
		// WHEN
		when('set array of items', () => {
			const array = helper.createEmptyArray();
			return dataList.addItems(array);
		});
		// THEN
		then('changeCallback not called', () => {
			expect(spyChange).callCount(0);
		});
		then('selectCallback not called', () => {
			expect(spySelect).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Adding filled array to empty zb.ui.data.List', () => {
		const dataList = helper.createEmptyDataList();

		// GIVEN
		given('created empty baselist-datalist', () => helper
			.setBufferSource(buffer, dataList)
			.then(() => {
				spyChange.resetHistory();
				spySelect.resetHistory();
			}));
		// WHEN
		when('set array of items', () => {
			const array = helper.createDefaultArray();
			return dataList.addItems(array);
		});
		// THEN
		then('changeCallback called once with corresponding set', () => {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'A', 'B', 'C',
					'D', 'E', 'F',
					'G', 'H', 'I'
				]);
		});
		then('selectCallback called once with A item', () => {
			expect(spySelect)
				.callCount(1)
				.calledWith('A', 0, null, NaN);
		});
		// DONE
		return then('done');
	});

	it('Adding filled array to filled zb.ui.data.List', () => {
		const dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist', () => helper
			.setBufferSource(buffer, dataList)
			.then(() => {
				spyChange.resetHistory();
				spySelect.resetHistory();
			}));
		// WHEN
		when('set array of items', () => {
			const array = helper.createOtherArray();
			return dataList.addItems(array);
		});
		// THEN
		then('changeCallback not called', () => {
			expect(spyChange).callCount(0);
		});
		then('selectCallback not called', () => {
			expect(spySelect).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Adding array before buffer without line shifting', () => {
		const dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist', () => helper
			.setBufferSource(buffer, dataList)
			.then(() => {
				dataList.select('K');

				spyChange.resetHistory();
				spySelect.resetHistory();
			}));
		// WHEN
		when('set array of items', () => {
			const array = helper.createOtherArray().slice(0, 3);
			return dataList.addItemsAt(array, 0);
		});
		// THEN
		then('changeCallback not called', () => {
			expect(spyChange).callCount(0);
		});
		then('selectCallback not called', () => {
			expect(spySelect).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Adding array before buffer with line shifting', () => {
		const dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist', () => helper
			.setBufferSource(buffer, dataList)
			.then(() => {
				dataList.select('K');

				spyChange.resetHistory();
				spySelect.resetHistory();
			}));
		// WHEN
		when('set array of items', () => {
			const array = helper.createOtherArray().slice(0, 2);
			return dataList.addItemsAt(array, 0);
		});
		// THEN
		then('changeCallback called once with corresponding set', () => {
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
		then('selectCallback not called', () => {
			expect(spySelect).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Adding array after buffer', () => {
		const dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist', () => helper
			.setBufferSource(buffer, dataList)
			.then(() => {
				spyChange.resetHistory();
				spySelect.resetHistory();
			}));
		// WHEN
		when('set array of items', () => {
			const array = helper.createOtherArray().slice(0, 3);
			return dataList.addItemsAt(array, dataList.size());
		});
		// THEN
		then('changeCallback not called', () => {
			expect(spyChange).callCount(0);
		});
		then('selectCallback not called', () => {
			expect(spySelect).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Adding array in buffer before selected element without line shifting', () => {
		const dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist', () => helper
			.setBufferSource(buffer, dataList)
			.then(() => {
				spyChange.resetHistory();
				spySelect.resetHistory();
			}));
		// WHEN
		when('set array of items', () => {
			const array = helper.createOtherArray().slice(0, 3);
			return dataList.addItemsAt(array, 0);
		});
		// THEN
		then('changeCallback called once with corresponding set', () => {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'alpha', 'beta', 'gamma',
					'A', 'B', 'C',
					'D', 'E', 'F',
					'G', 'H', 'I'
				]);
		});
		then('selectCallback not called', () => {
			expect(spySelect).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Adding double array in buffer before selected element without line shifting', () => {
		const dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist', () => helper
			.setBufferSource(buffer, dataList)
			.then(() => {
				spyChange.resetHistory();
				spySelect.resetHistory();
			}));
		// WHEN
		when('set array of items', () => {
			const array = helper.createOtherArray().slice(0, 6);
			return dataList.addItemsAt(array, 0);
		});
		// THEN
		then('changeCallback called once with corresponding set', () => {
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
		then('selectCallback not called', () => {
			expect(spySelect).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Adding array in buffer before selected element with line shifting', () => {
		const dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist', () => helper
			.setBufferSource(buffer, dataList)
			.then(() => {
				spyChange.resetHistory();
				spySelect.resetHistory();
			}));
		// WHEN
		when('set array of items', () => {
			const array = helper.createOtherArray().slice(0, 2);
			return dataList.addItemsAt(array, 0);
		});
		// THEN
		then('changeCallback called once with corresponding set', () => {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'alpha', 'beta', 'A',
					'B', 'C', 'D',
					'E', 'F', 'G'
				]);
		});
		then('selectCallback not called', () => {
			expect(spySelect).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Adding array in buffer after selected element', () => {
		const dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist', () => helper
			.setBufferSource(buffer, dataList)
			.then(() => {
				spyChange.resetHistory();
				spySelect.resetHistory();
			}));
		// WHEN
		when('set array of items', () => {
			const array = helper.createOtherArray().slice(0, 3);
			return dataList.addItemsAt(array, 1);
		});
		// THEN
		then('changeCallback called once with corresponding set', () => {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'A', 'alpha', 'beta',
					'gamma', 'B', 'C',
					'D', 'E', 'F'
				]);
		});
		then('selectCallback not called', () => {
			expect(spySelect).callCount(0);
		});
		// DONE
		return then('done');
	});
});
