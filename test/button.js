describe('zb.ui.widgets.Button', () => {
	const expect = chai.expect;

	const Button = zb.ui.widgets.Button;

	describe('Class', () => {
		it('class: zb.ui.widgets.Button', () => {
			expect(Button).is.a('function');
		});
		it('constructor: default', () => {
			expect(() => {
				new Button();
			}).not.to.throw();
		});
	});

	describe('Arguments', () => {
		it('No arguments', () => {
			const instance = new Button();

			expect(instance.getContainer()).instanceOf(HTMLElement);
			expect(instance.getData()).to.be.undefined;
		});
		it('Only container argument', () => {
			const container = document.createElement('div');
			const instance = new Button(container);

			expect(instance.getContainer()).equal(container);
			expect(instance.getData()).to.be.undefined;
		});
		it('Only data argument', () => {
			const instance = new Button('some data');

			expect(instance.getContainer()).instanceOf(HTMLElement);
			expect(instance.getData()).equal('some data');
		});
		it('Only data argument with undefined container', () => {
			const instance = new Button(undefined, 'some data');

			expect(instance.getContainer()).instanceOf(HTMLElement);
			expect(instance.getData()).equal('some data');
		});
		it('Both arguments', () => {
			const container = document.createElement('div');
			const instance = new Button(container, 'some data');

			expect(instance.getContainer()).equal(container);
			expect(instance.getData()).equal('some data');
		});
	});

	describe('Work with data', () => {
		const button = new Button();

		it('methods exists', () => {
			expect(button.setData).is.a('function');
			expect(button.getData).is.a('function');
		});

		it('method works', () => {
			const data = {
				a: 'a',
				b: 'b'
			};

			button.setData(data);
			expect(button.getData()).equal(data);
		});
	});

	describe('Event', () => {
		let button;
		const callbacks = {
			EVENT_CLICK() {}
		};
		const eventClick = sinon.spy(callbacks, 'EVENT_CLICK');

		beforeEach(() => {
			button = new Button();
		});

		afterEach(() => {
			button = null;

			eventClick.resetHistory();
		});

		it('event methods exists', () => {
			expect(button.onClick).is.a('function');
			expect(button.offClick).is.a('function');
		});

		it('event firing', () => {
			button.setData({
				a: 'a',
				b: 'b'
			});
			button.onClick(eventClick);

			button.processKey(zb.device.input.Keys.ENTER);

			expect(eventClick)
				.callCount(1)
				.calledWith('click', {
					a: 'a',
					b: 'b'
				});
		});

		it('event not firing', () => {
			button.onClick(eventClick);

			button.processKey(zb.device.input.Keys.BACK);

			expect(eventClick).callCount(0);
		});
	});
});
