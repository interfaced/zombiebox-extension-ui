describe('zb.ui.BaseListDataList: select', function() {
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

	it('inside passive zone', function() {
		var buffer = helper.createBuffer({
			padding: 1,
			lineSize: 3,
			loadOnLeft: 1
		});
		var dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist with source', function() {
			return helper
				.setBufferSource(buffer, dataList)
				.then(function() {
					spyChange.reset();
					spySelect.reset();
				});
		});
		// WHEN
		when('select element in passive zone', function() {
			dataList.select('B');
		});
		// THEN
		then('selectCallback is called once with new item and old item', function() {
			expect(spySelect)
				.callCount(1)
				.calledWith('B', 1, 'A', 0);
		});
		then('changeCallback is not called', function() {
			expect(spyChange)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('inside passive zone with shifted index', function() {
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
		given('frame is moved from source beginning' , function() {
			dataList.select('H');
			buffer._changeItems();

			spyChange.reset();
			spySelect.reset();
		});
		// WHEN
		when('select element in passive zone', function() {
			dataList.select('I');
		});
		// THEN
		then('selectCallback is called once with new item and old item', function() {
			expect(spySelect)
				.callCount(1)
				.calledWith('I', 5, 'H', 4);
		});
		then('changeCallback is not called', function() {
			expect(spyChange)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('on border of loadOnLeft zone', function() {
		var buffer = helper.createBuffer({
			padding: 2,
			lineSize: 3,
			loadOnLeft: 1
		});
		var dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist with source', function() {
			return helper
				.setBufferSource(buffer, dataList)
				.then(function() {
					spyChange.reset();
					spySelect.reset();
				});
		});
		// WHEN
		when('select element on border of loadOnLeft zone' , function() {
			dataList.select('D');
		});
		// THEN
		then('selectCallback is called once with new item and old item', function() {
			expect(spySelect)
				.callCount(1)
				.calledWith('D', 3, 'A', 0);
		});
		then('changeCallback is not called', function() {
			expect(spyChange)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('on border of buffer (inside loadOnLeft zone)', function() {
		var buffer = helper.createBuffer({
			padding: 1,
			lineSize: 3,
			loadOnLeft: 1
		});
		var dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist with source', function() {
			return helper
				.setBufferSource(buffer, dataList)
				.then(function() {
					spyChange.reset();
					spySelect.reset();
				});
		});
		// WHEN
		when('select element in on border of buffer zone' , function() {
			dataList.select('D');
		});
		// THEN
		then('selectCallback is called once with new item and old item', function() {
			expect(spySelect)
				.callCount(1)
				.calledWith('D', 3, 'A', 0);
		});
		then('changeCallback called once with new buffer contents', function() {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'A', 'B', 'C',
					'D', 'E', 'F',
					'G', 'H', 'I'
				]);
		});
		// DONE
		return then('done');
	});

	it('out of buffer', function() {
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
		given('selected element is close to frame border', function() {
			dataList.select('B');
			buffer._changeItems();
			dataList.select('E');

			spyChange.reset();
			spySelect.reset();
		});
		// WHEN
		when('select element out of buffer zone' , function() {
			dataList.select('K');
		});
		// THEN
		then('selectCallback is called once with new item and old item', function() {
			expect(spySelect)
				.callCount(1)
				.calledWith('K', 7, 'E', 1);
		});
		then('changeCallback called once with new buffer contents', function() {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'D', 'E', 'F',
					'G', 'H', 'I',
					'J', 'K', 'L',
					'M', 'N', 'O',
					'P', 'Q', 'R'
				]);
		});
		// DONE
		return then('done');
	});

	it('old element outside new frame', function() {
		var buffer = helper.createBuffer({
			padding: 1,
			lineSize: 3,
			loadOnLeft: 1
		});
		var dataList = helper.createDefaultDataList();

		// GIVEN
		given('created baselist-datalist with source', function() {
			return helper
				.setBufferSource(buffer, dataList)
				.then(function() {
					spyChange.reset();
					spySelect.reset();
				});
		});
		// WHEN
		when('select element far outside current frame', function() {
			dataList.select('Q');
		});
		// THEN
		then('selectCallback is called once with null-NaN for old item', function() {
			expect(spySelect)
				.callCount(1)
				.calledWith('Q', 4, null, NaN);
		});
		then('changeCallback called once with new frame contents', function() {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'M', 'N', 'O',
					'P', 'Q', 'R',
					'S', 'T', 'U'
				]);
		});
		// DONE
		return then('done');
	});
});
