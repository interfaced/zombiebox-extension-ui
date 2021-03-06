import {createBuffer, setBufferSource, changeSpy, selectSpy, createDefaultDataList} from '../helper';

const expect = chai.expect;

describe('BaseListDataList: select next', () => {
	let dataList;
	let buffer;
	let bufferPromise;

	beforeEach(async () => {
		buffer = createBuffer();
		dataList = createDefaultDataList();
		bufferPromise = setBufferSource(buffer, dataList)
			.then(() => {
				changeSpy.resetHistory();
				selectSpy.resetHistory();
			});

		await bufferPromise;
	});

	it('Selecting next item', async () => {
		dataList.selectNextItem();

		expect(selectSpy)
			.calledWith('B', 1, 'A', 0)
			.callCount(1);

		expect(changeSpy)
			.callCount(0);
	});

	it('Selecting next next item', async () => {
		dataList.selectNextItem();
		dataList.selectNextItem();

		expect(selectSpy.withArgs('B', 1, 'A', 0))
			.callCount(1);
		expect(selectSpy.withArgs('C', 2, 'B', 1))
			.callCount(1);

		expect(changeSpy)
			.callCount(0);
	});

	it('Selecting last but one and last item', async () => {
		dataList.selectAt(dataList.size() - 2);
		dataList.selectNextItem();

		expect(selectSpy.withArgs('Y', 6, null, NaN))
			.callCount(1);
		expect(selectSpy.withArgs('Z', 7, 'Y', 6))
			.callCount(1);

		expect(changeSpy)
			.calledWith([
				'S', 'T', 'U',
				'V', 'W', 'X',
				'Y', 'Z'
			])
			.callCount(1);
	});

	it('Selecting next after last item', async () => {
		dataList.selectLast();
		dataList.selectNextItem();

		expect(selectSpy)
			.calledWith('Z', 7, null, NaN)
			.callCount(1);

		expect(changeSpy)
			.calledWith([
				'S', 'T', 'U',
				'V', 'W', 'X',
				'Y', 'Z'
			])
			.callCount(1);
	});

	it('Selecting next index via buffer', async () => {
		buffer.selectNextIndex();

		expect(selectSpy)
			.calledWith('B', 1, 'A', 0)
			.callCount(1);

		expect(changeSpy)
			.callCount(0);
	});

	it('Selecting next next index via buffer', async () => {
		buffer.selectNextIndex();
		buffer.selectNextIndex();

		expect(selectSpy.withArgs('B', 1, 'A', 0))
			.callCount(1);
		expect(selectSpy.withArgs('C', 2, 'B', 1))
			.callCount(1);

		expect(changeSpy)
			.callCount(0);
	});

	it('Selecting last but one item and next index via buffer', async () => {
		dataList.selectAt(dataList.size() - 2);
		buffer.selectNextIndex();

		expect(selectSpy.withArgs('Y', 6, null, NaN))
			.callCount(1);
		expect(selectSpy.withArgs('Z', 7, 'Y', 6))
			.callCount(1);

		expect(changeSpy)
			.calledWith([
				'S', 'T', 'U',
				'V', 'W', 'X',
				'Y', 'Z'
			])
			.callCount(1);
	});

	it('Selecting last item and next index via buffer', async () => {
		dataList.selectLast();
		buffer.selectNextIndex();

		expect(selectSpy)
			.calledWith('Z', 7, null, NaN)
			.callCount(1);

		expect(changeSpy)
			.calledWith([
				'S', 'T', 'U',
				'V', 'W', 'X',
				'Y', 'Z'
			])
			.callCount(1);
	});

	it('Selecting next line via buffer', async () => {
		buffer.selectNextLine();

		expect(selectSpy)
			.calledWith('D', 3, 'A', 0)
			.callCount(1);

		expect(changeSpy)
			.callCount(0);
	});

	it('Selecting next next line via buffer', async () => {
		buffer.selectNextLine();
		buffer.selectNextLine();

		expect(selectSpy.withArgs('D', 3, 'A', 0))
			.callCount(1);
		expect(selectSpy.withArgs('G', 6, 'D', 3))
			.callCount(1);

		expect(changeSpy)
			.calledWith([
				'A', 'B', 'C',
				'D', 'E', 'F',
				'G', 'H', 'I',
				'J', 'K', 'L',
				'M', 'N', 'O'
			])
			.callCount(1);
	});

	it('Selecting last but one line and next line via buffer', async () => {
		dataList.selectAt(dataList.size() - 5);
		buffer.selectNextLine();

		expect(selectSpy.withArgs('V', 6, null, NaN))
			.callCount(1);
		expect(selectSpy.withArgs('Y', 9, 'V', 6))
			.callCount(1);

		expect(changeSpy)
			.calledWith([
				'P', 'Q', 'R',
				'S', 'T', 'U',
				'V', 'W', 'X',
				'Y', 'Z'
			])
			.callCount(1);
	});

	it('Selecting last item and next line via buffer', async () => {
		dataList.selectLast();
		buffer.selectNextLine();

		expect(selectSpy)
			.calledWith('Z', 7, null, NaN)
			.callCount(1);

		expect(changeSpy)
			.calledWith([
				'S', 'T', 'U',
				'V', 'W', 'X',
				'Y', 'Z'
			])
			.callCount(1);
	});
});
