describe('zb.ui.DynamicList common', function() {
	var expect = chai.expect;

	var DynamicList = zb.ui.DynamicList;

	describe('Class', function() {
		it('Class exists', function() {
			expect(DynamicList)
				.is.a('function');
		});
		it('Default constructor', function() {
			expect(function() {
				return new DynamicList(function() {
					return Promise.resolve([]);
				});
			}).not.to.throw();
		});
	});

	describe('Instance', function() {
		var instance;

		beforeEach(function() {
			instance = new DynamicList(function() {
				return Promise.resolve([]);
			});
		});

		it('Public methods should exist', function() {
			var publicMethodsNames = [
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

			publicMethodsNames.forEach(function(methodName) {
				expect(instance[methodName]).is.a('function');
			});
		});

		it('Has event loading data', function() {
			expect(instance.EVENT_LOADING_DATA).is.a('string');
		});

		describe('Public methods', function() {
			it('isLoading should returns a boolean', function() {
				expect(instance.isLoading()).is.a('boolean');
			});

			it('isStartReached should returns a boolean', function() {
				expect(instance.isStartReached()).is.a('boolean');
			});

			it('isEndReached should returns a boolean', function() {
				expect(instance.isEndReached()).is.a('boolean');
			});

			it('getBufferStart should returns a number', function() {
				expect(instance.getBufferStart()).is.a('number');
			});

			it('getSize should returns a positive number', function() {
				var size = instance.getSize();
				expect(size).is.a('number');
				expect(size).is.above(-1);
			});

			it('clear should not throw exception', function() {
				expect(function() {
					return instance.clear();
				}).not.to.throw();
			});

			it('preload should returns Promise with zb.ui.DynamicList', function() {
				return instance
					.preload()
					.then(function(result) {
						expect(result).instanceOf(DynamicList);
					});
			});

			it('loadItems should returns Promise with zb.ui.DynamicList', function() {
				return instance
					.loadItems(0, 10)
					.then(function(result) {
						expect(result).instanceOf(DynamicList);
					});
			});

			it('loadNextFrame should returns Promise with zb.ui.DynamicList', function() {
				expect(instance.loadNextFrame()).instanceOf(Promise);
			});

			it('loadPrevFrame should returns Promise with zb.ui.DynamicList', function() {
				expect(instance.loadPrevFrame()).instanceOf(Promise);
			});
		});
	});
});
