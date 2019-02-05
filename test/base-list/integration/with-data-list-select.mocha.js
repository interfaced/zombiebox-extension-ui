describe('zb.ui.BaseListDataList: select', function() {
	var expect = chai.expect;
	var given = mochaTestSteps.given;
	var when = mochaTestSteps.when;
	var then = mochaTestSteps.then;

	var w = new zb.ui.test.support.World();
	mochaTestSteps.world(w);

	beforeEach(function() {
		w.setup.datalist = w.setup.createDataList();
		w.po.spyChange = sinon.spy(w.setup, 'changeCallback');
		w.po.spySelected = sinon.spy(w.setup, 'selectCallback');
	});

	afterEach(function() {
		w.po.spyChange.restore();
		w.po.spySelected.restore();
	});

	it('inside passive zone', function() {
		// GIVEN
		given('created baselist-datalist with source', function() {
			return w.createListWithSource(w.setup.datalist, {
				padding: 1,
				lineSize: 3,
				loadOnLeft: 1
			});
		});
		// WHEN
		when('select element in passive zone', function() {
			w.setup.datalist.select('B');
		});
		// THEN
		then('selectCallback is called once with new item and old item', function() {
			expect(w.po.spySelected)
				.callCount(1)
				.calledWith('B', 1, 'A', 0);
		});
		then('changeCallback is not called', function() {
			expect(w.po.spyChange).callCount(0);
		});
		// DONE
		return then('done');
	});

	it('inside passive zone with shifted index', function() {
		// GIVEN
		given('created baselist-datalist with source', function() {
			return w.createListWithSource(w.setup.datalist, {
				padding: 1,
				lineSize: 3,
				loadOnLeft: 1
			});
		});
		given('frame is moved from source beginning' , function() {
			w.provideCurrentFrameCenterByValue('H');
		});
		// WHEN
		when('select element in passive zone', function() {
			w.setup.datalist.select('I');
		});
		// THEN
		then('selectCallback is called once with new item and old item', function() {
			expect(w.po.spySelected)
				.callCount(1)
				.calledWith('I', 5, 'H', 4);
		});
		then('changeCallback is not called', function() {
			expect(w.po.spyChange)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('on border of loadOnLeft zone', function() {
		// GIVEN
		given('created baselist-datalist with source', function() {
			return w.createListWithSource(w.setup.datalist, {
				padding: 2,
				lineSize: 3,
				loadOnLeft: 1
			});
		});
		// WHEN
		when('select element on border of loadOnLeft zone' , function() {
			w.setup.datalist.select('D');
		});
		// THEN
		then('selectCallback is called once with new item and old item', function() {
			expect(w.po.spySelected)
				.callCount(1)
				.calledWith('D', 3, 'A', 0);
		});
		then('changeCallback is not called', function() {
			expect(w.po.spyChange)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('on border of buffer (inside loadOnLeft zone)', function() {
		// GIVEN
		given('created baselist-datalist with source', function() {
			return w.createListWithSource(w.setup.datalist, {
				padding: 1,
				lineSize: 3,
				loadOnLeft: 1
			});
		});
		// WHEN
		when('select element in on border of buffer zone' , function() {
			w.setup.datalist.select('D');
		});
		// THEN
		then('selectCallback is called once with new item and old item', function() {
			expect(w.po.spySelected)
				.callCount(1)
				.calledWith('D', 3, 'A', 0);
		});
		then('changeCallback called once with new buffer contents', function() {
			expect(w.po.spyChange)
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
		// GIVEN
		given('created baselist-datalist with source', function() {
			return w.createListWithSource(w.setup.datalist, {
				padding: 2,
				lineSize: 3,
				loadOnLeft: 1
			});
		});
		given('selected element is close to frame border', function() {
			w.provideCurrentFrameCenterByValue('B', 'E');
		});
		// WHEN
		when('select element out of buffer zone' , function() {
			w.setup.datalist.select('K');
		});
		// THEN
		then('selectCallback is called once with new item and old item', function() {
			expect(w.po.spySelected)
				.callCount(1)
				.calledWith('K', 7, 'E', 1);
		});
		then('changeCallback called once with new buffer contents', function() {
			expect(w.po.spyChange)
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
		// GIVEN
		given('created baselist-datalist with source', function() {
			return w.createListWithSource(w.setup.datalist, {
				padding: 1,
				lineSize: 3,
				loadOnLeft: 1
			});
		});
		// WHEN
		when('select element far outside current frame', function() {
			w.setup.datalist.select('Q');
		});
		// THEN
		then('selectCallback is called once with null-NaN for old item', function() {
			expect(w.po.spySelected)
				.callCount(1)
				.calledWith('Q', 4, null, NaN);
		});
		then('changeCallback called once with new frame contents', function() {
			expect(w.po.spyChange)
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
