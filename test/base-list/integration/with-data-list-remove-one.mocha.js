describe('zb.ui.BaseListDataList: remove one item', function() {
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

	it('Check size on element removing', function() {
		// GIVEN
		given('created baselist-datalist with source', function() {
			return w.createListWithSetupSource();
		});
		// WHEN
		when('remove first element', function() {
			w.setup.datalist.removeAt(0);
		});
		// THEN
		then('size should decreased by one', function() {
			expect(w.sut.list.getGlobalSize()).eql(25);
			expect(w.sut.list.getSourceSize()).eql(25);
			expect(w.sut.list.getLocalSize()).eql(6);
		});
		// DONE
		return then('done');
	});

	it('Remove selected element', function() {
		// GIVEN
		given('created baselist-datalist with source', function() {
			return w.createListWithSetupSource();
		});
		// WHEN
		when('remove first element', function() {
			w.setup.datalist.removeAt(0);
		});
		// THEN
		then('items should be updated before select', function() {
			expect(w.po.spyChange).calledBefore(w.po.spySelected);
		});
		then('changedCallback should be called', function() {
			expect(w.po.spyChange)
				.callCount(1)
				.calledWith([
					'B', 'C', 'D',
					'E', 'F', 'G'
				]);
		});
		then('selectCallback should be called with next element on same index', function() {
			expect(w.po.spySelected)
				.callCount(1)
				.calledWith('B', 0, null, NaN);
		});
		// DONE
		return then('done');
	});

	it('Remove not selected element', function() {
		// GIVEN
		given('created baselist-datalist with source', function() {
			return w.createListWithSetupSource();
		});
		// WHEN
		when('remove first element', function() {
			w.setup.datalist.removeAt(1);
		});
		// THEN
		then('changedCallback should be called', function() {
			expect(w.po.spyChange)
				.callCount(1)
				.calledWith([
					'A', 'C', 'D',
					'E', 'F', 'G'
				]);
		});
		then('selectCallback should not be called', function() {
			expect(w.po.spySelected)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Remove element out of buffer', function() {
		// GIVEN
		given('created baselist-datalist with source', function() {
			return w.createListWithSetupSource();
		});
		// WHEN
		when('remove first element', function() {
			w.setup.datalist.removeAt(6);
		});
		// THEN
		then('changedCallback should not be called', function() {
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

});
