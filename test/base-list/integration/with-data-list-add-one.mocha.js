describe('zb.ui.BaseListDataList: add one item', function() {
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

	it('before the frame', function() {
		// GIVEN
		given('created baselist-datalist with source', function() {
			return w.createListWithSource(w.setup.datalist, {
				padding: 1,
				lineSize: 3,
				loadOnLeft: 1
			});
		});
		given('frame moved from source beginning', function() {
			w.provideCurrentFrameCenterByValue('H');
		});
		// WHEN
		when('add element to source - before buffer frame', function() {
			w.setup.datalist.addAt('+1', 0);
		});
		// THEN
		then('changeCallback should be called once with shifted items around new index', function() {
			expect(w.po.spyChange)
				.callCount(1)
				.calledWith([
					'C', 'D', 'E',
					'F', 'G', 'H',
					'I', 'J', 'K'
				]);
		});
		then('selectCallback should be called with same element on new index', function() {
			expect(w.po.spySelected)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('before the frame, pushing selected item to new line', function() {
		// buffer frame position should change
		// GIVEN
		given('created baselist-datalist with source', function() {
			return w.createListWithSource(w.setup.datalist, {
				padding: 2,
				lineSize: 3,
				loadOnLeft: 1
			});
		});
		given('frame moved from source beginning', function() {
			w.provideCurrentFrameCenterByValue('H', 'I');
		});
		// WHEN
		when('add element to source - before buffer frame', function() {
			w.setup.datalist.addAt('+1', 0);
		});
		// THEN - buffer frame should be moved
		then('changeCallback should be called with CHANGED buffer frame position', function() {
			expect(w.po.spyChange)
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
			expect(w.po.spySelected)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('before the frame, pushing selected item to LOL', function() {
		// buffer frame position should change ONCE
		// GIVEN
		given('created baselist-datalist with source', function() {
			return w.createListWithSource(w.setup.datalist, {
				padding: 1,
				lineSize: 3,
				loadOnLeft: 1
			});
		});
		given('frame moved from source beginning', function() {
			w.provideCurrentFrameCenterByValue('H', 'I');
		});
		// WHEN
		when('add element to source - before buffer frame', function() {
			w.setup.datalist.addAt('+1', 0);
		});
		// THEN - buffer frame should be moved
		then('changeCallback should be called with CHANGED buffer frame position', function() {
			expect(w.po.spyChange)
				.callCount(1)
				.calledWith([
					'F', 'G', 'H',
					'I', 'J', 'K',
					'L', 'M', 'N'
				]);
		});
		then('selectCallback should be called with same element on new index', function() {
			expect(w.po.spySelected)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('in the frame before selected', function() {
		// GIVEN
		given('created baselist-datalist with source', function() {
			return w.createListWithSource(w.setup.datalist, {
				padding: 1,
				lineSize: 3,
				loadOnLeft: 1
			});
		});
		given('frame moved from source beginning', function() {
			w.provideCurrentFrameCenterByValue('H');
		});
		// WHEN
		when('add element to source - in the frame before selected', function() {
			w.setup.datalist.addAt('+', 4);
		});
		// THEN
		then('changeCallback should be called ONCE with shifted items around new index', function() {
			expect(w.po.spyChange)
				.callCount(1)
				.calledWith([
					'D', '+', 'E',
					'F', 'G', 'H',
					'I', 'J', 'K'
				]);
		});
		then('selectCallback should be called with same element on new index', function() {
			expect(w.po.spySelected)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('selected', function() {
		// GIVEN
		given('created baselist-datalist with source', function() {
			return w.createListWithSource(w.setup.datalist, {
				padding: 2,
				lineSize: 3,
				loadOnLeft: 1
			});
		});
		given('frame moved from source beginning', function() {
			w.provideCurrentFrameCenterByValue('K');
		});
		// WHEN
		when('add element to source - at the index of selected element', function() {
			w.setup.datalist.addAt('+', 10);
		});
		// THEN
		then('selected element must shift right', function() {
			expect(w.po.spyChange)
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
			expect(w.po.spySelected)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('in buffer frame after selected', function() {
		// GIVEN
		given('created baselist-datalist with source', function() {
			return w.createListWithSource(w.setup.datalist, {
				padding: 2,
				lineSize: 3,
				loadOnLeft: 1
			});
		});
		given('frame moved from source beginning', function() {
			w.provideCurrentFrameCenterByValue('K');
		});
		// WHEN
		when('add element to source - at the index in buffer frame after selected element', function() {
			w.setup.datalist.addAt('+', 11);
		});
		// THEN
		then('elements after selected must shift right', function() {
			expect(w.po.spyChange)
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
			expect(w.po.spySelected)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('after buffer frame', function() {
		// GIVEN
		given('created baselist-datalist with source', function() {
			return w.createListWithSource(w.setup.datalist, {
				padding: 2,
				lineSize: 3,
				loadOnLeft: 1
			});
		});
		given('frame moved from source beginning', function() {
			w.provideCurrentFrameCenterByValue('K');
		});
		// WHEN
		when('after buffer frame', function() {
			w.setup.datalist.addAt('+', 18);
		});
		// THEN
		then('changeCallback should not be called', function() {
			expect(w.po.spyChange)
				.callCount(0);
		});
		then('selectCallback should not be called', function() {
			expect(w.po.spySelected)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	// TODO: протестировать удаление элемента
	// TODO: протестировать работу с DynamicList

});
