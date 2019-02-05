describe('zb.ui.BaseListDataList: getters', function() {
	var expect = chai.expect;
	var given = mochaTestSteps.given;
	var when = mochaTestSteps.when;
	var then = mochaTestSteps.then;

	var w = new zb.ui.test.support.World();
	var helper = zb.ui.test.support.Helper;
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

	it('When null', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			return w.createListWithSource(null);
		});
		// THEN
		then('local variables has values', function() {
			expect(w.sut.list.getSourceStart()).eql(NaN);
			expect(w.sut.list.getSourceEnd()).eql(NaN);
			expect(w.sut.list.getSourceIndex()).eql(NaN);
			expect(w.sut.list.getSourceSize()).eql(0);

			expect(w.sut.list.getLocalStart()).eql(NaN);
			expect(w.sut.list.getLocalEnd()).eql(NaN);
			expect(w.sut.list.getLocalIndex()).eql(NaN);
			expect(w.sut.list.getLocalSize()).eql(0);

			expect(w.sut.list.getGlobalStart()).eql(NaN);
			expect(w.sut.list.getGlobalEnd()).eql(NaN);
			expect(w.sut.list.getGlobalIndex()).eql(NaN);
			expect(w.sut.list.getGlobalSize()).eql(0);
		});
		// DONE
		return then('done');
	});

	it('When empty array', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			var dataList = helper.createEmptyDataList();
			return w.createListWithSource(dataList);
		});
		// THEN
		then('local variables has values', function() {
			expect(w.sut.list.getSourceStart()).eql(NaN);
			expect(w.sut.list.getSourceEnd()).eql(NaN);
			expect(w.sut.list.getSourceIndex()).eql(NaN);
			expect(w.sut.list.getSourceSize()).eql(0);

			expect(w.sut.list.getLocalStart()).eql(NaN);
			expect(w.sut.list.getLocalEnd()).eql(NaN);
			expect(w.sut.list.getLocalIndex()).eql(NaN);
			expect(w.sut.list.getLocalSize()).eql(0);

			expect(w.sut.list.getGlobalStart()).eql(NaN);
			expect(w.sut.list.getGlobalEnd()).eql(NaN);
			expect(w.sut.list.getGlobalIndex()).eql(NaN);
			expect(w.sut.list.getGlobalSize()).eql(0);
		});
		// DONE
		return then('done');
	});

	it('When size is 0', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			var array = helper.createDefaultArray().slice(0, 1);
			var dataList = new zb.ui.DataList(array);
			return w.createListWithSource(dataList);
		});
		// THEN
		then('local variables has values', function() {
			expect(w.sut.list.getSourceStart()).eql(0);
			expect(w.sut.list.getSourceEnd()).eql(0);
			expect(w.sut.list.getSourceIndex()).eql(0);
			expect(w.sut.list.getSourceSize()).eql(1);

			expect(w.sut.list.getLocalStart()).eql(0);
			expect(w.sut.list.getLocalEnd()).eql(0);
			expect(w.sut.list.getLocalIndex()).eql(0);
			expect(w.sut.list.getLocalSize()).eql(1);

			expect(w.sut.list.getGlobalStart()).eql(0);
			expect(w.sut.list.getGlobalEnd()).eql(0);
			expect(w.sut.list.getGlobalIndex()).eql(0);
			expect(w.sut.list.getGlobalSize()).eql(1);
		});
		// DONE
		return then('done');
	});

	it('When size is 2', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			var array = helper.createDefaultArray().slice(0, 2);
			var dataList = new zb.ui.DataList(array);
			return w.createListWithSource(dataList);
		});
		// THEN
		then('local variables has values', function() {
			expect(w.sut.list.getSourceStart()).eql(0);
			expect(w.sut.list.getSourceEnd()).eql(1);
			expect(w.sut.list.getSourceIndex()).eql(0);
			expect(w.sut.list.getSourceSize()).eql(2);

			expect(w.sut.list.getLocalStart()).eql(0);
			expect(w.sut.list.getLocalEnd()).eql(1);
			expect(w.sut.list.getLocalIndex()).eql(0);
			expect(w.sut.list.getLocalSize()).eql(2);

			expect(w.sut.list.getGlobalStart()).eql(0);
			expect(w.sut.list.getGlobalEnd()).eql(1);
			expect(w.sut.list.getGlobalIndex()).eql(0);
			expect(w.sut.list.getGlobalSize()).eql(2);
		});
		// DONE
		return then('done');
	});

	it('When size is 3', function() {
		// GIVEN
		given('created baselist-datalist', function() {
			var array = helper.createDefaultArray().slice(0, 3);
			var dataList = new zb.ui.DataList(array);
			return w.createListWithSource(dataList);
		});
		// THEN
		then('local variables has values', function() {
			expect(w.sut.list.getSourceStart()).eql(0);
			expect(w.sut.list.getSourceEnd()).eql(2);
			expect(w.sut.list.getSourceIndex()).eql(0);
			expect(w.sut.list.getSourceSize()).eql(3);

			expect(w.sut.list.getLocalStart()).eql(0);
			expect(w.sut.list.getLocalEnd()).eql(2);
			expect(w.sut.list.getLocalIndex()).eql(0);
			expect(w.sut.list.getLocalSize()).eql(3);

			expect(w.sut.list.getGlobalStart()).eql(0);
			expect(w.sut.list.getGlobalEnd()).eql(2);
			expect(w.sut.list.getGlobalIndex()).eql(0);
			expect(w.sut.list.getGlobalSize()).eql(3);
		});
		// DONE
		return then('done');
	});
});
