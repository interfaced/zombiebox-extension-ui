import CyclicalList from 'ui/data/cyclical-list';
import {createBuffer, createDefaultArray, setBufferSource, changeSpy, selectSpy} from '../helper';


describe('BaseListDataList with CyclicalList: select prev', () => {
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

	it('Selecting prev item', () => {

		given('created baselist-datalist', () => bufferPromise);

		when('select prev item', () => {
			dataList.selectPrevItem();
		});

		then('selectCallback is called once with new item and old item', () => {
			expect(selectSpy)
				.calledWith('Z', 7, null, NaN)
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

	it('Selecting prev prev item', () => {

		given('created baselist-datalist', () => bufferPromise);

		when('select prev prev item', () => {
			dataList.selectPrevItem();
			dataList.selectPrevItem();
		});

		then('selectCallback is called twice with new item and old item', () => {
			expect(selectSpy.withArgs('Z', 7, null, NaN))
				.callCount(1);
			expect(selectSpy.withArgs('Y', 6, 'Z', 7))
				.callCount(1);
		});

		then('changeCallback is called twice with new item and old item', () => {
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

	it('Selecting second and prev item', () => {

		given('created baselist-datalist', () => bufferPromise);

		when('select second and prev item', () => {
			dataList.selectAt(1);
			dataList.selectPrevItem();
		});

		then('selectCallback is called twice with new item and old item', () => {
			expect(selectSpy.withArgs('B', 1, 'A', 0))
				.callCount(1);
			expect(selectSpy.withArgs('A', 0, 'B', 1))
				.callCount(1);
		});

		then('changeCallback is not called', () => {
			expect(changeSpy)
				.callCount(0);
		});

		return then('done');
	});

	it('Selecting prev index via buffer', () => {

		given('created baselist-datalist', () => bufferPromise);

		when('select prev index', () => {
			buffer.selectPrevIndex();
		});

		then('selectCallback is called once with new item and old item', () => {
			expect(selectSpy)
				.calledWith('Z', 7, null, NaN)
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

	it('Selecting prev prev index via buffer', () => {

		given('created baselist-datalist', () => bufferPromise);

		when('select prev prev index', () => {
			buffer.selectPrevIndex();
			buffer.selectPrevIndex();
		});

		then('selectCallback is called twice with new item and old item', () => {
			expect(selectSpy.withArgs('Z', 7, null, NaN))
				.callCount(1);
			expect(selectSpy.withArgs('Y', 6, 'Z', 7))
				.callCount(1);
		});

		then('changeCallback is called once with new item and old item', () => {
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

	it('Selecting second item and prev index via buffer', () => {

		given('created baselist-datalist', () => bufferPromise);

		when('select last item and prev index', () => {
			dataList.selectAt(1);
			buffer.selectPrevIndex();
		});

		then('selectCallback is called twice with new item and old item', () => {
			expect(selectSpy.withArgs('B', 1, 'A', 0))
				.callCount(1);
			expect(selectSpy.withArgs('A', 0, 'B', 1))
				.callCount(1);
		});

		then('changeCallback is not called', () => {
			expect(changeSpy)
				.callCount(0);
		});

		return then('done');
	});

	it('Selecting prev line via buffer', () => {

		given('created baselist-datalist', () => bufferPromise);

		when('select prev index', () => {
			buffer.selectPrevLine();
		});

		then('selectCallback is called once with new item and old item', () => {
			expect(selectSpy)
				.calledWith('Y', 6, null, NaN)
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

	it('Selecting prev prev line via buffer', () => {

		given('created baselist-datalist', () => bufferPromise);

		when('select prev prev line', () => {
			buffer.selectPrevLine();
			buffer.selectPrevLine();
		});

		then('selectCallback is called twice with new item and old item', () => {
			expect(selectSpy.withArgs('Y', 6, null, NaN))
				.callCount(1);
			expect(selectSpy.withArgs('V', 3, 'Y', 6))
				.callCount(1);
		});

		then('changeCallback is called once with new item and old item', () => {
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

	it('Selecting second item and prev line via buffer', () => {

		given('created baselist-datalist', () => bufferPromise);

		when('select second item and prev line', () => {
			dataList.selectAt(1);
			buffer.selectPrevLine();
		});

		then('selectCallback is called twice with new item and old item', () => {
			expect(selectSpy.withArgs('B', 1, 'A', 0))
				.callCount(1);
			expect(selectSpy.withArgs('Z', 7, null, NaN))
				.callCount(1);
		});

		then('changeCallback is called once with new item and old item', () => {
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

	it('Selecting third item and prev line via buffer', () => {

		given('created baselist-datalist', () => bufferPromise);

		when('select third item and prev line', () => {
			dataList.selectAt(2);
			buffer.selectPrevLine();
		});

		then('selectCallback is called twice with new item and old item', () => {
			expect(selectSpy.withArgs('C', 2, 'A', 0))
				.callCount(1);
			expect(selectSpy.withArgs('X', 8, null, NaN))
				.callCount(1);
		});

		then('changeCallback is called once with new item and old item', () => {
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

	it('Selecting second line and prev line via buffer', () => {

		given('created baselist-datalist', () => bufferPromise);

		when('select second line and prev line', () => {
			buffer.selectNextLine();
			buffer.selectPrevLine();
		});

		then('selectCallback is called twice with new item and old item', () => {
			expect(selectSpy.withArgs('D', 3, 'A', 0))
				.callCount(1);
			expect(selectSpy.withArgs('A', 0, 'D', 3))
				.callCount(1);
		});

		then('changeCallback is not called', () => {
			expect(changeSpy)
				.callCount(0);
		});

		return then('done');
	});
});
