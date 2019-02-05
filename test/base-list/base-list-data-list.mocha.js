describe('zb.ui.BaseListDataList', function() {
	var expect = chai.expect;

	describe('Class', function() {
		it('class exists', function() {
			expect(zb.ui.BaseListDataList)
				.is.a('function');
		});
		it('default constructor (changeCallback, selectCallback)', function() {
			expect(function() {
				return new zb.ui.BaseListDataList(
					function(items) {},
					function(newItem, newIndex, oldItem, oldIndex) {}
				);
			}).not.to.throw();
		});
	});

	describe('Logic', function() {
		var w = { // world
			setup: {}, // хранит наборы данных
			sut: {}, // system under test
			po: {}, // page object
			co: {} // эталонные значения
		};

		w.setup.changeCallback = function(items) {};
		w.setup.selectCallback = function(newItem, newIndex, oldItem, oldIndex) {};

		w.setup.createDataList = function() {
			return new zb.ui.DataList([
				'A', 'B', 'C', 'D', 'E',
				'F', 'G', 'H', 'I', 'J',
				'K', 'L', 'M', 'N', 'O',
				'P', 'Q', 'R', 'S', 'T',
				'U', 'V', 'W', 'X', 'Y',
				'Z'
			]);
		};

		w.createList = function() {
			w.sut.list = new zb.ui.BaseListDataList(w.setup.changeCallback, w.setup.selectCallback);
		};
		w.provideSource = function(datalist) {
			w.sut.list.setSource(datalist);
		};

		beforeEach(function() {
			w.setup.datalist = w.setup.createDataList();
		});

		describe('dependency: Source', function() {
			it('method exists .getSource', function() {
				w.createList();
				expect(w.sut.list.getSource)
					.is.a('function');
			});
			it('method exists .setSource', function() {
				w.createList();
				expect(w.sut.list.setSource)
					.is.a('function');
			});

			it('initially has no source (null)', function() {
				// given: baselist-datalist created
				w.createList();
				// then: it has no source
				expect(w.sut.list.getSource()).is.null;
			});
			it('set source and get it back', function() {
				// given: baselist-datalist created
				w.createList();
				// when: set new source
				w.sut.list.setSource(w.setup.datalist);
				// then: get source returns it
				expect(w.sut.list.getSource())
					.equal(w.setup.datalist);
			});
		});
	});
});
