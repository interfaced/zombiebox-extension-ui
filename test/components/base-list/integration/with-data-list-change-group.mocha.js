import {
	createBuffer,
	setBufferSource,
	changeSpy,
	selectSpy,
	createDefaultDataList,
	createEmptyDataList,
	createEmptyArray,
	createDefaultArray,
	createOtherArray
} from '../helper';


describe('BaseListDataList: change group of items', () => {
	const expect = chai.expect;
	const given = mochaTestSteps.given;
	const when = mochaTestSteps.when;
	const then = mochaTestSteps.then;

	let buffer;

	beforeEach(() => {
		buffer = createBuffer();
	});

	it('Setting empty List', () => {
		const dataList = createEmptyDataList();

		given('created empty baselist-datalist', () => setBufferSource(buffer, dataList));

		then('changeCallback not called', () => {
			expect(changeSpy).callCount(0);
		});

		then('selectCallback not called', () => {
			expect(selectSpy).callCount(0);
		});

		return then('done');
	});

	it('Re-setting empty Array', () => {
		const dataList = createEmptyDataList();


		given('created empty baselist-datalist', () => setBufferSource(buffer, dataList)
			.then(() => {
				changeSpy.resetHistory();
				selectSpy.resetHistory();
			}));

		when('set empty array of items', () => dataList.setItems(createEmptyArray()));

		then('changeCallback not called', () => {
			expect(changeSpy).callCount(0);
		});

		then('selectCallback not called', () => {
			expect(selectSpy).callCount(0);
		});

		return then('done');
	});

	it('Setting items to List with setItems method', () => {
		const dataList = createEmptyDataList();


		given('created empty baselist-datalist', () => setBufferSource(buffer, dataList)
			.then(() => {
				changeSpy.resetHistory();
				selectSpy.resetHistory();
			}));

		when('set array of items', () => dataList.setItems(createDefaultArray()));

		then('changeCallback called once with corresponding set', () => {
			expect(changeSpy)
				.callCount(1)
				.calledWith([
					'A', 'B', 'C',
					'D', 'E', 'F',
					'G', 'H', 'I'
				]);
		});

		then('selectCallback called once with first item', () => {
			expect(selectSpy)
				.callCount(1)
				.calledWith('A', 0, null, NaN);
		});

		return then('done');
	});

	it('Clearing not empty List', () => {
		const dataList = createDefaultDataList();


		given('created baselist-datalist', () => setBufferSource(buffer, dataList)
			.then(() => {
				changeSpy.resetHistory();
				selectSpy.resetHistory();
			}));

		when('set array of items', () => dataList.clear());

		then('changeCallback called once with corresponding set', () => {
			expect(changeSpy)
				.callCount(1)
				.calledWith([]);
		});

		then('selectCallback called once with null item', () => {
			// Из-за особенностей List.clear(), будет вызываться selectCallback.
			// Не сильно критично, но по логике этот вызов не нужен.
			expect(selectSpy)
				.callCount(1)
				.calledWith(null, NaN, 'A', 0);
		});

		return then('done');
	});

	it('Clearing empty List', () => {
		const dataList = createEmptyDataList();


		given('created empty baselist-datalist', () => setBufferSource(buffer, dataList)
			.then(() => {
				changeSpy.resetHistory();
				selectSpy.resetHistory();
			}));

		when('set array of items', () => dataList.clear());

		then('changeCallback not called', () => {
			expect(changeSpy).callCount(0);
		});

		then('selectCallback not called', () => {
			expect(selectSpy).callCount(0);
		});

		return then('done');
	});

	it('Adding empty array to empty List', () => {
		const dataList = createEmptyDataList();


		given('created empty baselist-datalist', () => setBufferSource(buffer, dataList)
			.then(() => {
				changeSpy.resetHistory();
				selectSpy.resetHistory();
			}));

		when('set array of items', () => {
			const array = createEmptyArray();
			return dataList.addItems(array);
		});

		then('changeCallback not called', () => {
			expect(changeSpy).callCount(0);
		});

		then('selectCallback not called', () => {
			expect(selectSpy).callCount(0);
		});

		return then('done');
	});

	it('Adding empty array to filled List', () => {
		const dataList = createDefaultDataList();


		given('created baselist-datalist', () => setBufferSource(buffer, dataList)
			.then(() => {
				changeSpy.resetHistory();
				selectSpy.resetHistory();
			}));

		when('set array of items', () => {
			const array = createEmptyArray();
			return dataList.addItems(array);
		});

		then('changeCallback not called', () => {
			expect(changeSpy).callCount(0);
		});

		then('selectCallback not called', () => {
			expect(selectSpy).callCount(0);
		});

		return then('done');
	});

	it('Adding filled array to empty List', () => {
		const dataList = createEmptyDataList();


		given('created empty baselist-datalist', () => setBufferSource(buffer, dataList)
			.then(() => {
				changeSpy.resetHistory();
				selectSpy.resetHistory();
			}));

		when('set array of items', () => {
			const array = createDefaultArray();
			return dataList.addItems(array);
		});

		then('changeCallback called once with corresponding set', () => {
			expect(changeSpy)
				.callCount(1)
				.calledWith([
					'A', 'B', 'C',
					'D', 'E', 'F',
					'G', 'H', 'I'
				]);
		});

		then('selectCallback called once with A item', () => {
			expect(selectSpy)
				.callCount(1)
				.calledWith('A', 0, null, NaN);
		});

		return then('done');
	});

	it('Adding filled array to filled List', () => {
		const dataList = createDefaultDataList();


		given('created baselist-datalist', () => setBufferSource(buffer, dataList)
			.then(() => {
				changeSpy.resetHistory();
				selectSpy.resetHistory();
			}));

		when('set array of items', () => {
			const array = createOtherArray();
			return dataList.addItems(array);
		});

		then('changeCallback not called', () => {
			expect(changeSpy).callCount(0);
		});

		then('selectCallback not called', () => {
			expect(selectSpy).callCount(0);
		});

		return then('done');
	});

	it('Adding array before buffer without line shifting', () => {
		const dataList = createDefaultDataList();


		given('created baselist-datalist', () => setBufferSource(buffer, dataList)
			.then(() => {
				dataList.select('K');

				changeSpy.resetHistory();
				selectSpy.resetHistory();
			}));

		when('set array of items', () => {
			const array = createOtherArray().slice(0, 3);
			return dataList.addItemsAt(array, 0);
		});

		then('changeCallback not called', () => {
			expect(changeSpy).callCount(0);
		});

		then('selectCallback not called', () => {
			expect(selectSpy).callCount(0);
		});

		return then('done');
	});

	it('Adding array before buffer with line shifting', () => {
		const dataList = createDefaultDataList();


		given('created baselist-datalist', () => setBufferSource(buffer, dataList)
			.then(() => {
				dataList.select('K');

				changeSpy.resetHistory();
				selectSpy.resetHistory();
			}));

		when('set array of items', () => {
			const array = createOtherArray().slice(0, 2);
			return dataList.addItemsAt(array, 0);
		});

		then('changeCallback called once with corresponding set', () => {
			expect(changeSpy)
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
			expect(selectSpy).callCount(0);
		});

		return then('done');
	});

	it('Adding array after buffer', () => {
		const dataList = createDefaultDataList();


		given('created baselist-datalist', () => setBufferSource(buffer, dataList)
			.then(() => {
				changeSpy.resetHistory();
				selectSpy.resetHistory();
			}));

		when('set array of items', () => {
			const array = createOtherArray().slice(0, 3);
			return dataList.addItemsAt(array, dataList.size());
		});

		then('changeCallback not called', () => {
			expect(changeSpy).callCount(0);
		});

		then('selectCallback not called', () => {
			expect(selectSpy).callCount(0);
		});

		return then('done');
	});

	it('Adding array in buffer before selected element without line shifting', () => {
		const dataList = createDefaultDataList();


		given('created baselist-datalist', () => setBufferSource(buffer, dataList)
			.then(() => {
				changeSpy.resetHistory();
				selectSpy.resetHistory();
			}));

		when('set array of items', () => {
			const array = createOtherArray().slice(0, 3);
			return dataList.addItemsAt(array, 0);
		});

		then('changeCallback called once with corresponding set', () => {
			expect(changeSpy)
				.callCount(1)
				.calledWith([
					'alpha', 'beta', 'gamma',
					'A', 'B', 'C',
					'D', 'E', 'F',
					'G', 'H', 'I'
				]);
		});

		then('selectCallback not called', () => {
			expect(selectSpy).callCount(0);
		});

		return then('done');
	});

	it('Adding double array in buffer before selected element without line shifting', () => {
		const dataList = createDefaultDataList();


		given('created baselist-datalist', () => setBufferSource(buffer, dataList)
			.then(() => {
				changeSpy.resetHistory();
				selectSpy.resetHistory();
			}));

		when('set array of items', () => {
			const array = createOtherArray().slice(0, 6);
			return dataList.addItemsAt(array, 0);
		});

		then('changeCallback called once with corresponding set', () => {
			expect(changeSpy)
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
			expect(selectSpy).callCount(0);
		});

		return then('done');
	});

	it('Adding array in buffer before selected element with line shifting', () => {
		const dataList = createDefaultDataList();


		given('created baselist-datalist', () => setBufferSource(buffer, dataList)
			.then(() => {
				changeSpy.resetHistory();
				selectSpy.resetHistory();
			}));

		when('set array of items', () => {
			const array = createOtherArray().slice(0, 2);
			return dataList.addItemsAt(array, 0);
		});

		then('changeCallback called once with corresponding set', () => {
			expect(changeSpy)
				.callCount(1)
				.calledWith([
					'alpha', 'beta', 'A',
					'B', 'C', 'D',
					'E', 'F', 'G'
				]);
		});

		then('selectCallback not called', () => {
			expect(selectSpy).callCount(0);
		});

		return then('done');
	});

	it('Adding array in buffer after selected element', () => {
		const dataList = createDefaultDataList();


		given('created baselist-datalist', () => setBufferSource(buffer, dataList)
			.then(() => {
				changeSpy.resetHistory();
				selectSpy.resetHistory();
			}));

		when('set array of items', () => {
			const array = createOtherArray().slice(0, 3);
			return dataList.addItemsAt(array, 1);
		});

		then('changeCallback called once with corresponding set', () => {
			expect(changeSpy)
				.callCount(1)
				.calledWith([
					'A', 'alpha', 'beta',
					'gamma', 'B', 'C',
					'D', 'E', 'F'
				]);
		});

		then('selectCallback not called', () => {
			expect(selectSpy).callCount(0);
		});

		return then('done');
	});
});
