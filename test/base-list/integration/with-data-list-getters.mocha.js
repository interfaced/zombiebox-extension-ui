describe('zb.ui.widgets.BaseListDataList: getters', () => {
	const expect = chai.expect;
	const given = mochaTestSteps.given;
	const when = mochaTestSteps.when;
	const then = mochaTestSteps.then;

	let buffer;
	const helper = zb.ui.test.baseListHelper;

	beforeEach(() => {
		// GIVEN
		given('created empty baselist-datalist', () => {
			buffer = helper.createBuffer();
		});
	});

	it('When null', () => {
		// WHEN
		when('set source', () => helper.setBufferSource(buffer, null));
		// THEN
		then('local variables has values', () => {
			expect(buffer.getSourceStart()).eql(NaN);
			expect(buffer.getSourceEnd()).eql(NaN);
			expect(buffer.getSourceIndex()).eql(NaN);
			expect(buffer.getSourceSize()).eql(0);

			expect(buffer.getLocalStart()).eql(NaN);
			expect(buffer.getLocalEnd()).eql(NaN);
			expect(buffer.getLocalIndex()).eql(NaN);
			expect(buffer.getLocalSize()).eql(0);

			expect(buffer.getGlobalStart()).eql(NaN);
			expect(buffer.getGlobalEnd()).eql(NaN);
			expect(buffer.getGlobalIndex()).eql(NaN);
			expect(buffer.getGlobalSize()).eql(0);
		});
		// DONE
		return then('done');
	});

	it('When empty array', () => {
		// WHEN
		when('set source', () => {
			const dataList = helper.createEmptyDataList();
			return helper.setBufferSource(buffer, dataList);
		});
		// THEN
		then('local variables has values', () => {
			expect(buffer.getSourceStart()).eql(NaN);
			expect(buffer.getSourceEnd()).eql(NaN);
			expect(buffer.getSourceIndex()).eql(NaN);
			expect(buffer.getSourceSize()).eql(0);

			expect(buffer.getLocalStart()).eql(NaN);
			expect(buffer.getLocalEnd()).eql(NaN);
			expect(buffer.getLocalIndex()).eql(NaN);
			expect(buffer.getLocalSize()).eql(0);

			expect(buffer.getGlobalStart()).eql(NaN);
			expect(buffer.getGlobalEnd()).eql(NaN);
			expect(buffer.getGlobalIndex()).eql(NaN);
			expect(buffer.getGlobalSize()).eql(0);
		});
		// DONE
		return then('done');
	});

	it('When size is 0', () => {
		// WHEN
		when('set source', () => {
			const array = helper.createDefaultArray().slice(0, 1);
			const dataList = new zb.ui.data.List(array);
			return helper.setBufferSource(buffer, dataList);
		});
		// THEN
		then('local variables has values', () => {
			expect(buffer.getSourceStart()).eql(0);
			expect(buffer.getSourceEnd()).eql(0);
			expect(buffer.getSourceIndex()).eql(0);
			expect(buffer.getSourceSize()).eql(1);

			expect(buffer.getLocalStart()).eql(0);
			expect(buffer.getLocalEnd()).eql(0);
			expect(buffer.getLocalIndex()).eql(0);
			expect(buffer.getLocalSize()).eql(1);

			expect(buffer.getGlobalStart()).eql(0);
			expect(buffer.getGlobalEnd()).eql(0);
			expect(buffer.getGlobalIndex()).eql(0);
			expect(buffer.getGlobalSize()).eql(1);
		});
		// DONE
		return then('done');
	});

	it('When size is 2', () => {
		// WHEN
		when('set source', () => {
			const array = helper.createDefaultArray().slice(0, 2);
			const dataList = new zb.ui.data.List(array);
			return helper.setBufferSource(buffer, dataList);
		});
		// THEN
		then('local variables has values', () => {
			expect(buffer.getSourceStart()).eql(0);
			expect(buffer.getSourceEnd()).eql(1);
			expect(buffer.getSourceIndex()).eql(0);
			expect(buffer.getSourceSize()).eql(2);

			expect(buffer.getLocalStart()).eql(0);
			expect(buffer.getLocalEnd()).eql(1);
			expect(buffer.getLocalIndex()).eql(0);
			expect(buffer.getLocalSize()).eql(2);

			expect(buffer.getGlobalStart()).eql(0);
			expect(buffer.getGlobalEnd()).eql(1);
			expect(buffer.getGlobalIndex()).eql(0);
			expect(buffer.getGlobalSize()).eql(2);
		});
		// DONE
		return then('done');
	});

	it('When size is 3', () => {
		// WHEN
		when('set source', () => {
			const array = helper.createDefaultArray().slice(0, 3);
			const dataList = new zb.ui.data.List(array);
			return helper.setBufferSource(buffer, dataList);
		});
		// THEN
		then('local variables has values', () => {
			expect(buffer.getSourceStart()).eql(0);
			expect(buffer.getSourceEnd()).eql(2);
			expect(buffer.getSourceIndex()).eql(0);
			expect(buffer.getSourceSize()).eql(3);

			expect(buffer.getLocalStart()).eql(0);
			expect(buffer.getLocalEnd()).eql(2);
			expect(buffer.getLocalIndex()).eql(0);
			expect(buffer.getLocalSize()).eql(3);

			expect(buffer.getGlobalStart()).eql(0);
			expect(buffer.getGlobalEnd()).eql(2);
			expect(buffer.getGlobalIndex()).eql(0);
			expect(buffer.getGlobalSize()).eql(3);
		});
		// DONE
		return then('done');
	});
});
