import List from 'ui/data/list';
import {createBuffer, setBufferSource, createEmptyDataList, createDefaultArray} from '../helper';


describe('BaseListDataList: getters', () => {
	const expect = chai.expect;
	const given = mochaTestSteps.given;
	const when = mochaTestSteps.when;
	const then = mochaTestSteps.then;

	let buffer;

	beforeEach(() => {

		given('created empty baselist-datalist', () => {
			buffer = createBuffer();
		});
	});

	it('When null', () => {

		when('set source', () => setBufferSource(buffer, null));

		then('local variables has values', () => {
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

		return then('done');
	});

	it('When empty array', () => {

		when('set source', () => {
			const dataList = createEmptyDataList();
			return setBufferSource(buffer, dataList);
		});

		then('local variables has values', () => {
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

		return then('done');
	});

	it('When size is 0', () => {

		when('set source', () => {
			const array = createDefaultArray().slice(0, 1);
			const dataList = new List(array);
			return setBufferSource(buffer, dataList);
		});

		then('local variables has values', () => {
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

		return then('done');
	});

	it('When size is 2', () => {

		when('set source', () => {
			const array = createDefaultArray().slice(0, 2);
			const dataList = new List(array);
			return setBufferSource(buffer, dataList);
		});

		then('local variables has values', () => {
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

		return then('done');
	});

	it('When size is 3', () => {

		when('set source', () => {
			const array = createDefaultArray().slice(0, 3);
			const dataList = new List(array);
			return setBufferSource(buffer, dataList);
		});

		then('local variables has values', () => {
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

		return then('done');
	});
});
