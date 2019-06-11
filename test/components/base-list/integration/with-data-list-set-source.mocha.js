import {
	createBuffer,
	setBufferSource,
	changeSpy,
	selectSpy,
	createDefaultDataList,
	createEmptyDataList,
	noop,
	createOtherDataList
} from '../helper';


describe('BaseListDataList: set source', () => {
	const expect = chai.expect;
	const given = mochaTestSteps.given;
	const when = mochaTestSteps.when;
	const then = mochaTestSteps.then;

	let buffer;

	beforeEach(() => {
		buffer = createBuffer({
			padding: 1,
			lineSize: 3,
			loadOnLeft: 1
		});

		changeSpy.resetHistory();
		selectSpy.resetHistory();
	});

	it('Setting empty List', () => {

		given('empty given to fix mocha-test-steps bug', noop);

		when('set empty data-list', () => {
			const dataList = createEmptyDataList();
			return setBufferSource(buffer, dataList);
		});

		then('changeCallback not called', () => {
			expect(changeSpy)
				.callCount(0);
		});

		then('selectCallback not called', () => {
			expect(selectSpy)
				.callCount(0);
		});

		return then('done');
	});

	it('Setting not empty List', () => {

		given('empty given to fix mocha-test-steps bug', noop);

		when('set default data-list', () => {
			const dataList = createDefaultDataList();
			return setBufferSource(buffer, dataList);
		});

		then('changeCallback called once with corresponding set', () => {
			expect(changeSpy)
				.callCount(1)
				.calledWith([
					'A', 'B', 'C',
					'D', 'E', 'F'
				]);
		});

		then('selectCallback called once with first item', () => {
			expect(selectSpy)
				.callCount(1)
				.calledWith('A', 0, null, NaN);
		});

		return then('done');
	});

	// Repeated setting

	it('Setting other List', () => {

		given('set default data-list', () => {
			const dataList = createDefaultDataList();
			return setBufferSource(buffer, dataList)
				.then(() => {
					changeSpy.resetHistory();
					selectSpy.resetHistory();
				});
		});

		when('set other data-list', () => {
			const dataList = createOtherDataList();
			return setBufferSource(buffer, dataList);
		});

		then('changeCallback called once with corresponding set', () => {
			expect(changeSpy)
				.callCount(1)
				.calledWith([
					'alpha', 'beta', 'gamma',
					'delta', 'epsilon', 'zeta'
				]);
		});

		then('selectCallback called once with first item', () => {
			expect(selectSpy)
				.callCount(1)
				.calledWith('alpha', 0, null, NaN);
		});

		return then('done');
	});

	it('Re-setting same List', () => {
		const dataList = createDefaultDataList();


		given('set default data-list', () => setBufferSource(buffer, dataList)
			.then(() => {
				changeSpy.resetHistory();
				selectSpy.resetHistory();
			}));

		when('set same data-list', () => setBufferSource(buffer, dataList));

		then('changeCallback not called', () => {
			expect(changeSpy)
				.callCount(0);
		});

		then('selectCallback not called', () => {
			expect(selectSpy)
				.callCount(0);
		});

		return then('done');
	});

	it('Re-setting almost same List', () => {

		given('set default data-list', () => {
			const dataList = createDefaultDataList();
			return setBufferSource(buffer, dataList)
				.then(() => {
					changeSpy.resetHistory();
					selectSpy.resetHistory();
				});
		});

		when('set almost same data-list', () => {
			const dataList = createDefaultDataList();
			return setBufferSource(buffer, dataList);
		});

		then('changeCallback not called', () => {
			expect(changeSpy)
				.callCount(0);
		});

		then('selectCallback not called', () => {
			expect(selectSpy)
				.callCount(0);
		});

		return then('done');
	});

	it('Re-setting same List after null', () => {
		const dataList = createDefaultDataList();


		given('set default data-list', () => setBufferSource(buffer, dataList));

		given('set null', () => setBufferSource(buffer, null)
			.then(() => {
				changeSpy.resetHistory();
				selectSpy.resetHistory();
			}));

		when('set same data-list', () => setBufferSource(buffer, dataList));

		then('changeCallback called once with corresponding set', () => {
			expect(changeSpy)
				.callCount(1)
				.calledWith([
					'A', 'B', 'C',
					'D', 'E', 'F'
				]);
		});

		then('selectCallback called once with first item', () => {
			expect(selectSpy)
				.callCount(1)
				.calledWith('A', 0, null, NaN);
		});

		return then('done');
	});

	// null

	it('Setting null', () => {

		given('empty given to fix mocha-test-steps bug', noop);

		when('set null', () => setBufferSource(buffer, null));

		then('changeCallback not called', () => {
			expect(changeSpy)
				.callCount(0);
		});

		then('selectCallback not called', () => {
			expect(selectSpy)
				.callCount(0);
		});

		return then('done');
	});

	it('Re-setting null', () => {

		given('set null', () => setBufferSource(buffer, null)
			.then(() => {
				changeSpy.resetHistory();
				selectSpy.resetHistory();
			}));

		when('re-set null', () => setBufferSource(buffer, null));

		then('changeCallback not called', () => {
			expect(changeSpy)
				.callCount(0);
		});

		then('selectCallback not called', () => {
			expect(selectSpy)
				.callCount(0);
		});

		return then('done');
	});

	it('Setting null after List', () => {

		given('set default data-list', () => {
			const dataList = createDefaultDataList();
			return setBufferSource(buffer, dataList)
				.then(() => {
					changeSpy.resetHistory();
					selectSpy.resetHistory();
				});
		});

		when('set null', () => setBufferSource(buffer, null));

		then('changeCallback called once with corresponding set', () => {
			expect(changeSpy)
				.callCount(1)
				.calledWith([]);
		});

		then('selectCallback not called', () => {
			expect(selectSpy)
				.callCount(0);
		});

		return then('done');
	});

	it('Setting List after null', () => {

		given('set null', () => setBufferSource(buffer, null)
			.then(() => {
				changeSpy.resetHistory();
				selectSpy.resetHistory();
			}));

		when('set default data-list', () => {
			const dataList = createDefaultDataList();
			return setBufferSource(buffer, dataList);
		});

		then('changeCallback called once with corresponding set', () => {
			expect(changeSpy)
				.callCount(1)
				.calledWith([
					'A', 'B', 'C',
					'D', 'E', 'F'
				]);
		});

		then('selectCallback called once with first item', () => {
			expect(selectSpy)
				.callCount(1)
				.calledWith('A', 0, null, NaN);
		});

		return then('done');
	});
});
