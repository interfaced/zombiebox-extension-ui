import CyclicalList from 'ui/data/cyclical-list';
import {createBuffer, createDefaultArray, setBufferSource, changeSpy, selectSpy} from '../helper';

const expect = chai.expect;


describe('BaseListDataList with CyclicalList: select prev', () => {
	let dataList;
	let buffer;
	let bufferPromise;

	beforeEach(async () => {
		buffer = createBuffer();
		dataList = new CyclicalList(createDefaultArray());
		bufferPromise = setBufferSource(buffer, dataList)
			.then(() => {
				changeSpy.resetHistory();
				selectSpy.resetHistory();
			});

		await bufferPromise;
	});

	it('Selecting prev item', async () => {
		dataList.selectPrevItem();

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

	it('Selecting prev prev item', async () => {
		dataList.selectPrevItem();
		dataList.selectPrevItem();

		expect(selectSpy.withArgs('Z', 7, null, NaN))
			.callCount(1);
		expect(selectSpy.withArgs('Y', 6, 'Z', 7))
			.callCount(1);

		expect(changeSpy)
			.calledWith([
				'S', 'T', 'U',
				'V', 'W', 'X',
				'Y', 'Z'
			])
			.callCount(1);
	});

	it('Selecting second and prev item', async () => {
		dataList.selectAt(1);
		dataList.selectPrevItem();

		expect(selectSpy.withArgs('B', 1, 'A', 0))
			.callCount(1);
		expect(selectSpy.withArgs('A', 0, 'B', 1))
			.callCount(1);

		expect(changeSpy)
			.callCount(0);
	});

	it('Selecting prev index via buffer', async () => {
		buffer.selectPrevIndex();

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

	it('Selecting prev prev index via buffer', async () => {
		buffer.selectPrevIndex();
		buffer.selectPrevIndex();

		expect(selectSpy.withArgs('Z', 7, null, NaN))
			.callCount(1);
		expect(selectSpy.withArgs('Y', 6, 'Z', 7))
			.callCount(1);

		expect(changeSpy)
			.calledWith([
				'S', 'T', 'U',
				'V', 'W', 'X',
				'Y', 'Z'
			])
			.callCount(1);
	});

	it('Selecting second item and prev index via buffer', async () => {
		dataList.selectAt(1);
		buffer.selectPrevIndex();

		expect(selectSpy.withArgs('B', 1, 'A', 0))
			.callCount(1);
		expect(selectSpy.withArgs('A', 0, 'B', 1))
			.callCount(1);

		expect(changeSpy)
			.callCount(0);
	});

	it('Selecting prev line via buffer', async () => {
		buffer.selectPrevLine();

		expect(selectSpy)
			.calledWith('Y', 6, null, NaN)
			.callCount(1);

		expect(changeSpy)
			.calledWith([
				'S', 'T', 'U',
				'V', 'W', 'X',
				'Y', 'Z'
			])
			.callCount(1);
	});

	it('Selecting prev prev line via buffer', async () => {
		buffer.selectPrevLine();
		buffer.selectPrevLine();

		expect(selectSpy.withArgs('Y', 6, null, NaN))
			.callCount(1);
		expect(selectSpy.withArgs('V', 3, 'Y', 6))
			.callCount(1);

		expect(changeSpy)
			.calledWith([
				'S', 'T', 'U',
				'V', 'W', 'X',
				'Y', 'Z'
			])
			.callCount(1);
	});

	it('Selecting second item and prev line via buffer', async () => {
		dataList.selectAt(1);
		buffer.selectPrevLine();

		expect(selectSpy.withArgs('B', 1, 'A', 0))
			.callCount(1);
		expect(selectSpy.withArgs('Z', 7, null, NaN))
			.callCount(1);

		expect(changeSpy)
			.calledWith([
				'S', 'T', 'U',
				'V', 'W', 'X',
				'Y', 'Z'
			])
			.callCount(1);
	});

	it('Selecting third item and prev line via buffer', async () => {
		dataList.selectAt(2);
		buffer.selectPrevLine();

		expect(selectSpy.withArgs('C', 2, 'A', 0))
			.callCount(1);
		expect(selectSpy.withArgs('X', 8, null, NaN))
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

	it('Selecting second line and prev line via buffer', async () => {
		buffer.selectNextLine();
		buffer.selectPrevLine();

		expect(selectSpy.withArgs('D', 3, 'A', 0))
			.callCount(1);
		expect(selectSpy.withArgs('A', 0, 'D', 3))
			.callCount(1);

		expect(changeSpy)
			.callCount(0);
	});
});
