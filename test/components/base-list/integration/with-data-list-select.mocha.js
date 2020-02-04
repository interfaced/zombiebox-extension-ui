import {createBuffer, setBufferSource, changeSpy, selectSpy, createDefaultDataList} from '../helper';

const expect = chai.expect;


describe('BaseListDataList: select', async () => {
	it('inside passive zone', async () => {
		const buffer = createBuffer({
			padding: 1,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = createDefaultDataList();

		await setBufferSource(buffer, dataList);

		changeSpy.resetHistory();
		selectSpy.resetHistory();

		dataList.select('B');

		expect(selectSpy)
			.callCount(1)
			.calledWith('B', 1, 'A', 0);

		expect(changeSpy)
			.callCount(0);
	});

	it('inside passive zone with shifted index', async () => {
		const buffer = createBuffer({
			padding: 1,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = createDefaultDataList();

		await setBufferSource(buffer, dataList);

		dataList.select('H');
		buffer._changeItems();

		changeSpy.resetHistory();
		selectSpy.resetHistory();

		dataList.select('I');

		expect(selectSpy)
			.callCount(1)
			.calledWith('I', 5, 'H', 4);

		expect(changeSpy)
			.callCount(0);
	});

	it('on border of loadOnLeft zone', async () => {
		const buffer = createBuffer({
			padding: 2,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = createDefaultDataList();

		await setBufferSource(buffer, dataList);
		changeSpy.resetHistory();
		selectSpy.resetHistory();

		dataList.select('D');

		expect(selectSpy)
			.callCount(1)
			.calledWith('D', 3, 'A', 0);

		expect(changeSpy)
			.callCount(0);
	});

	it('on border of buffer (inside loadOnLeft zone)', async () => {
		const buffer = createBuffer({
			padding: 1,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = createDefaultDataList();

		await setBufferSource(buffer, dataList);

		changeSpy.resetHistory();
		selectSpy.resetHistory();

		dataList.select('D');

		expect(selectSpy)
			.callCount(1)
			.calledWith('D', 3, 'A', 0);

		expect(changeSpy)
			.callCount(1)
			.calledWith([
				'A', 'B', 'C',
				'D', 'E', 'F',
				'G', 'H', 'I'
			]);
	});

	it('out of buffer', async () => {
		const buffer = createBuffer({
			padding: 2,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = createDefaultDataList();

		await setBufferSource(buffer, dataList);

		dataList.select('B');
		buffer._changeItems();
		dataList.select('E');

		changeSpy.resetHistory();
		selectSpy.resetHistory();

		dataList.select('K');

		expect(selectSpy)
			.callCount(1)
			.calledWith('K', 7, 'E', 1);

		expect(changeSpy)
			.callCount(1)
			.calledWith([
				'D', 'E', 'F',
				'G', 'H', 'I',
				'J', 'K', 'L',
				'M', 'N', 'O',
				'P', 'Q', 'R'
			]);
	});

	it('old element outside new frame', async () => {
		const buffer = createBuffer({
			padding: 1,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = createDefaultDataList();

		await setBufferSource(buffer, dataList);
		changeSpy.resetHistory();
		selectSpy.resetHistory();

		dataList.select('Q');

		expect(selectSpy)
			.callCount(1)
			.calledWith('Q', 4, null, NaN);

		expect(changeSpy)
			.callCount(1)
			.calledWith([
				'M', 'N', 'O',
				'P', 'Q', 'R',
				'S', 'T', 'U'
			]);
	});
});
