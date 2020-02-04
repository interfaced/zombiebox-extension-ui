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

const expect = chai.expect;


describe('BaseListDataList: change group of items', () => {
	let buffer;

	beforeEach(() => {
		buffer = createBuffer();
	});

	it('Setting empty List', async () => {
		const dataList = createEmptyDataList();

		await setBufferSource(buffer, dataList);

		expect(changeSpy).callCount(0);
		expect(selectSpy).callCount(0);
	});

	it('Re-setting empty Array', async () => {
		const dataList = createEmptyDataList();

		await setBufferSource(buffer, dataList);
		changeSpy.resetHistory();
		selectSpy.resetHistory();

		dataList.setItems(createEmptyArray());

		expect(changeSpy).callCount(0);
		expect(selectSpy).callCount(0);
	});

	it('Setting items to List with setItems method', async () => {
		const dataList = createEmptyDataList();

		await setBufferSource(buffer, dataList);
		changeSpy.resetHistory();
		selectSpy.resetHistory();

		dataList.setItems(createDefaultArray());

		expect(changeSpy)
			.callCount(1)
			.calledWith([
				'A', 'B', 'C',
				'D', 'E', 'F',
				'G', 'H', 'I'
			]);

		expect(selectSpy)
			.callCount(1)
			.calledWith('A', 0, null, NaN);
	});

	it('Clearing not empty List', async () => {
		const dataList = createDefaultDataList();

		await setBufferSource(buffer, dataList);
		changeSpy.resetHistory();
		selectSpy.resetHistory();

		dataList.clear();

		expect(changeSpy)
			.callCount(1)
			.calledWith([]);

		// Из-за особенностей List.clear(), будет вызываться selectCallback.
		// Не сильно критично, но по логике этот вызов не нужен.
		expect(selectSpy)
			.callCount(1)
			.calledWith(null, NaN, 'A', 0);
	});

	it('Clearing empty List', async () => {
		const dataList = createEmptyDataList();

		await setBufferSource(buffer, dataList);
		changeSpy.resetHistory();
		selectSpy.resetHistory();

		dataList.clear();

		expect(changeSpy).callCount(0);

		expect(selectSpy).callCount(0);
	});

	it('Adding empty array to empty List', async () => {
		const dataList = createEmptyDataList();

		await setBufferSource(buffer, dataList);
		changeSpy.resetHistory();
		selectSpy.resetHistory();

		const array = createEmptyArray();
		dataList.addItems(array);

		expect(changeSpy).callCount(0);
		expect(selectSpy).callCount(0);
	});

	it('Adding empty array to filled List', async () => {
		const dataList = createDefaultDataList();

		await setBufferSource(buffer, dataList);
		changeSpy.resetHistory();
		selectSpy.resetHistory();

		const array = createEmptyArray();
		dataList.addItems(array);

		expect(changeSpy).callCount(0);

		expect(selectSpy).callCount(0);
	});

	it('Adding filled array to empty List', async () => {
		const dataList = createEmptyDataList();

		await setBufferSource(buffer, dataList);
		changeSpy.resetHistory();
		selectSpy.resetHistory();

		const array = createDefaultArray();
		dataList.addItems(array);

		expect(changeSpy)
			.callCount(1)
			.calledWith([
				'A', 'B', 'C',
				'D', 'E', 'F',
				'G', 'H', 'I'
			]);

		expect(selectSpy)
			.callCount(1)
			.calledWith('A', 0, null, NaN);
	});

	it('Adding filled array to filled List', async () => {
		const dataList = createDefaultDataList();

		await setBufferSource(buffer, dataList);
		changeSpy.resetHistory();
		selectSpy.resetHistory();

		const array = createOtherArray();
		dataList.addItems(array);

		expect(changeSpy).callCount(0);
		expect(selectSpy).callCount(0);
	});

	it('Adding array before buffer without line shifting', async () => {
		const dataList = createDefaultDataList();

		await setBufferSource(buffer, dataList);
		dataList.select('K');

		changeSpy.resetHistory();
		selectSpy.resetHistory();

		const array = createOtherArray().slice(0, 3);
		dataList.addItemsAt(array, 0);

		expect(changeSpy).callCount(0);
		expect(selectSpy).callCount(0);
	});

	it('Adding array before buffer with line shifting', async () => {
		const dataList = createDefaultDataList();

		await setBufferSource(buffer, dataList);
		dataList.select('K');

		changeSpy.resetHistory();
		selectSpy.resetHistory();

		const array = createOtherArray().slice(0, 2);
		dataList.addItemsAt(array, 0);

		expect(changeSpy)
			.callCount(1)
			.calledWith([
				'E', 'F', 'G',
				'H', 'I', 'J',
				'K', 'L', 'M',
				'N', 'O', 'P',
				'Q', 'R', 'S'
			]);

		expect(selectSpy).callCount(0);
	});

	it('Adding array after buffer', async () => {
		const dataList = createDefaultDataList();

		await setBufferSource(buffer, dataList);
		changeSpy.resetHistory();
		selectSpy.resetHistory();

		const array = createOtherArray().slice(0, 3);
		dataList.addItemsAt(array, dataList.size());

		expect(changeSpy).callCount(0);
		expect(selectSpy).callCount(0);
	});

	it('Adding array in buffer before selected element without line shifting', async () => {
		const dataList = createDefaultDataList();

		await setBufferSource(buffer, dataList);
		changeSpy.resetHistory();
		selectSpy.resetHistory();

		const array = createOtherArray().slice(0, 3);
		dataList.addItemsAt(array, 0);

		expect(changeSpy)
			.callCount(1)
			.calledWith([
				'alpha', 'beta', 'gamma',
				'A', 'B', 'C',
				'D', 'E', 'F',
				'G', 'H', 'I'
			]);

		expect(selectSpy).callCount(0);
	});

	it('Adding double array in buffer before selected element without line shifting', async () => {
		const dataList = createDefaultDataList();

		await setBufferSource(buffer, dataList);
		changeSpy.resetHistory();
		selectSpy.resetHistory();

		const array = createOtherArray().slice(0, 6);
		dataList.addItemsAt(array, 0);

		expect(changeSpy)
			.callCount(1)
			.calledWith([
				'alpha', 'beta', 'gamma',
				'delta', 'epsilon', 'zeta',
				'A', 'B', 'C',
				'D', 'E', 'F',
				'G', 'H', 'I'
			]);

		expect(selectSpy).callCount(0);
	});

	it('Adding array in buffer before selected element with line shifting', async () => {
		const dataList = createDefaultDataList();

		await setBufferSource(buffer, dataList);
		changeSpy.resetHistory();
		selectSpy.resetHistory();

		const array = createOtherArray().slice(0, 2);
		dataList.addItemsAt(array, 0);

		expect(changeSpy)
			.callCount(1)
			.calledWith([
				'alpha', 'beta', 'A',
				'B', 'C', 'D',
				'E', 'F', 'G'
			]);

		expect(selectSpy).callCount(0);
	});

	it('Adding array in buffer after selected element', async () => {
		const dataList = createDefaultDataList();

		await setBufferSource(buffer, dataList);
		changeSpy.resetHistory();
		selectSpy.resetHistory();

		const array = createOtherArray().slice(0, 3);
		dataList.addItemsAt(array, 1);

		expect(changeSpy)
			.callCount(1)
			.calledWith([
				'A', 'alpha', 'beta',
				'gamma', 'B', 'C',
				'D', 'E', 'F'
			]);
		expect(selectSpy).callCount(0);
	});
});
