import CyclicalList from 'ui/data/cyclical-list';
import {createBuffer, createDefaultArray, setBufferSource, changeSpy, selectSpy} from '../helper';


describe('BaseListDataList with CyclicalList: select next', () => {
	const expect = chai.expect;
	const given = mochaTestSteps.given;
	const when = mochaTestSteps.when;
	const then = mochaTestSteps.then;

	let dataList;
	let buffer;
	let bufferPromise;

	beforeEach(() => {
		buffer = createBuffer();
		dataList = new CyclicalList(createDefaultArray());
		bufferPromise = setBufferSource(buffer, dataList)
			.then(() => {
				changeSpy.resetHistory();
				selectSpy.resetHistory();
			});
	});

	it('Selecting next item', () => {
		given('created baselist-datalist', () => bufferPromise);

		when('select next item', () => {
			dataList.selectNextItem();
		});

		then('selectCallback is called once with new item and old item', () => {
			expect(selectSpy)
				.calledWith('B', 1, 'A', 0)
				.callCount(1);
		});

		then('changeCallback is not called', () => {
			expect(changeSpy)
				.callCount(0);
		});

		return then('done');
	});

	it('Selecting next next item', () => {
		given('created baselist-datalist', () => bufferPromise);

		when('select next next item', () => {
			dataList.selectNextItem();
			dataList.selectNextItem();
		});

		then('selectCallback is called twice with new item and old item', () => {
			expect(selectSpy.withArgs('B', 1, 'A', 0))
				.callCount(1);
			expect(selectSpy.withArgs('C', 2, 'B', 1))
				.callCount(1);
		});

		then('changeCallback is not called', () => {
			expect(changeSpy)
				.callCount(0);
		});

		return then('done');
	});

	it('Selecting last but one and last item', () => {
		given('created baselist-datalist', () => bufferPromise);

		when('select last but one and next item', () => {
			dataList.selectAt(dataList.size() - 2);
			dataList.selectNextItem();
		});

		then('selectCallback is called twice with new item and old item', () => {
			expect(selectSpy.withArgs('Y', 6, null, NaN))
				.callCount(1);
			expect(selectSpy.withArgs('Z', 7, 'Y', 6))
				.callCount(1);
		});

		then('changeCallback is called once with new buffer contents', () => {
			expect(changeSpy)
				.calledWith([
					'S', 'T', 'U',
					'V', 'W', 'X',
					'Y', 'Z'
				])
				.callCount(1);
		});

		return then('done');
	});

	it('Selecting next after last item', () => {
		given('created baselist-datalist', () => bufferPromise);

		when('select last and next item', () => {
			dataList.selectLast();
			dataList.selectNextItem();
		});

		then('selectCallback is called twice with new item and old item', () => {
			expect(selectSpy.withArgs('Z', 7, null, NaN))
				.callCount(1);
			expect(selectSpy.withArgs('A', 0, null, NaN))
				.callCount(1);
		});

		then('changeCallback is called twice with new buffer contents', () => {
			expect(changeSpy.withArgs([
				'S', 'T', 'U',
				'V', 'W', 'X',
				'Y', 'Z'
			]))
				.callCount(1);
			expect(changeSpy.withArgs([
				'A', 'B', 'C',
				'D', 'E', 'F',
				'G', 'H', 'I'
			]))
				.callCount(1);
		});

		return then('done');
	});

	it('Selecting next index via buffer', () => {
		given('created baselist-datalist', () => bufferPromise);

		when('select next index', () => {
			buffer.selectNextIndex();
		});

		then('selectCallback is called once with new item and old item', () => {
			expect(selectSpy)
				.calledWith('B', 1, 'A', 0)
				.callCount(1);
		});

		then('changeCallback is not called', () => {
			expect(changeSpy)
				.callCount(0);
		});

		return then('done');
	});

	it('Selecting next next index via buffer', () => {
		given('created baselist-datalist', () => bufferPromise);

		when('select next next index', () => {
			buffer.selectNextIndex();
			buffer.selectNextIndex();
		});

		then('selectCallback is called twice with new item and old item', () => {
			expect(selectSpy.withArgs('B', 1, 'A', 0))
				.callCount(1);
			expect(selectSpy.withArgs('C', 2, 'B', 1))
				.callCount(1);
		});

		then('changeCallback is not called', () => {
			expect(changeSpy)
				.callCount(0);
		});

		return then('done');
	});

	it('Selecting last but one item and next index via buffer', () => {
		given('created baselist-datalist', () => bufferPromise);

		when('select last item and next index', () => {
			dataList.selectAt(dataList.size() - 2);
			buffer.selectNextIndex();
		});

		then('selectCallback is called twice with new item and old item', () => {
			expect(selectSpy.withArgs('Y', 6, null, NaN))
				.callCount(1);
			expect(selectSpy.withArgs('Z', 7, 'Y', 6))
				.callCount(1);
		});

		then('changeCallback is called once with new buffer contents', () => {
			expect(changeSpy)
				.calledWith([
					'S', 'T', 'U',
					'V', 'W', 'X',
					'Y', 'Z'
				])
				.callCount(1);
		});

		return then('done');
	});

	it('Selecting last item and next index via buffer', () => {
		given('created baselist-datalist', () => bufferPromise);

		when('select last item and next line', () => {
			dataList.selectLast();
			buffer.selectNextIndex();
		});

		then('selectCallback is called twice with new item and old item', () => {
			expect(selectSpy.withArgs('Z', 7, null, NaN))
				.callCount(1);
			expect(selectSpy.withArgs('A', 0, null, NaN))
				.callCount(1);
		});

		then('changeCallback is called twice with new buffer contents', () => {
			expect(changeSpy.withArgs([
				'S', 'T', 'U',
				'V', 'W', 'X',
				'Y', 'Z'
			]))
				.callCount(1);
			expect(changeSpy.withArgs([
				'A', 'B', 'C',
				'D', 'E', 'F',
				'G', 'H', 'I'
			]))
				.callCount(1);
		});

		return then('done');
	});

	it('Selecting next line via buffer', () => {
		given('created baselist-datalist', () => bufferPromise);

		when('select next line', () => {
			buffer.selectNextLine();
		});

		then('selectCallback is called once with new item and old item', () => {
			expect(selectSpy)
				.calledWith('D', 3, 'A', 0)
				.callCount(1);
		});

		then('changeCallback is not called', () => {
			expect(changeSpy)
				.callCount(0);
		});

		return then('done');
	});

	it('Selecting next next line via buffer', () => {
		given('created baselist-datalist', () => bufferPromise);

		when('select next next line', () => {
			buffer.selectNextLine();
			buffer.selectNextLine();
		});

		then('selectCallback is called twice with new item and old item', () => {
			expect(selectSpy.withArgs('D', 3, 'A', 0))
				.callCount(1);
			expect(selectSpy.withArgs('G', 6, 'D', 3))
				.callCount(1);
		});

		then('changeCallback is called once with new buffer contents', () => {
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

		return then('done');
	});

	it('Selecting next item and next line via buffer', () => {
		given('created baselist-datalist', () => bufferPromise);

		when('select next item and next line', () => {
			dataList.selectNextItem();
			buffer.selectNextLine();
		});

		then('selectCallback is called twice with new item and old item', () => {
			expect(selectSpy.withArgs('B', 1, 'A', 0))
				.callCount(1);
			expect(selectSpy.withArgs('E', 4, 'B', 1))
				.callCount(1);
		});

		then('changeCallback is not called', () => {
			expect(changeSpy)
				.callCount(0);
		});

		return then('done');
	});

	it('Selecting next next item and next line via buffer', () => {
		given('created baselist-datalist', () => bufferPromise);

		when('select next item and next line', () => {
			dataList.selectNextItem();
			dataList.selectNextItem();
			buffer.selectNextLine();
		});

		then('selectCallback is called twice with new item and old item', () => {
			expect(selectSpy.withArgs('B', 1, 'A', 0))
				.callCount(1);
			expect(selectSpy.withArgs('C', 2, 'B', 1))
				.callCount(1);
			expect(selectSpy.withArgs('F', 5, 'C', 2))
				.callCount(1);
		});

		then('changeCallback is not called', () => {
			expect(changeSpy)
				.callCount(0);
		});

		return then('done');
	});

	it('Selecting last but one line and next line via buffer', () => {
		given('created baselist-datalist', () => bufferPromise);

		when('select last but one line and next line', () => {
			dataList.selectAt(dataList.size() - 5);
			buffer.selectNextLine();
		});

		then('selectCallback is called twice with new item and old item', () => {
			expect(selectSpy.withArgs('V', 6, null, NaN))
				.callCount(1);
			expect(selectSpy.withArgs('Y', 9, 'V', 6))
				.callCount(1);
		});

		then('changeCallback is called once with new buffer contents', () => {
			expect(changeSpy)
				.calledWith([
					'P', 'Q', 'R',
					'S', 'T', 'U',
					'V', 'W', 'X',
					'Y', 'Z'
				])
				.callCount(1);
		});

		return then('done');
	});

	it('Selecting last but one item and next line via buffer', () => {
		given('created baselist-datalist', () => bufferPromise);

		when('select last but one item and next line', () => {
			dataList.selectAt(dataList.size() - 2);
			buffer.selectNextLine();
		});

		then('selectCallback is called twice with new item and old item', () => {
			expect(selectSpy.withArgs('Y', 6, null, NaN))
				.callCount(1);
			expect(selectSpy.withArgs('A', 0, null, NaN))
				.callCount(1);
		});

		then('changeCallback is called twice with new buffer contents', () => {
			expect(changeSpy.withArgs([
				'S', 'T', 'U',
				'V', 'W', 'X',
				'Y', 'Z'
			]))
				.callCount(1);
			expect(changeSpy.withArgs([
				'A', 'B', 'C',
				'D', 'E', 'F',
				'G', 'H', 'I'
			]))
				.callCount(1);
		});

		return then('done');
	});

	it('Selecting last but two item and next line via buffer', () => {
		given('created baselist-datalist', () => bufferPromise);

		when('select last but two item and next line', () => {
			dataList.selectAt(dataList.size() - 3);
			buffer.selectNextLine();
		});

		then('selectCallback is called twice with new item and old item', () => {
			expect(selectSpy.withArgs('X', 8, null, NaN))
				.callCount(1);
			expect(selectSpy.withArgs('C', 2, null, NaN))
				.callCount(1);
		});

		then('changeCallback is called twice with new buffer contents', () => {
			expect(changeSpy.withArgs([
				'P', 'Q', 'R',
				'S', 'T', 'U',
				'V', 'W', 'X',
				'Y', 'Z'
			]))
				.callCount(1);
			expect(changeSpy.withArgs([
				'A', 'B', 'C',
				'D', 'E', 'F',
				'G', 'H', 'I'
			]))
				.callCount(1);
		});

		return then('done');
	});

	it('Selecting last item and next line via buffer', () => {
		given('created baselist-datalist', () => bufferPromise);

		when('select last item and next line', () => {
			dataList.selectLast();
			buffer.selectNextLine();
		});

		then('selectCallback is called twice with new item and old item', () => {
			expect(selectSpy.withArgs('Z', 7, null, NaN))
				.callCount(1);
			expect(selectSpy.withArgs('B', 1, null, NaN))
				.callCount(1);
		});

		then('changeCallback is called twice with new buffer contents', () => {
			expect(changeSpy.withArgs([
				'S', 'T', 'U',
				'V', 'W', 'X',
				'Y', 'Z'
			]))
				.callCount(1);
			expect(changeSpy.withArgs([
				'A', 'B', 'C',
				'D', 'E', 'F',
				'G', 'H', 'I'
			]))
				.callCount(1);
		});

		return then('done');
	});
});
