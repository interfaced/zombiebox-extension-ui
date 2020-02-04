import {createBuffer, setBufferSource, changeSpy, selectSpy, createDefaultDataList} from '../helper';

const expect = chai.expect;


describe('BaseListDataList: remove one item', () => {
	let dataList;
	let buffer;

	beforeEach(async () => {
		buffer = createBuffer({
			padding: 1,
			lineSize: 3,
			loadOnLeft: 1
		});
		dataList = createDefaultDataList();
		await setBufferSource(buffer, dataList)
			.then(() => {
				changeSpy.resetHistory();
				selectSpy.resetHistory();
			});
	});

	it('Check size on element removing', () => {
		dataList.removeAt(0);

		expect(buffer.getGlobalSize()).eql(25);
		expect(buffer.getSourceSize()).eql(25);
		expect(buffer.getLocalSize()).eql(6);
	});

	it('Remove selected element', () => {
		dataList.removeAt(0);
		expect(changeSpy).calledBefore(selectSpy);

		expect(changeSpy)
			.callCount(1)
			.calledWith([
				'B', 'C', 'D',
				'E', 'F', 'G'
			]);

		expect(selectSpy)
			.callCount(1)
			.calledWith('B', 0, null, NaN);
	});

	it('Remove not selected element', () => {
		dataList.removeAt(1);
		expect(changeSpy)
			.callCount(1)
			.calledWith([
				'A', 'C', 'D',
				'E', 'F', 'G'
			]);

		expect(selectSpy)
			.callCount(0);
	});

	it('Remove element out of buffer', () => {
		dataList.removeAt(6);

		expect(changeSpy)
			.callCount(0);

		expect(selectSpy)
			.callCount(0);
	});
});
