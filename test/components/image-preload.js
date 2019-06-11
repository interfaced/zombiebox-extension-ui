import {array, one} from 'ui/image-preload';


const expect = chai.expect;

describe('imagePreload', () => {
	it('Should expose public methods', () => {
		expect(array).to.be.a('function');
		expect(one).to.be.a('function');
	});

	describe('Method one', () => {
		const testImage = (src, expectedResult, returnedResult) => {
			// Testing result.
			expect(returnedResult).to.equal(expectedResult);

			// Testing cache.
			const image = new Image();
			image.src = src;
			expect(image.complete).to.equal(expectedResult);
		};

		const predicates = {
			'http://farm4.static.flickr.com/3219/2431886567_c92821aede_o.jpg': true,
			'http://google.com/': false,
			'http://example1.test/': false
		};
		const images = Object.keys(predicates);

		images.forEach((src) => {
			const preloadPromise = one(src);

			it(`Should return Promise for ${src}`, () => {
				expect(preloadPromise).to.be.an.instanceOf(Promise);
			});

			it(`Should preload images like ${src}`, () => preloadPromise
				.then((image) => {
					testImage(image.src, predicates[image.src], true);
				}, (image) => {
					testImage(image.src, predicates[image.src], false);
				}));
		});
	});

	describe('Method array', () => {
		const predicates = [{
			success: [],
			fail: [],
			result: true
		},
		{
			success: [
				'http://farm1.static.flickr.com/37/85684217_526797a103_o.jpg',
				'http://farm5.static.flickr.com/4080/4906820567_63fb82fa85_b.jpg'
			],
			fail: [],
			result: true
		},
		{
			success: [
				'http://farm3.static.flickr.com/2652/4112396574_8e9f7d81a1_b.jpg'
			],
			fail: [
				'http://google.com/'
			],
			result: false
		},
		{
			success: [],
			fail: [
				'http://google.com/',
				'http://example3.test/'
			],
			result: false
		}];

		predicates.forEach((item, index) => {
			const images = item.success.concat(item.fail);
			const preloadPromise = array(images);

			it(`Should return Promise for array ${index} with result ${item.result}`, () => {
				expect(preloadPromise).to.be.an.instanceOf(Promise);
			});

			it(`Should preload array ${index}`, () => preloadPromise
				.then((output) => {
					expect(item.result).to.equal(true);
					expect(output.map((image) => image.src).join(''))
						.to.equal(item.success.join(''));
				}, (output) => {
					expect(item.result).to.equal(false);
					expect(output.map((image) => image.src).join(''))
						.to.equal(item.fail.join(''));
				}));
		});
	});
})
	.timeout(5000);
