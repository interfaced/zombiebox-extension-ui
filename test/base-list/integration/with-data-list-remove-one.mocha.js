describe('zb.ui.BaseListDataList: remove one item', function() {
	var expect = chai.expect;
	var given = mochaTestSteps.given;
	var when = mochaTestSteps.when;
	var then = mochaTestSteps.then;

	var dataList, buffer, bufferPromise, spyChange, spySelect;
	var helper = zb.ui.test.baseListHelper;

	beforeEach(function() {
		spyChange = sinon.spy(helper, 'changeCallback');
		spySelect = sinon.spy(helper, 'selectCallback');

		// GIVEN
		given('created baselist-datalist with source', function() {
			buffer = helper.createBuffer({
				padding: 1,
				lineSize: 3,
				loadOnLeft: 1
			});
			dataList = helper.createDefaultDataList();
			bufferPromise = helper
				.setBufferSource(buffer, dataList)
				.then(function() {
					spyChange.reset();
					spySelect.reset();
				});

			return bufferPromise;
		});
	});

	afterEach(function() {
		spyChange.restore();
		spySelect.restore();
	});

	it('Check size on element removing', function() {
		// WHEN
		when('remove first element', function() {
			dataList.removeAt(0);
		});
		// THEN
		then('size should decreased by one', function() {
			expect(buffer.getGlobalSize()).eql(25);
			expect(buffer.getSourceSize()).eql(25);
			expect(buffer.getLocalSize()).eql(6);
		});
		// DONE
		return then('done');
	});

	it('Remove selected element', function() {
		// WHEN
		when('remove first element', function() {
			dataList.removeAt(0);
		});
		// THEN
		then('items should be updated before select', function() {
			expect(spyChange).calledBefore(spySelect);
		});
		then('changeCallback should be called', function() {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'B', 'C', 'D',
					'E', 'F', 'G'
				]);
		});
		then('selectCallback should be called with next element on same index', function() {
			expect(spySelect)
				.callCount(1)
				.calledWith('B', 0, null, NaN);
		});
		// DONE
		return then('done');
	});

	it('Remove not selected element', function() {
		// WHEN
		when('remove first element', function() {
			dataList.removeAt(1);
		});
		// THEN
		then('changeCallback should be called', function() {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'A', 'C', 'D',
					'E', 'F', 'G'
				]);
		});
		then('selectCallback should not be called', function() {
			expect(spySelect)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Remove element out of buffer', function() {
		// WHEN
		when('remove first element', function() {
			dataList.removeAt(6);
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

});
