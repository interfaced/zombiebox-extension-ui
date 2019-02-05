var expect = chai.expect;

describe('zb.ui.imagePreload', function() {
	var imagePreload = zb.ui.imagePreload;

	it('Should expose public methods', function() {
		expect(imagePreload.array).to.be.a('function');
		expect(imagePreload.one).to.be.a('function');
	});

	this.timeout(5000);

	describe('Method one', function() {
		var testImage = function(src, expectedResult, returnedResult) {
			// Testing result.
			expect(returnedResult).to.equal(expectedResult);

			// Testing cache.
			var image = new Image;
			image.src = src;
			expect(image.complete).to.equal(expectedResult);
		};

		var predicates = {
			'http://farm4.static.flickr.com/3219/2431886567_c92821aede_o.jpg': true,
			'http://google.com': false,
			'http://example1.test': false
		};
		var images = Object.keys(predicates);

		images.forEach(function(src) {
			var preloadPromise = imagePreload.one(src);

			it('Should return Promise for ' + src, function() {
				expect(preloadPromise).to.be.an.instanceOf(Promise);
			});

			it('Should preload images like ' + src, function() {
				return preloadPromise
					.then(function(src) {
						testImage(src, predicates[src], true);
					}, function(src) {
						testImage(src, predicates[src], false);
						return new Error(src);
					});
			});
		});
	});

	describe('Method array', function() {
		var predicates = [{
			success: [],
			fail: [],
			result: true
		},{
			success: [
				'http://farm1.static.flickr.com/37/85684217_526797a103_o.jpg',
				'http://farm5.static.flickr.com/4080/4906820567_63fb82fa85_b.jpg'
			],
			fail: [],
			result: true
		},{
			success: [
				'http://farm3.static.flickr.com/2652/4112396574_8e9f7d81a1_b.jpg'
			],
			fail: [
				'http://google.com'
			],
			result: false
		},{
			success: [],
			fail: [
				'http://google.com',
				'http://example3.test'
			],
			result: false
		}];

		predicates.forEach(function(item, index) {
			var images = item.success.concat(item.fail);
			var preloadPromise = imagePreload.array(images);

			it('Should return Promise for array ' + index + ' with result ' + item.result, function() {
				expect(preloadPromise).to.be.an.instanceOf(Promise);
			});

			it('Should preload array ' + index, function() {
				return preloadPromise
					.then(function(output) {
						expect(item.result).to.equal(true);
						expect(output.join('')).to.equal(item.success.join(''));
					}, function(output) {
						expect(item.result).to.equal(false);
						expect(output.join('')).to.equal(item.fail.join(''));
					});
			});
		});
	});
});
