import {createBuffer, setBufferSource, changeSpy, selectSpy, createDefaultDataList} from '../helper';

const expect = chai.expect;

describe('BaseListDataList: select prev', () => {
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

	it('Selecting prev item', async () => {
		dataList.selectPrevItem();

		expect(selectSpy)
			.callCount(0);

		expect(changeSpy)
			.callCount(0);
	});

	it('Selecting prev prev item', async () => {
		dataList.selectPrevItem();
		dataList.selectPrevItem();

		expect(selectSpy)
			.callCount(0);

		expect(changeSpy)
			.callCount(0);
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
			.callCount(0);

		expect(changeSpy)
			.callCount(0);
	});

	it('Selecting prev prev index via buffer', async () => {
		buffer.selectPrevIndex();
		buffer.selectPrevIndex();

		expect(selectSpy)
			.callCount(0);

		expect(changeSpy)
			.callCount(0);
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
			.callCount(0);

		expect(changeSpy)
			.callCount(0);
	});

	it('Selecting prev prev line via buffer', async () => {
		buffer.selectPrevLine();
		buffer.selectPrevLine();

		expect(selectSpy)
			.callCount(0);

		expect(changeSpy)
			.callCount(0);
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
