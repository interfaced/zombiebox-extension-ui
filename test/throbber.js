var expect = chai.expect;
var given = mochaTestSteps.given;
var when = mochaTestSteps.when;
var then = mochaTestSteps.then;

describe('zb.ui.Throbber', function() {
	var Throbber = zb.ui.Throbber;

	describe('Class', function() {
		it('class: zb.ui.Throbber', function() {
			expect(Throbber).is.a('function');
		});
		it('constructor: default', function() {
			expect(function() {
				new Throbber;
			}).not.to.throw();
		});
	});

	describe('Arguments', function() {
		it('No arguments', function() {
			var throbber = new Throbber;

			expect(throbber._container).instanceOf(HTMLElement);
			expect(throbber._step).equal(throbber.STEP);
			expect(throbber._width).equal(throbber.WIDTH);
			expect(throbber._timer._delay).equal(throbber.STEP_INTERVAL);
		});
		it('Only container argument', function() {
			var container = document.createElement('div');
			var throbber = new Throbber(container);

			expect(throbber._container).equal(container);
			expect(throbber._step).equal(throbber.STEP);
			expect(throbber._width).equal(throbber.WIDTH);
			expect(throbber._timer._delay).equal(throbber.STEP_INTERVAL);
		});
		it('Only params argument', function() {
			var throbber = new Throbber({
				step: 100,
				width: 200,
				stepInterval: 300
			});

			expect(throbber._container).instanceOf(HTMLElement);
			expect(throbber._step).equal(100);
			expect(throbber._width).equal(200);
			expect(throbber._timer._delay).equal(300);
		});
		it('Only params argument with undefined container', function() {
			var throbber = new Throbber(undefined, {
				step: 100,
				width: 200,
				stepInterval: 300
			});

			expect(throbber._container).instanceOf(HTMLElement);
			expect(throbber._step).equal(100);
			expect(throbber._width).equal(200);
			expect(throbber._timer._delay).equal(300);
		});
		it('Both arguments', function() {
			var container = document.createElement('div');
			var throbber = new Throbber(container, {
				step: 100,
				width: 200,
				stepInterval: 300
			});

			expect(throbber._container).instanceOf(HTMLElement);
			expect(throbber._step).equal(100);
			expect(throbber._width).equal(200);
			expect(throbber._timer._delay).equal(300);
		});
	});

	describe('Public methods', function() {
		it('wait', function() {
			var throbber = new Throbber;
			expect(throbber.wait).is.a('function');
		});
	});

	describe('Events', function() {
		var throbber;
		var callbacks = {
			EVENT_START: function() {},
			EVENT_STOP: function() {}
		};
		var eventStart = sinon.spy(callbacks, 'EVENT_START');
		var eventStop = sinon.spy(callbacks, 'EVENT_STOP');

		beforeEach(function() {
			throbber = new Throbber;
		});

		afterEach(function() {
			throbber = null;

			eventStart.reset();
			eventStop.reset();
		});

		it('Inherits from zb.events.EventPublisher', function() {
			expect(throbber).instanceOf(zb.events.EventPublisher);
		});

		it('Have events: start, stop', function() {
			expect(throbber.EVENT_START).is.a('string');
			expect(throbber.EVENT_STOP).is.a('string');
		});

		var createDelayedPromise = function() {
			return new Promise(function(resolve) {
				setTimeout(resolve.bind(null), zb.stub.number(0, 2000));
			});
		};

		this.timeout(5000);

		it('Events fired for single promise', function() {
			given('added handlers for events', function() {
				throbber.on(throbber.EVENT_START, eventStart);
				throbber.on(throbber.EVENT_STOP, eventStop);
			});

			when('set promise', function() {
				var promise = createDelayedPromise();
				throbber.wait(promise);
				return promise;
			});

			then('EVENT_START called once', function() {
				expect(eventStart).callCount(1);
			});

			then('EVENT_STOP called once', function() {
				expect(eventStop).callCount(1);
			});

			return then('done');
		});

		it('Events fired for miltiple promises', function() {
			given('added handlers for events', function() {
				throbber.on(throbber.EVENT_START, eventStart);
				throbber.on(throbber.EVENT_STOP, eventStop);
			});

			when('set promise', function() {
				var promise1 = createDelayedPromise();
				var promise2 = createDelayedPromise();
				throbber.wait(promise1);
				throbber.wait(promise2);
				return Promise.all([promise1, promise2]);
			});

			then('EVENT_START called once', function() {
				expect(eventStart).callCount(1);
			});

			then('EVENT_STOP called once', function() {
				expect(eventStop).callCount(1);
			});

			return then('done');
		});
	});
});
