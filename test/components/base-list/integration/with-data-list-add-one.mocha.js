import {createBuffer, setBufferSource, changeSpy, selectSpy, createDefaultDataList} from '../helper';

const expect = chai.expect;


describe('BaseListDataList: add one item', () => {
	it('before the frame', async () => {
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

		dataList.addAt('+1', 0);

		expect(changeSpy)
			.callCount(1)
			.calledWith([
				'C', 'D', 'E',
				'F', 'G', 'H',
				'I', 'J', 'K'
			]);

		expect(selectSpy)
			.callCount(0);
	});

	it('before the frame, pushing selected item to new line', async () => {
		const buffer = createBuffer({
			padding: 2,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = createDefaultDataList();

		// buffer frame position should change

		await setBufferSource(buffer, dataList);

		dataList.select('H');
		buffer._changeItems();
		dataList.select('I');

		changeSpy.resetHistory();
		selectSpy.resetHistory();

		dataList.addAt('+1', 0);

		// buffer frame should be moved
		expect(changeSpy)
			.callCount(1)
			.calledWith([
				'C', 'D', 'E',
				'F', 'G', 'H',
				'I', 'J', 'K',
				'L', 'M', 'N',
				'O', 'P', 'Q'
			]);

		expect(selectSpy)
			.callCount(0);
	});

	it('before the frame, pushing selected item to LOL', async () => {
		const buffer = createBuffer({
			padding: 1,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = createDefaultDataList();

		// buffer frame position should change ONCE

		await setBufferSource(buffer, dataList);

		dataList.select('H');
		buffer._changeItems();
		dataList.select('I');

		changeSpy.resetHistory();
		selectSpy.resetHistory();

		dataList.addAt('+1', 0);

		// buffer frame should be moved
		expect(changeSpy)
			.callCount(1)
			.calledWith([
				'F', 'G', 'H',
				'I', 'J', 'K',
				'L', 'M', 'N'
			]);

		expect(selectSpy)
			.callCount(0);
	});

	it('in the frame before selected', async () => {
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

		dataList.addAt('+', 4);

		expect(changeSpy)
			.callCount(1)
			.calledWith([
				'D', '+', 'E',
				'F', 'G', 'H',
				'I', 'J', 'K'
			]);

		expect(selectSpy)
			.callCount(0);
	});

	it('selected', async () => {
		const buffer = createBuffer({
			padding: 2,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = createDefaultDataList();

		await setBufferSource(buffer, dataList);

		dataList.select('K');
		buffer._changeItems();

		changeSpy.resetHistory();
		selectSpy.resetHistory();

		dataList.addAt('+', 10);

		expect(changeSpy)
			.callCount(1)
			.calledWith([
				'D', 'E', 'F',
				'G', 'H', 'I',
				'J', '+', 'K',
				'L', 'M', 'N',
				'O', 'P', 'Q'
			]);

		expect(selectSpy)
			.callCount(0);
	});

	it('in buffer frame after selected', async () => {
		const buffer = createBuffer({
			padding: 2,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = createDefaultDataList();

		await setBufferSource(buffer, dataList);

		dataList.select('K');
		buffer._changeItems();

		changeSpy.resetHistory();
		selectSpy.resetHistory();

		dataList.addAt('+', 11);

		expect(changeSpy)
			.callCount(1)
			.calledWith([
				'D', 'E', 'F',
				'G', 'H', 'I',
				'J', 'K', '+',
				'L', 'M', 'N',
				'O', 'P', 'Q'
			]);

		expect(selectSpy)
			.callCount(0);
	});

	it('after buffer frame', async () => {
		const buffer = createBuffer({
			padding: 2,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = createDefaultDataList();

		await setBufferSource(buffer, dataList);

		dataList.select('K');
		buffer._changeItems();

		changeSpy.resetHistory();
		selectSpy.resetHistory();

		dataList.addAt('+', 18);

		expect(changeSpy)
			.callCount(0);
		expect(selectSpy)
			.callCount(0);
	});
});
