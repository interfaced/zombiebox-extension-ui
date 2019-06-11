import {createBuffer, setBufferSource, changeSpy, selectSpy, createDefaultDataList} from '../helper';


describe('BaseListDataList: select', () => {
	const expect = chai.expect;
	const given = mochaTestSteps.given;
	const when = mochaTestSteps.when;
	const then = mochaTestSteps.then;

	it('inside passive zone', () => {
		const buffer = createBuffer({
			padding: 1,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = createDefaultDataList();

		given('created baselist-datalist with source', () => setBufferSource(buffer, dataList)
			.then(() => {
				changeSpy.resetHistory();
				selectSpy.resetHistory();
			}));

		when('select element in passive zone', () => {
			dataList.select('B');
		});

		then('selectCallback is called once with new item and old item', () => {
			expect(selectSpy)
				.callCount(1)
				.calledWith('B', 1, 'A', 0);
		});

		then('changeCallback is not called', () => {
			expect(changeSpy)
				.callCount(0);
		});

		return then('done');
	});

	it('inside passive zone with shifted index', () => {
		const buffer = createBuffer({
			padding: 1,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = createDefaultDataList();


		given('created baselist-datalist with source', () => setBufferSource(buffer, dataList));

		given('frame is moved from source beginning', () => {
			dataList.select('H');
			buffer._changeItems();

			changeSpy.resetHistory();
			selectSpy.resetHistory();
		});

		when('select element in passive zone', () => {
			dataList.select('I');
		});

		then('selectCallback is called once with new item and old item', () => {
			expect(selectSpy)
				.callCount(1)
				.calledWith('I', 5, 'H', 4);
		});

		then('changeCallback is not called', () => {
			expect(changeSpy)
				.callCount(0);
		});

		return then('done');
	});

	it('on border of loadOnLeft zone', () => {
		const buffer = createBuffer({
			padding: 2,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = createDefaultDataList();


		given('created baselist-datalist with source', () => setBufferSource(buffer, dataList)
			.then(() => {
				changeSpy.resetHistory();
				selectSpy.resetHistory();
			}));

		when('select element on border of loadOnLeft zone', () => {
			dataList.select('D');
		});

		then('selectCallback is called once with new item and old item', () => {
			expect(selectSpy)
				.callCount(1)
				.calledWith('D', 3, 'A', 0);
		});

		then('changeCallback is not called', () => {
			expect(changeSpy)
				.callCount(0);
		});

		return then('done');
	});

	it('on border of buffer (inside loadOnLeft zone)', () => {
		const buffer = createBuffer({
			padding: 1,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = createDefaultDataList();


		given('created baselist-datalist with source', () => setBufferSource(buffer, dataList)
			.then(() => {
				changeSpy.resetHistory();
				selectSpy.resetHistory();
			}));

		when('select element in on border of buffer zone', () => {
			dataList.select('D');
		});

		then('selectCallback is called once with new item and old item', () => {
			expect(selectSpy)
				.callCount(1)
				.calledWith('D', 3, 'A', 0);
		});

		then('changeCallback called once with new buffer contents', () => {
			expect(changeSpy)
				.callCount(1)
				.calledWith([
					'A', 'B', 'C',
					'D', 'E', 'F',
					'G', 'H', 'I'
				]);
		});

		return then('done');
	});

	it('out of buffer', () => {
		const buffer = createBuffer({
			padding: 2,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = createDefaultDataList();


		given('created baselist-datalist with source', () => setBufferSource(buffer, dataList));

		given('selected element is close to frame border', () => {
			dataList.select('B');
			buffer._changeItems();
			dataList.select('E');

			changeSpy.resetHistory();
			selectSpy.resetHistory();
		});

		when('select element out of buffer zone', () => {
			dataList.select('K');
		});

		then('selectCallback is called once with new item and old item', () => {
			expect(selectSpy)
				.callCount(1)
				.calledWith('K', 7, 'E', 1);
		});

		then('changeCallback called once with new buffer contents', () => {
			expect(changeSpy)
				.callCount(1)
				.calledWith([
					'D', 'E', 'F',
					'G', 'H', 'I',
					'J', 'K', 'L',
					'M', 'N', 'O',
					'P', 'Q', 'R'
				]);
		});

		return then('done');
	});

	it('old element outside new frame', () => {
		const buffer = createBuffer({
			padding: 1,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = createDefaultDataList();


		given('created baselist-datalist with source', () => setBufferSource(buffer, dataList)
			.then(() => {
				changeSpy.resetHistory();
				selectSpy.resetHistory();
			}));

		when('select element far outside current frame', () => {
			dataList.select('Q');
		});

		then('selectCallback is called once with null-NaN for old item', () => {
			expect(selectSpy)
				.callCount(1)
				.calledWith('Q', 4, null, NaN);
		});

		then('changeCallback called once with new frame contents', () => {
			expect(changeSpy)
				.callCount(1)
				.calledWith([
					'M', 'N', 'O',
					'P', 'Q', 'R',
					'S', 'T', 'U'
				]);
		});

		return then('done');
	});
});
