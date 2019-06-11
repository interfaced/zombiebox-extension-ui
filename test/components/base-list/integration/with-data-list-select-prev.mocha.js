import {createBuffer, setBufferSource, changeSpy, selectSpy, createDefaultDataList} from '../helper';


describe('BaseListDataList: select prev', () => {
	const expect = chai.expect;
	const given = mochaTestSteps.given;
	const when = mochaTestSteps.when;
	const then = mochaTestSteps.then;

	let dataList;
	let buffer;
	let bufferPromise;

	beforeEach(() => {
		buffer = createBuffer();
		dataList = createDefaultDataList();
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

		then('selectCallback is not called', () => {
			expect(selectSpy)
				.callCount(0);
		});

		then('changeCallback is not called', () => {
			expect(changeSpy)
				.callCount(0);
		});

		return then('done');
	});

	it('Selecting prev prev item', () => {

		given('created baselist-datalist', () => bufferPromise);

		when('select prev prev item', () => {
			dataList.selectPrevItem();
			dataList.selectPrevItem();
		});

		then('selectCallback is not called', () => {
			expect(selectSpy)
				.callCount(0);
		});

		then('changeCallback is not called', () => {
			expect(changeSpy)
				.callCount(0);
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

		then('selectCallback is not called', () => {
			expect(selectSpy)
				.callCount(0);
		});

		then('changeCallback is not called', () => {
			expect(changeSpy)
				.callCount(0);
		});

		return then('done');
	});

	it('Selecting prev prev index via buffer', () => {

		given('created baselist-datalist', () => bufferPromise);

		when('select prev prev index', () => {
			buffer.selectPrevIndex();
			buffer.selectPrevIndex();
		});

		then('selectCallback is not called', () => {
			expect(selectSpy)
				.callCount(0);
		});

		then('changeCallback is not called', () => {
			expect(changeSpy)
				.callCount(0);
		});

		return then('done');
	});

	it('Selecting second item and prev index via buffer', () => {

		given('created baselist-datalist', () => bufferPromise);

		when('select second item and prev index', () => {
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

		then('selectCallback is not called', () => {
			expect(selectSpy)
				.callCount(0);
		});

		then('changeCallback is not called', () => {
			expect(changeSpy)
				.callCount(0);
		});

		return then('done');
	});

	it('Selecting prev prev line via buffer', () => {

		given('created baselist-datalist', () => bufferPromise);

		when('select prev prev line', () => {
			buffer.selectPrevLine();
			buffer.selectPrevLine();
		});

		then('selectCallback is not called', () => {
			expect(selectSpy)
				.callCount(0);
		});

		then('changeCallback is not called', () => {
			expect(changeSpy)
				.callCount(0);
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
