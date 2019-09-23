import EventPublisher from 'zb/events/event-publisher';
import Throbber from 'ui/widgets/throbber/throbber';
import {number} from 'zb/stub';


describe('Throbber', () => {
	const expect = chai.expect;
	const given = mochaTestSteps.given;
	const when = mochaTestSteps.when;
	const then = mochaTestSteps.then;

	describe('Class', () => {
		it('class: Throbber', () => {
			expect(Throbber).is.a('function');
		});

		it('constructor: default', () => {
			expect(() => {
				new Throbber();
			}).not.to.throw();
		});
	});

	describe('Arguments', () => {
		it('No arguments', () => {
			const throbber = new Throbber();

			expect(throbber._container).instanceOf(HTMLElement);
			expect(throbber._step).equal(throbber.STEP);
			expect(throbber._width).equal(throbber.WIDTH);
			expect(throbber._stepInterval).equal(throbber.STEP_INTERVAL);
		});

		it('Only container argument', () => {
			const container = document.createElement('div');
			const throbber = new Throbber(container);

			expect(throbber._container).equal(container);
			expect(throbber._step).equal(throbber.STEP);
			expect(throbber._width).equal(throbber.WIDTH);
			expect(throbber._stepInterval).equal(throbber.STEP_INTERVAL);
		});

		it('Only params argument', () => {
			const throbber = new Throbber({
				step: 100,
				width: 200,
				stepInterval: 300
			});

			expect(throbber._container).instanceOf(HTMLElement);
			expect(throbber._step).equal(100);
			expect(throbber._width).equal(200);
			expect(throbber._stepInterval).equal(300);
		});

		it('Only params argument with undefined container', () => {
			const throbber = new Throbber(undefined, {
				step: 100,
				width: 200,
				stepInterval: 300
			});

			expect(throbber._container).instanceOf(HTMLElement);
			expect(throbber._step).equal(100);
			expect(throbber._width).equal(200);
			expect(throbber._stepInterval).equal(300);
		});

		it('Both arguments', () => {
			const container = document.createElement('div');
			const throbber = new Throbber(container, {
				step: 100,
				width: 200,
				stepInterval: 300
			});

			expect(throbber._container).equal(container);
			expect(throbber._step).equal(100);
			expect(throbber._width).equal(200);
			expect(throbber._stepInterval).equal(300);
		});
	});

	describe('Public methods', () => {
		it('wait', () => {
			const throbber = new Throbber();
			expect(throbber.wait).is.a('function');
		});
	});

	describe('Events', () => {
		let throbber;

		const eventStartSpy = sinon.spy();
		const eventStopSpy = sinon.spy();

		beforeEach(() => {
			throbber = new Throbber();
		});

		afterEach(() => {
			throbber = null;

			eventStartSpy.resetHistory();
			eventStopSpy.resetHistory();
		});

		it('Inherits from EventPublisher', () => {
			expect(throbber).instanceOf(EventPublisher);
		});

		it('Have events: start, stop', () => {
			expect(throbber.EVENT_START).is.a('string');
			expect(throbber.EVENT_STOP).is.a('string');
		});

		const createDelayedPromise = () => new Promise((resolve) => {
			setTimeout(resolve.bind(null), number(0, 2000));
		});

		it('Events fired for single promise', () => {
			given('added handlers for events', () => {
				throbber.on(throbber.EVENT_START, eventStartSpy);
				throbber.on(throbber.EVENT_STOP, eventStopSpy);
			});

			when('set promise', () => {
				const promise = createDelayedPromise();
				throbber.wait(promise);
				return promise;
			});

			then('EVENT_START called once', () => {
				expect(eventStartSpy).callCount(1);
			});

			then('EVENT_STOP called once', () => {
				expect(eventStopSpy).callCount(1);
			});

			return then('done');
		});

		it('Events fired for miltiple promises', () => {
			given('added handlers for events', () => {
				throbber.on(throbber.EVENT_START, eventStartSpy);
				throbber.on(throbber.EVENT_STOP, eventStopSpy);
			});

			when('set promise', () => {
				const promise1 = createDelayedPromise();
				const promise2 = createDelayedPromise();
				throbber.wait(promise1);
				throbber.wait(promise2);
				return Promise.all([promise1, promise2]);
			});

			then('EVENT_START called once', () => {
				expect(eventStartSpy).callCount(1);
			});

			then('EVENT_STOP called once', () => {
				expect(eventStopSpy).callCount(1);
			});

			return then('done');
		});
	})
		.timeout(5000);
});
