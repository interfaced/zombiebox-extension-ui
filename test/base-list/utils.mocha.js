describe('zb.ui.BaseListUtils', function() {
	var expect = chai.expect;
	var utils = zb.ui.BaseListUtils;

	describe('.getItemsByLines()', function() {
		it('method exists', function() {
			expect(utils.getItemsByLines)
				.is.a('function');
		});

		var checks = [
			{linesAmount: 0, lineSize: 3, itemsAmount: 0},
			{linesAmount: 12, lineSize: 0, itemsAmount: 0},
			{linesAmount: 1, lineSize: 3, itemsAmount: 3},
			{linesAmount: 5, lineSize: 3, itemsAmount: 15},
			{linesAmount: 5, lineSize: 1, itemsAmount: 5}
		];
		checks.forEach(function(ch) {
			var desc = ch.description || (ch.linesAmount + ' lines of ' + ch.lineSize + ' => ' + ch.itemsAmount);
			it(desc, function() {
				expect(utils.getItemsByLines(ch.linesAmount, ch.lineSize))
					.eq(ch.itemsAmount);
			});
		});
	});

	describe('.getLinesByItems()', function() {
		it('method exists', function() {
			expect(utils.getLinesByItems)
				.is.a('function');
		});

		var checks = [
			{itemsAmount: 0, lineSize: 10, linesAmount: 0},
			{itemsAmount: 1, lineSize: 10, linesAmount: 1},
			{itemsAmount: 11, lineSize: 3, linesAmount: 4},
			{itemsAmount: 12, lineSize: 3, linesAmount: 4},
			{itemsAmount: 13, lineSize: 3, linesAmount: 5}
		];
		checks.forEach(function(ch) {
			var desc = ch.description ||
				(ch.itemsAmount + ' items in lines of ' + ch.lineSize + ' => ' + ch.linesAmount + ' lines');
			it(desc, function() {
				expect(utils.getLinesByItems(ch.itemsAmount, ch.lineSize))
					.eq(ch.linesAmount);
			});
		});
	});

	describe('Coordinates (lineStart, lineEnd, Coords)', function() {
		it('method exists', function() {
			expect(utils.getLineByIndex)
				.is.a('function');
		});
		it('method exists .getLineStart()', function() {
			expect(utils.getLineStart)
				.is.a('function');
		});
		it('method exists .getLineEnd()', function() {
			expect(utils.getLineEnd)
				.is.a('function');
		});
		it('method exists .getCoordsByIndex()', function() {
			expect(utils.getCoordsByIndex)
				.is.a('function');
		});
		it('method exists .getIndexByCoords()', function() {
			expect(utils.getIndexByCoords)
				.is.a('function');
		});

		// .. | 00 01 02 03 04
		// -------------------
		// 00 | 00 01 02 03 04
		// 01 | 05 06 07 08 09
		// 02 | 10 11 12 13 14
		// 03 | 15 16 17 18 19

		var checks = [
			// First line
			{itemIndex: 0, lineSize: 5, lineIndex: 0, indexInLine: 0, lineStart: 0, lineEnd: 4, comment: 'zero index item'},
			{itemIndex: 1, lineSize: 5, lineIndex: 0, indexInLine: 1, lineStart: 0, lineEnd: 4, comment: 'item index 1'},
			{itemIndex: 3, lineSize: 5, lineIndex: 0, indexInLine: 3, lineStart: 0, lineEnd: 4, comment: 'item in the middle of line'},
			// Line border
			{itemIndex: 4, lineSize: 5, lineIndex: 0, indexInLine: 4, lineStart: 0, lineEnd: 4, comment: 'last item in line'},
			{itemIndex: 5, lineSize: 5, lineIndex: 1, indexInLine: 0, lineStart: 5, lineEnd: 9, comment: 'first item of next line'},
			{itemIndex: 6, lineSize: 5, lineIndex: 1, indexInLine: 1, lineStart: 5, lineEnd: 9, comment: 'second item of next line'},
			// Line far from beginning
			{itemIndex: 17, lineSize: 5, lineIndex: 3, indexInLine: 2, lineStart: 15, lineEnd: 19, comment: 'item in far line'}
		];

		describe('.getLineByIndex()', function() {
			checks.forEach(function(ch) {
				it(ch.comment, function() {
					expect(utils.getLineByIndex(ch.itemIndex, ch.lineSize))
						.equal(ch.lineIndex);
				});
			});
		});

		describe('.getLineStart()', function() {
			checks.forEach(function(ch) {
				it(ch.comment, function() {
					expect(utils.getLineStart(ch.itemIndex, ch.lineSize))
						.equal(ch.lineStart);
				});
			});
		});

		describe('.getLineEnd()', function() {
			checks.forEach(function(ch) {
				it(ch.comment, function() {
					expect(utils.getLineEnd(ch.itemIndex, ch.lineSize))
						.equal(ch.lineEnd);
				});
			});
		});

		describe('.getCoordsByIndex()', function() {
			checks.forEach(function(ch) {
				it(ch.comment, function() {
					expect(utils.getCoordsByIndex(ch.itemIndex, ch.lineSize))
						.deep.equal({
							line: ch.lineIndex,
							index: ch.indexInLine
						});
				});
			});
		});

		describe('.getIndexByCoords()', function() {
			checks.forEach(function(ch) {
				it(ch.comment, function() {
					expect(utils.getIndexByCoords(ch.lineIndex, ch.indexInLine, ch.lineSize))
						.equal(ch.itemIndex);
				});
			});
		});
	});

	describe('.isValidIndex() and .isValidSize()', function() {
		it('method exists .isValidIndex()', function() {
			expect(utils.isValidIndex)
				.is.a('function');
		});
		it('method exists .isValidSize()', function() {
			expect(utils.isValidSize)
				.is.a('function');
		});

		var predicates = [
			{
				value: -2,
				resultForIndex: false,
				resultForSize: false
			},{
				value: -1,
				resultForIndex: false,
				resultForSize: false
			},{
				value: 0,
				resultForIndex: true,
				resultForSize: true
			},{
				value: 1,
				resultForIndex: true,
				resultForSize: true
			},{
				value: 2,
				resultForIndex: true,
				resultForSize: true
			},{
				value: NaN,
				resultForIndex: true,
				resultForSize: false
			}
		];

		predicates.forEach(function(item) {
			it(item.value + ' is' + (item.resultForIndex ? '' : ' not') + ' valid index', function() {
				expect(utils.isValidIndex(item.value)).equal(item.resultForIndex);
			});
		});
		predicates.forEach(function(item) {
			it(item.value + ' is' + (item.resultForSize ? '' : ' not') + ' valid size', function() {
				expect(utils.isValidSize(item.value)).equal(item.resultForSize);
			});
		});
	});

	describe('.getNextLine() and .getPrevLine()', function() {
		it('method exists .getNextLine()', function() {
			expect(utils.getNextLine)
				.is.a('function');
		});
		it('method exists .getPrevLine()', function() {
			expect(utils.getPrevLine)
				.is.a('function');
		});

		// .. | 00 01 02 03 04
		// -------------------
		// 00 | 00 01 02 03 04
		// 01 | 05 06 07 08 09
		// 02 | 10 11 12 13 14
		// 03 | 15 16 17 18 19

		// TODO: обработать случаи, когда исходный или получившийся индекс могут быть: NaN, меньше нуля

		var nextLine = [
			{from: -5, lineSize: 5, to:  0},
			{from: -1, lineSize: 5, to:  4},
			{from:  0, lineSize: 5, to:  5},
			{from:  5, lineSize: 5, to: 10},
			{from:  6, lineSize: 5, to: 11},
			{from: 14, lineSize: 5, to: 19}
		];

		var prevLine = nextLine.map(function(next) {
			return {
				from: next.to,
				to: next.from,
				lineSize: next.lineSize
			}
		});

		describe('.getNextLine()', function() {
			nextLine.forEach(function(ch) {
				var desc = ch.from + ' (linesize ' + ch.lineSize + ') next line => ' + ch.to;
				it(desc, function() {
					expect(utils.getNextLine(ch.from, ch.lineSize))
						.equal(ch.to);
				});
			});
		});
		describe('.getPrevLine()', function() {
			prevLine.forEach(function(ch) {
				var desc = ch.from + ' (linesize ' + ch.lineSize + ') prev line => ' + ch.to;
				it(desc, function() {
					expect(utils.getPrevLine(ch.from, ch.lineSize))
						.equal(ch.to);
				});
			});
		});
	});

	describe('.getNextIndex()', function() {
		it('method exists .getNextIndex()', function() {
			expect(utils.getNextIndex)
				.is.a('function');
		});

		var predicates = [
			{from:  -2, to: NaN},
			{from:  -1, to:   0},
			{from:   0, to:   1},
			{from:   1, to:   2},
			{from:   2, to:   3},
			{from: NaN, to: NaN}
		];

		predicates.forEach(function(item) {
			it(item.to + ' is next for ' + item.from, function() {
				expect(utils.getNextIndex(item.from)).eql(item.to);
			});
		});
	});

	describe('.getPrevIndex()', function() {
		it('method exists .getPrevIndex()', function() {
			expect(utils.getPrevIndex)
				.is.a('function');
		});

		var predicates = [
			{from:  -2, to: NaN},
			{from:  -1, to: NaN},
			{from:   0, to: NaN},
			{from:   1, to:   0},
			{from:   2, to:   1},
			{from: NaN, to: NaN}
		];

		predicates.forEach(function(item) {
			it(item.to + ' is prev for ' + item.from, function() {
				expect(utils.getPrevIndex(item.from)).eql(item.to);
			});
		});
	});

	describe('.endToSize()', function() {
		it('method exists .endToSize()', function() {
			expect(utils.endToSize)
				.is.a('function');
		});

		var predicates = [
			{end:  -2, size: 0},
			{end:  -1, size: 0},
			{end:   0, size: 1},
			{end:   1, size: 2},
			{end:   2, size: 3},
			{end: NaN, size: 0}
		];

		predicates.forEach(function(item) {
			it(item.size + ' is size for ' + item.end, function() {
				expect(utils.endToSize(item.end)).eql(item.size);
			});
		});
	});

	describe('.sizeToEnd()', function() {
		it('method exists .sizeToEnd()', function() {
			expect(utils.sizeToEnd)
				.is.a('function');
		});

		var predicates = [
			{size: -2, end: NaN},
			{size: -1, end: NaN},
			{size:  0, end: NaN},
			{size:  1, end: 0},
			{size:  2, end: 1}
		];

		predicates.forEach(function(item) {
			it(item.end + ' is end for ' + item.size, function() {
				expect(utils.sizeToEnd(item.size)).eql(item.end);
			});
		});
	});
});
