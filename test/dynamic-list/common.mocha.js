describe('zb.ui.data.DynamicList common', () => {
	const expect = chai.expect;

	const DynamicList = zb.ui.data.DynamicList;

	describe('Class', () => {
		it('Class exists', () => {
			expect(DynamicList)
				.is.a('function');
		});
		it('Default constructor', () => {
			expect(() => new DynamicList(() => Promise.resolve([]))).not.to.throw();
		});
	});

	describe('Instance', () => {
		let instance;

		beforeEach(() => {
			instance = new DynamicList(() => Promise.resolve([]));
		});

		it('Public methods should exist', () => {
			const publicMethodsNames = [
				'isLoading',
				'isStartReached',
				'isEndReached',
				'getBufferStart',
				'preload',
				'loadItems',
				'loadNextFrame',
				'loadPrevFrame',
				'getSize',
				'clear'
			];

			publicMethodsNames.forEach((methodName) => {
				expect(instance[methodName]).is.a('function');
			});
		});

		it('Has event loading data', () => {
			expect(instance.EVENT_LOADING_DATA).is.a('string');
		});

		describe('Public methods', () => {
			it('isLoading should returns a boolean', () => {
				expect(instance.isLoading()).is.a('boolean');
			});

			it('isStartReached should returns a boolean', () => {
				expect(instance.isStartReached()).is.a('boolean');
			});

			it('isEndReached should returns a boolean', () => {
				expect(instance.isEndReached()).is.a('boolean');
			});

			it('getBufferStart should returns a number', () => {
				expect(instance.getBufferStart()).is.a('number');
			});

			it('getSize should returns a positive number', () => {
				const size = instance.getSize();
				expect(size).is.a('number');
				expect(size).is.above(-1);
			});

			it('clear should not throw exception', () => {
				expect(() => instance.clear()).not.to.throw();
			});

			it('preload should returns Promise with zb.ui.data.DynamicList', () => instance
				.preload()
				.then((result) => {
					expect(result).instanceOf(DynamicList);
				}));

			it('loadItems should returns Promise with zb.ui.data.DynamicList', () => instance
				.loadItems(0, 10)
				.then((result) => {
					expect(result).instanceOf(DynamicList);
				}));

			it('loadNextFrame should returns Promise with zb.ui.data.DynamicList', () => {
				expect(instance.loadNextFrame()).instanceOf(Promise);
			});

			it('loadPrevFrame should returns Promise with zb.ui.data.DynamicList', () => {
				expect(instance.loadPrevFrame()).instanceOf(Promise);
			});
		});
	});
});
