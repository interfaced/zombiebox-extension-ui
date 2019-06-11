import {createBuffer, setBufferSource, changeSpy, selectSpy, createDefaultDataList} from '../helper';


describe('BaseListDataList: add one item', () => {
	const expect = chai.expect;
	const given = mochaTestSteps.given;
	const when = mochaTestSteps.when;
	const then = mochaTestSteps.then;

	it('before the frame', () => {
		const buffer = createBuffer({
			padding: 1,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = createDefaultDataList();


		given('created baselist-datalist with source', () => setBufferSource(buffer, dataList));

		given('frame moved from source beginning', () => {
			dataList.select('H');
			buffer._changeItems();

			changeSpy.resetHistory();
			selectSpy.resetHistory();
		});

		when('add element to source - before buffer frame', () => {
			dataList.addAt('+1', 0);
		});

		then('changeCallback should be called once with shifted items around new index', () => {
			expect(changeSpy)
				.callCount(1)
				.calledWith([
					'C', 'D', 'E',
					'F', 'G', 'H',
					'I', 'J', 'K'
				]);
		});

		then('selectCallback should be called with same element on new index', () => {
			expect(selectSpy)
				.callCount(0);
		});

		return then('done');
	});

	it('before the frame, pushing selected item to new line', () => {
		const buffer = createBuffer({
			padding: 2,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = createDefaultDataList();

		// buffer frame position should change

		given('created baselist-datalist with source', () => setBufferSource(buffer, dataList));

		given('frame moved from source beginning', () => {
			dataList.select('H');
			buffer._changeItems();
			dataList.select('I');

			changeSpy.resetHistory();
			selectSpy.resetHistory();
		});

		when('add element to source - before buffer frame', () => {
			dataList.addAt('+1', 0);
		});

		// buffer frame should be moved
		then('changeCallback should be called with CHANGED buffer frame position', () => {
			expect(changeSpy)
				.callCount(1)
				.calledWith([
					'C', 'D', 'E',
					'F', 'G', 'H',
					'I', 'J', 'K',
					'L', 'M', 'N',
					'O', 'P', 'Q'
				]);
		});

		then('selectCallback should be called with same element on new index', () => {
			expect(selectSpy)
				.callCount(0);
		});

		return then('done');
	});

	it('before the frame, pushing selected item to LOL', () => {
		const buffer = createBuffer({
			padding: 1,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = createDefaultDataList();

		// buffer frame position should change ONCE

		given('created baselist-datalist with source', () => setBufferSource(buffer, dataList));

		given('frame moved from source beginning', () => {
			dataList.select('H');
			buffer._changeItems();
			dataList.select('I');

			changeSpy.resetHistory();
			selectSpy.resetHistory();
		});

		when('add element to source - before buffer frame', () => {
			dataList.addAt('+1', 0);
		});

		// buffer frame should be moved
		then('changeCallback should be called with CHANGED buffer frame position', () => {
			expect(changeSpy)
				.callCount(1)
				.calledWith([
					'F', 'G', 'H',
					'I', 'J', 'K',
					'L', 'M', 'N'
				]);
		});

		then('selectCallback should be called with same element on new index', () => {
			expect(selectSpy)
				.callCount(0);
		});

		return then('done');
	});

	it('in the frame before selected', () => {
		const buffer = createBuffer({
			padding: 1,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = createDefaultDataList();


		given('created baselist-datalist with source', () => setBufferSource(buffer, dataList));

		given('frame moved from source beginning', () => {
			dataList.select('H');
			buffer._changeItems();

			changeSpy.resetHistory();
			selectSpy.resetHistory();
		});

		when('add element to source - in the frame before selected', () => {
			dataList.addAt('+', 4);
		});

		then('changeCallback should be called ONCE with shifted items around new index', () => {
			expect(changeSpy)
				.callCount(1)
				.calledWith([
					'D', '+', 'E',
					'F', 'G', 'H',
					'I', 'J', 'K'
				]);
		});

		then('selectCallback should be called with same element on new index', () => {
			expect(selectSpy)
				.callCount(0);
		});

		return then('done');
	});

	it('selected', () => {
		const buffer = createBuffer({
			padding: 2,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = createDefaultDataList();


		given('created baselist-datalist with source', () => setBufferSource(buffer, dataList));

		given('frame moved from source beginning', () => {
			dataList.select('K');
			buffer._changeItems();

			changeSpy.resetHistory();
			selectSpy.resetHistory();
		});

		when('add element to source - at the index of selected element', () => {
			dataList.addAt('+', 10);
		});

		then('selected element must shift right', () => {
			expect(changeSpy)
				.callCount(1)
				.calledWith([
					'D', 'E', 'F',
					'G', 'H', 'I',
					'J', '+', 'K',
					'L', 'M', 'N',
					'O', 'P', 'Q'
				]);
		});

		then('selected element new index', () => {
			expect(selectSpy)
				.callCount(0);
		});

		return then('done');
	});

	it('in buffer frame after selected', () => {
		const buffer = createBuffer({
			padding: 2,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = createDefaultDataList();


		given('created baselist-datalist with source', () => setBufferSource(buffer, dataList));

		given('frame moved from source beginning', () => {
			dataList.select('K');
			buffer._changeItems();

			changeSpy.resetHistory();
			selectSpy.resetHistory();
		});

		when('add element to source - at the index in buffer frame after selected element', () => {
			dataList.addAt('+', 11);
		});

		then('elements after selected must shift right', () => {
			expect(changeSpy)
				.callCount(1)
				.calledWith([
					'D', 'E', 'F',
					'G', 'H', 'I',
					'J', 'K', '+',
					'L', 'M', 'N',
					'O', 'P', 'Q'
				]);
		});

		then('selectCallback should not be called', () => {
			expect(selectSpy)
				.callCount(0);
		});

		return then('done');
	});

	it('after buffer frame', () => {
		const buffer = createBuffer({
			padding: 2,
			lineSize: 3,
			loadOnLeft: 1
		});
		const dataList = createDefaultDataList();


		given('created baselist-datalist with source', () => setBufferSource(buffer, dataList));

		given('frame moved from source beginning', () => {
			dataList.select('K');
			buffer._changeItems();

			changeSpy.resetHistory();
			selectSpy.resetHistory();
		});

		when('after buffer frame', () => {
			dataList.addAt('+', 18);
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
