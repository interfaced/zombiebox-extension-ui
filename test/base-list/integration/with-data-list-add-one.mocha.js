describe('zb.ui.BaseListDataList: add one item', function() {
	var expect = chai.expect;
	var given = mochaTestSteps.given;
	var when = mochaTestSteps.when;
	var then = mochaTestSteps.then;

	var spyChange, spySelect;
	var helper = zb.ui.test.baseListHelper;

	beforeEach(function() {
		spyChange = sinon.spy(helper, 'changeCallback');
		spySelect = sinon.spy(helper, 'selectCallback');
	});

	afterEach(function() {
		spyChange.restore();
		spySelect.restore();
	});

	it('before the frame', function() {
		var buffer = helper.createBuffer({
			padding: 1,
			lineSize: 3,
			loadOnLeft: 1
		});
		var dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist with source', function() {
			return helper.setBufferSource(buffer, dataList);
		});
		given('frame moved from source beginning', function() {
			dataList.select('H');
			buffer._changeItems();

			spyChange.reset();
			spySelect.reset();
		});
		// WHEN
		when('add element to source - before buffer frame', function() {
			dataList.addAt('+1', 0);
		});
		// THEN
		then('changeCallback should be called once with shifted items around new index', function() {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'C', 'D', 'E',
					'F', 'G', 'H',
					'I', 'J', 'K'
				]);
		});
		then('selectCallback should be called with same element on new index', function() {
			expect(spySelect)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('before the frame, pushing selected item to new line', function() {
		var buffer = helper.createBuffer({
			padding: 2,
			lineSize: 3,
			loadOnLeft: 1
		});
		var dataList = helper.createDefaultDataList();

		// buffer frame position should change
		// GIVEN
		given('created baselist-datalist with source', function() {
			return helper.setBufferSource(buffer, dataList);
		});
		given('frame moved from source beginning', function() {
			dataList.select('H');
			buffer._changeItems();
			dataList.select('I');

			spyChange.reset();
			spySelect.reset();
		});
		// WHEN
		when('add element to source - before buffer frame', function() {
			dataList.addAt('+1', 0);
		});
		// THEN - buffer frame should be moved
		then('changeCallback should be called with CHANGED buffer frame position', function() {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'C', 'D', 'E',
					'F', 'G', 'H',
					'I', 'J', 'K',
					'L', 'M', 'N',
					'O', 'P', 'Q'
				]);
		});
		then('selectCallback should be called with same element on new index', function() {
			expect(spySelect)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('before the frame, pushing selected item to LOL', function() {
		var buffer = helper.createBuffer({
			padding: 1,
			lineSize: 3,
			loadOnLeft: 1
		});
		var dataList = helper.createDefaultDataList();

		// buffer frame position should change ONCE
		// GIVEN
		given('created baselist-datalist with source', function() {
			return helper.setBufferSource(buffer, dataList);
		});
		given('frame moved from source beginning', function() {
			dataList.select('H');
			buffer._changeItems();
			dataList.select('I');

			spyChange.reset();
			spySelect.reset();
		});
		// WHEN
		when('add element to source - before buffer frame', function() {
			dataList.addAt('+1', 0);
		});
		// THEN - buffer frame should be moved
		then('changeCallback should be called with CHANGED buffer frame position', function() {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'F', 'G', 'H',
					'I', 'J', 'K',
					'L', 'M', 'N'
				]);
		});
		then('selectCallback should be called with same element on new index', function() {
			expect(spySelect)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('in the frame before selected', function() {
		var buffer = helper.createBuffer({
			padding: 1,
			lineSize: 3,
			loadOnLeft: 1
		});
		var dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist with source', function() {
			return helper.setBufferSource(buffer, dataList);
		});
		given('frame moved from source beginning', function() {
			dataList.select('H');
			buffer._changeItems();

			spyChange.reset();
			spySelect.reset();
		});
		// WHEN
		when('add element to source - in the frame before selected', function() {
			dataList.addAt('+', 4);
		});
		// THEN
		then('changeCallback should be called ONCE with shifted items around new index', function() {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'D', '+', 'E',
					'F', 'G', 'H',
					'I', 'J', 'K'
				]);
		});
		then('selectCallback should be called with same element on new index', function() {
			expect(spySelect)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('selected', function() {
		var buffer = helper.createBuffer({
			padding: 2,
			lineSize: 3,
			loadOnLeft: 1
		});
		var dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist with source', function() {
			return helper.setBufferSource(buffer, dataList);
		});
		given('frame moved from source beginning', function() {
			dataList.select('K');
			buffer._changeItems();

			spyChange.reset();
			spySelect.reset();
		});
		// WHEN
		when('add element to source - at the index of selected element', function() {
			dataList.addAt('+', 10);
		});
		// THEN
		then('selected element must shift right', function() {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'D', 'E', 'F',
					'G', 'H', 'I',
					'J', '+', 'K',
					'L', 'M', 'N',
					'O', 'P', 'Q'
				]);
		});
		then('selected element new index', function() {
			expect(spySelect)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('in buffer frame after selected', function() {
		var buffer = helper.createBuffer({
			padding: 2,
			lineSize: 3,
			loadOnLeft: 1
		});
		var dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist with source', function() {
			return helper.setBufferSource(buffer, dataList);
		});
		given('frame moved from source beginning', function() {
			dataList.select('K');
			buffer._changeItems();

			spyChange.reset();
			spySelect.reset();
		});
		// WHEN
		when('add element to source - at the index in buffer frame after selected element', function() {
			dataList.addAt('+', 11);
		});
		// THEN
		then('elements after selected must shift right', function() {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'D', 'E', 'F',
					'G', 'H', 'I',
					'J', 'K', '+',
					'L', 'M', 'N',
					'O', 'P', 'Q'
				]);
		});
		then('selectCallback should not be called', function() {
			expect(spySelect)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('after buffer frame', function() {
		var buffer = helper.createBuffer({
			padding: 2,
			lineSize: 3,
			loadOnLeft: 1
		});
		var dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist with source', function() {
			return helper.setBufferSource(buffer, dataList);
		});
		given('frame moved from source beginning', function() {
			dataList.select('K');
			buffer._changeItems();

			spyChange.reset();
			spySelect.reset();
		});
		// WHEN
		when('after buffer frame', function() {
			dataList.addAt('+', 18);
		});
		// THEN
		then('changeCallback should not be called', function() {
			expect(spyChange)
				.callCount(0);
		});
		then('selectCallback should not be called', function() {
			expect(spySelect)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	// TODO: протестировать работу с DynamicList

});
