import List from 'ui/data/list';
import {createBuffer, setBufferSource, createEmptyDataList, createDefaultArray} from '../helper';

const expect = chai.expect;


describe('BaseListDataList: getters', () => {
	let buffer;

	beforeEach(() => {
		buffer = createBuffer();
	});

	it('When null', async () => {
		await setBufferSource(buffer, null);

		expect(buffer.getSourceStart()).eql(NaN);
		expect(buffer.getSourceEnd()).eql(NaN);
		expect(buffer.getSourceIndex()).eql(NaN);
		expect(buffer.getSourceSize()).eql(0);

		expect(buffer.getLocalStart()).eql(NaN);
		expect(buffer.getLocalEnd()).eql(NaN);
		expect(buffer.getLocalIndex()).eql(NaN);
		expect(buffer.getLocalSize()).eql(0);

		expect(buffer.getGlobalStart()).eql(NaN);
		expect(buffer.getGlobalEnd()).eql(NaN);
		expect(buffer.getGlobalIndex()).eql(NaN);
		expect(buffer.getGlobalSize()).eql(0);
	});

	it('When empty array', async () => {
		const dataList = createEmptyDataList();
		await setBufferSource(buffer, dataList);

		expect(buffer.getSourceStart()).eql(NaN);
		expect(buffer.getSourceEnd()).eql(NaN);
		expect(buffer.getSourceIndex()).eql(NaN);
		expect(buffer.getSourceSize()).eql(0);

		expect(buffer.getLocalStart()).eql(NaN);
		expect(buffer.getLocalEnd()).eql(NaN);
		expect(buffer.getLocalIndex()).eql(NaN);
		expect(buffer.getLocalSize()).eql(0);

		expect(buffer.getGlobalStart()).eql(NaN);
		expect(buffer.getGlobalEnd()).eql(NaN);
		expect(buffer.getGlobalIndex()).eql(NaN);
		expect(buffer.getGlobalSize()).eql(0);
	});

	it('When size is 0', async () => {
		const array = createDefaultArray().slice(0, 1);
		const dataList = new List(array);
		await setBufferSource(buffer, dataList);

		expect(buffer.getSourceStart()).eql(0);
		expect(buffer.getSourceEnd()).eql(0);
		expect(buffer.getSourceIndex()).eql(0);
		expect(buffer.getSourceSize()).eql(1);

		expect(buffer.getLocalStart()).eql(0);
		expect(buffer.getLocalEnd()).eql(0);
		expect(buffer.getLocalIndex()).eql(0);
		expect(buffer.getLocalSize()).eql(1);

		expect(buffer.getGlobalStart()).eql(0);
		expect(buffer.getGlobalEnd()).eql(0);
		expect(buffer.getGlobalIndex()).eql(0);
		expect(buffer.getGlobalSize()).eql(1);
	});

	it('When size is 2', async () => {
		const array = createDefaultArray().slice(0, 2);
		const dataList = new List(array);
		await setBufferSource(buffer, dataList);

		expect(buffer.getSourceStart()).eql(0);
		expect(buffer.getSourceEnd()).eql(1);
		expect(buffer.getSourceIndex()).eql(0);
		expect(buffer.getSourceSize()).eql(2);

		expect(buffer.getLocalStart()).eql(0);
		expect(buffer.getLocalEnd()).eql(1);
		expect(buffer.getLocalIndex()).eql(0);
		expect(buffer.getLocalSize()).eql(2);

		expect(buffer.getGlobalStart()).eql(0);
		expect(buffer.getGlobalEnd()).eql(1);
		expect(buffer.getGlobalIndex()).eql(0);
		expect(buffer.getGlobalSize()).eql(2);
	});

	it('When size is 3', async () => {
		const array = createDefaultArray().slice(0, 3);
		const dataList = new List(array);
		await setBufferSource(buffer, dataList);

		expect(buffer.getSourceStart()).eql(0);
		expect(buffer.getSourceEnd()).eql(2);
		expect(buffer.getSourceIndex()).eql(0);
		expect(buffer.getSourceSize()).eql(3);

		expect(buffer.getLocalStart()).eql(0);
		expect(buffer.getLocalEnd()).eql(2);
		expect(buffer.getLocalIndex()).eql(0);
		expect(buffer.getLocalSize()).eql(3);

		expect(buffer.getGlobalStart()).eql(0);
		expect(buffer.getGlobalEnd()).eql(2);
		expect(buffer.getGlobalIndex()).eql(0);
		expect(buffer.getGlobalSize()).eql(3);
	});
});
