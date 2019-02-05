describe('zb.ui.widgets.BaseListDataList: remove one item', () => {
	const expect = chai.expect;
	const given = mochaTestSteps.given;
	const when = mochaTestSteps.when;
	const then = mochaTestSteps.then;

	let dataList;
	let buffer;
	let bufferPromise;
	let spyChange;
	let spySelect;
	const helper = zb.ui.test.baseListHelper;

	beforeEach(() => {
		spyChange = sinon.spy(helper, 'changeCallback');
		spySelect = sinon.spy(helper, 'selectCallback');

		// GIVEN
		given('created baselist-datalist with source', () => {
			buffer = helper.createBuffer({
				padding: 1,
				lineSize: 3,
				loadOnLeft: 1
			});
			dataList = helper.createDefaultDataList();
			bufferPromise = helper
				.setBufferSource(buffer, dataList)
				.then(() => {
					spyChange.resetHistory();
					spySelect.resetHistory();
				});

			return bufferPromise;
		});
	});

	afterEach(() => {
		spyChange.restore();
		spySelect.restore();
	});

	it('Check size on element removing', () => {
		// WHEN
		when('remove first element', () => {
			dataList.removeAt(0);
		});
		// THEN
		then('size should decreased by one', () => {
			expect(buffer.getGlobalSize()).eql(25);
			expect(buffer.getSourceSize()).eql(25);
			expect(buffer.getLocalSize()).eql(6);
		});
		// DONE
		return then('done');
	});

	it('Remove selected element', () => {
		// WHEN
		when('remove first element', () => {
			dataList.removeAt(0);
		});
		// THEN
		then('items should be updated before select', () => {
			expect(spyChange).calledBefore(spySelect);
		});
		then('changeCallback should be called', () => {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'B', 'C', 'D',
					'E', 'F', 'G'
				]);
		});
		then('selectCallback should be called with next element on same index', () => {
			expect(spySelect)
				.callCount(1)
				.calledWith('B', 0, null, NaN);
		});
		// DONE
		return then('done');
	});

	it('Remove not selected element', () => {
		// WHEN
		when('remove first element', () => {
			dataList.removeAt(1);
		});
		// THEN
		then('changeCallback should be called', () => {
			expect(spyChange)
				.callCount(1)
				.calledWith([
					'A', 'C', 'D',
					'E', 'F', 'G'
				]);
		});
		then('selectCallback should not be called', () => {
			expect(spySelect)
				.callCount(0);
		});
		// DONE
		return then('done');
	});

	it('Remove element out of buffer', () => {
		// WHEN
		when('remove first element', () => {
			dataList.removeAt(6);
		});
		// THEN
		then('changeCallback should not be called', () => {
			expect(spyChange)
				.callCount(0);
		});
		then('selectCallback should not be called', () => {
			expect(spySelect)
				.callCount(0);
		});
		// DONE
		return then('done');
	});
});
