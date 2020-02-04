import {
	createBuffer,
	setBufferSource,
	changeSpy,
	selectSpy,
	createDefaultDataList,
	createEmptyDataList,
	createOtherDataList
} from '../helper';

const expect = chai.expect;

describe('BaseListDataList: set source', () => {
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

	it('Setting empty List', async () => {
		const dataList = createEmptyDataList();
		await setBufferSource(buffer, dataList);

		expect(changeSpy)
			.callCount(0);

		expect(selectSpy)
			.callCount(0);
	});

	it('Setting not empty List', async () => {
		const dataList = createDefaultDataList();
		await setBufferSource(buffer, dataList);

		expect(changeSpy)
			.callCount(1)
			.calledWith([
				'A', 'B', 'C',
				'D', 'E', 'F'
			]);

		expect(selectSpy)
			.callCount(1)
			.calledWith('A', 0, null, NaN);
	});

	// Repeated setting

	it('Setting other List', async () => {
		const firstList = createDefaultDataList();
		await setBufferSource(buffer, firstList);

		changeSpy.resetHistory();
		selectSpy.resetHistory();

		const secondList = createOtherDataList();
		await setBufferSource(buffer, secondList);

		expect(changeSpy)
			.callCount(1)
			.calledWith([
				'alpha', 'beta', 'gamma',
				'delta', 'epsilon', 'zeta'
			]);

		expect(selectSpy)
			.callCount(1)
			.calledWith('alpha', 0, null, NaN);
	});

	it('Re-setting same List', async () => {
		const dataList = createDefaultDataList();
		await setBufferSource(buffer, dataList);

		changeSpy.resetHistory();
		selectSpy.resetHistory();

		expect(changeSpy)
			.callCount(0);


		expect(selectSpy)
			.callCount(0);
	});

	it('Re-setting almost same List', async () => {
		const firstList = createDefaultDataList();
		await setBufferSource(buffer, firstList);

		changeSpy.resetHistory();
		selectSpy.resetHistory();

		const secondList = createDefaultDataList();
		await setBufferSource(buffer, secondList);

		expect(changeSpy)
			.callCount(0);

		expect(selectSpy)
			.callCount(0);
	});

	it('Re-setting same List after null', async () => {
		const dataList = createDefaultDataList();

		await setBufferSource(buffer, dataList);
		await setBufferSource(buffer, null);

		changeSpy.resetHistory();
		selectSpy.resetHistory();

		await setBufferSource(buffer, dataList);

		expect(changeSpy)
			.callCount(1)
			.calledWith([
				'A', 'B', 'C',
				'D', 'E', 'F'
			]);

		expect(selectSpy)
			.callCount(1)
			.calledWith('A', 0, null, NaN);
	});


	it('Setting null', async () => {
		await setBufferSource(buffer, null);

		expect(changeSpy)
			.callCount(0);

		expect(selectSpy)
			.callCount(0);
	});

	it('Re-setting null', async () => {
		await setBufferSource(buffer, null);

		changeSpy.resetHistory();
		selectSpy.resetHistory();

		expect(changeSpy)
			.callCount(0);

		expect(selectSpy)
			.callCount(0);
	});

	it('Setting null after List', async () => {
		const dataList = createDefaultDataList();
		await setBufferSource(buffer, dataList);

		changeSpy.resetHistory();
		selectSpy.resetHistory();

		await setBufferSource(buffer, null);

		expect(changeSpy)
			.callCount(1)
			.calledWith([]);

		expect(selectSpy)
			.callCount(0);
	});

	it('Setting List after null', async () => {
		await setBufferSource(buffer, null);

		changeSpy.resetHistory();
		selectSpy.resetHistory();

		const dataList = createDefaultDataList();
		await setBufferSource(buffer, dataList);

		expect(changeSpy)
			.callCount(1)
			.calledWith([
				'A', 'B', 'C',
				'D', 'E', 'F'
			]);

		expect(selectSpy)
			.callCount(1)
			.calledWith('A', 0, null, NaN);
	});
});
