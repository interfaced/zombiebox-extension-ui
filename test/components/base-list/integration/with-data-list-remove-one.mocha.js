import {createBuffer, setBufferSource, changeSpy, selectSpy, createDefaultDataList} from '../helper';


describe('BaseListDataList: remove one item', () => {
	const expect = chai.expect;
	const given = mochaTestSteps.given;
	const when = mochaTestSteps.when;
	const then = mochaTestSteps.then;

	let dataList;
	let buffer;
	let bufferPromise;

	beforeEach(() => {


		given('created baselist-datalist with source', () => {
			buffer = createBuffer({
				padding: 1,
				lineSize: 3,
				loadOnLeft: 1
			});
			dataList = createDefaultDataList();
			bufferPromise = setBufferSource(buffer, dataList)
				.then(() => {
					changeSpy.resetHistory();
					selectSpy.resetHistory();
				});

			return bufferPromise;
		});
	});

	it('Check size on element removing', () => {

		when('remove first element', () => {
			dataList.removeAt(0);
		});

		then('size should decreased by one', () => {
			expect(buffer.getGlobalSize()).eql(25);
			expect(buffer.getSourceSize()).eql(25);
			expect(buffer.getLocalSize()).eql(6);
		});

		return then('done');
	});

	it('Remove selected element', () => {

		when('remove first element', () => {
			dataList.removeAt(0);
		});

		then('items should be updated before select', () => {
			expect(changeSpy).calledBefore(selectSpy);
		});

		then('changeCallback should be called', () => {
			expect(changeSpy)
				.callCount(1)
				.calledWith([
					'B', 'C', 'D',
					'E', 'F', 'G'
				]);
		});

		then('selectCallback should be called with next element on same index', () => {
			expect(selectSpy)
				.callCount(1)
				.calledWith('B', 0, null, NaN);
		});

		return then('done');
	});

	it('Remove not selected element', () => {

		when('remove first element', () => {
			dataList.removeAt(1);
		});

		then('changeCallback should be called', () => {
			expect(changeSpy)
				.callCount(1)
				.calledWith([
					'A', 'C', 'D',
					'E', 'F', 'G'
				]);
		});

		then('selectCallback should not be called', () => {
			expect(selectSpy)
				.callCount(0);
		});

		return then('done');
	});

	it('Remove element out of buffer', () => {

		when('remove first element', () => {
			dataList.removeAt(6);
		});

		then('changeCallback should not be called', () => {
			expect(changeSpy)
				.callCount(0);
		});

		then('selectCallback should not be called', () => {
			expect(selectSpy)
				.callCount(0);
		});

		return then('done');
	});
});
