describe('zb.ui.Button', function() {
	var expect = chai.expect;

	var Button = zb.ui.Button;

	describe('Class', function() {
		it('class: zb.ui.Button', function() {
			expect(Button).is.a('function');
		});
		it('constructor: default', function() {
			expect(function() {
				new Button;
			}).not.to.throw();
		});
	});

	describe('Arguments', function() {
		it('No arguments', function() {
			var instance = new Button;

			expect(instance.getContainer()).instanceOf(HTMLElement);
			expect(instance.getData()).to.be.undefined;
		});
		it('Only container argument', function() {
			var container = document.createElement('div');
			var instance = new Button(container);

			expect(instance.getContainer()).equal(container);
			expect(instance.getData()).to.be.undefined;
		});
		it('Only data argument', function() {
			var instance = new Button('some data');

			expect(instance.getContainer()).instanceOf(HTMLElement);
			expect(instance.getData()).equal('some data');
		});
		it('Only data argument with undefined container', function() {
			var instance = new Button(undefined, 'some data');

			expect(instance.getContainer()).instanceOf(HTMLElement);
			expect(instance.getData()).equal('some data');
		});
		it('Both arguments', function() {
			var container = document.createElement('div');
			var instance = new Button(container, 'some data');

			expect(instance.getContainer()).equal(container);
			expect(instance.getData()).equal('some data');
		});
	});

	describe('Work with data', function() {
		var button = new Button;

		it('methods exists', function() {
			expect(button.setData).is.a('function');
			expect(button.getData).is.a('function');
		});

		it('method works', function() {
			var data = {
				a: 'a',
				b: 'b'
			};

			button.setData(data);
			expect(button.getData()).equal(data);
		});
	});

	describe('Event', function() {
		var button;
		var callbacks = {
			EVENT_CLICK: function() {}
		};
		var eventClick = sinon.spy(callbacks, 'EVENT_CLICK');

		beforeEach(function() {
			button = new Button;
		});

		afterEach(function() {
			button = null;

			eventClick.reset();
		});

		it('event methods exists', function() {
			expect(button.onClick).is.a('function');
			expect(button.offClick).is.a('function');
		});

		it('event firing', function() {
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

		it('event not firing', function() {
			button.onClick(eventClick);

			button.processKey(zb.device.input.Keys.BACK);

			expect(eventClick).callCount(0);
		});
	});
});
