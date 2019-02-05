describe('zb.ui.DynamicList options', function() {
	var expect = chai.expect;
	var DynamicList = zb.ui.DynamicList;

	describe('Should not throw error', function() {
		it('With default options', function() {
			expect(function() {
				new DynamicList(function() {});
			}).not.to.throw();
		});

		it('With custom options', function() {
			expect(function() {
				new DynamicList(function() {}, {
					startFrom: 0,
					startLoadingOnItemsLeft: 5,
					frameSize: 15,
					initialBufferSize: 35,
					bufferSize: 35
				});
			}).not.to.throw();
		});
	});

	describe('Should throw error', function() {
		it('With NaN option', function() {
			expect(function() {
				new DynamicList(function() {}, {
					startFrom: 0,
					startLoadingOnItemsLeft: NaN,
					frameSize: 15,
					initialBufferSize: 35,
					bufferSize: 35
				});
			}).to.throw();
		});

		it('With zero option', function() {
			expect(function() {
				new DynamicList(function() {}, {
					startFrom: 0,
					startLoadingOnItemsLeft: 5,
					frameSize: 0,
					initialBufferSize: 35,
					bufferSize: 35
				});
			}).to.throw();
		});

		it('With negative option', function() {
			expect(function() {
				new DynamicList(function() {}, {
					startFrom: 0,
					startLoadingOnItemsLeft: 5,
					frameSize: 15,
					initialBufferSize: -35,
					bufferSize: 35
				});
			}).to.throw();
		});

		it('With wrong frameSize', function() {
			expect(function() {
				new DynamicList(function() {}, {
					startFrom: 0,
					startLoadingOnItemsLeft: 18,
					frameSize: 12,
					initialBufferSize: 50,
					bufferSize: 50
				});
			}).to.throw();
		});

		it('With options combination which causes recursion', function() {
			expect(function() {
				new DynamicList(function() {}, {
					startFrom: 0,
					startLoadingOnItemsLeft: 10,
					frameSize: 10,
					initialBufferSize: 10,
					bufferSize: 20
				});
			}).to.throw();
		});
	});
});
