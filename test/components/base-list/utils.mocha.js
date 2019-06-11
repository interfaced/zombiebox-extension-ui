/* eslint-disable key-spacing, max-len */

import {
	getItemsByLines,
	getLinesByItems,
	getLineByIndex,
	getLineStart,
	getLineEnd,
	getCoordsByIndex,
	getIndexByCoords,
	isValidIndex,
	isValidSize,
	getNextLine,
	getPrevLine,
	getNextIndex,
	getPrevIndex,
	endToSize,
	sizeToEnd
} from 'ui/widgets/base-list/base-list-utils';


describe('BaseListUtils', () => {
	const expect = chai.expect;

	describe('.getItemsByLines()', () => {
		it('method exists', () => {
			expect(getItemsByLines)
				.is.a('function');
		});

		const checks = [
			{linesAmount: 0, lineSize: 3, itemsAmount: 0},
			{linesAmount: 12, lineSize: 0, itemsAmount: 0},
			{linesAmount: 1, lineSize: 3, itemsAmount: 3},
			{linesAmount: 5, lineSize: 3, itemsAmount: 15},
			{linesAmount: 5, lineSize: 1, itemsAmount: 5}
		];
		checks.forEach((ch) => {
			const desc = ch.description || (`${ch.linesAmount} lines of ${ch.lineSize} => ${ch.itemsAmount}`);
			it(desc, () => {
				expect(getItemsByLines(ch.linesAmount, ch.lineSize))
					.eq(ch.itemsAmount);
			});
		});
	});

	describe('.getLinesByItems()', () => {
		it('method exists', () => {
			expect(getLinesByItems)
				.is.a('function');
		});

		const checks = [
			{itemsAmount: 0, lineSize: 10, linesAmount: 0},
			{itemsAmount: 1, lineSize: 10, linesAmount: 1},
			{itemsAmount: 11, lineSize: 3, linesAmount: 4},
			{itemsAmount: 12, lineSize: 3, linesAmount: 4},
			{itemsAmount: 13, lineSize: 3, linesAmount: 5}
		];
		checks.forEach((ch) => {
			const desc = ch.description ||
				(`${ch.itemsAmount} items in lines of ${ch.lineSize} => ${ch.linesAmount} lines`);
			it(desc, () => {
				expect(getLinesByItems(ch.itemsAmount, ch.lineSize))
					.eq(ch.linesAmount);
			});
		});
	});

	describe('Coordinates (lineStart, lineEnd, Coords)', () => {
		it('method exists', () => {
			expect(getLineByIndex)
				.is.a('function');
		});
		it('method exists .getLineStart()', () => {
			expect(getLineStart)
				.is.a('function');
		});
		it('method exists .getLineEnd()', () => {
			expect(getLineEnd)
				.is.a('function');
		});
		it('method exists .getCoordsByIndex()', () => {
			expect(getCoordsByIndex)
				.is.a('function');
		});
		it('method exists .getIndexByCoords()', () => {
			expect(getIndexByCoords)
				.is.a('function');
		});

		// .. | 00 01 02 03 04
		// -------------------
		// 00 | 00 01 02 03 04
		// 01 | 05 06 07 08 09
		// 02 | 10 11 12 13 14
		// 03 | 15 16 17 18 19

		const checks = [
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

		describe('.getLineByIndex()', () => {
			checks.forEach((ch) => {
				it(ch.comment, () => {
					expect(getLineByIndex(ch.itemIndex, ch.lineSize))
						.equal(ch.lineIndex);
				});
			});
		});

		describe('.getLineStart()', () => {
			checks.forEach((ch) => {
				it(ch.comment, () => {
					expect(getLineStart(ch.itemIndex, ch.lineSize))
						.equal(ch.lineStart);
				});
			});
		});

		describe('.getLineEnd()', () => {
			checks.forEach((ch) => {
				it(ch.comment, () => {
					expect(getLineEnd(ch.itemIndex, ch.lineSize))
						.equal(ch.lineEnd);
				});
			});
		});

		describe('.getCoordsByIndex()', () => {
			checks.forEach((ch) => {
				it(ch.comment, () => {
					expect(getCoordsByIndex(ch.itemIndex, ch.lineSize))
						.deep.equal({
							line: ch.lineIndex,
							index: ch.indexInLine
						});
				});
			});
		});

		describe('.getIndexByCoords()', () => {
			checks.forEach((ch) => {
				it(ch.comment, () => {
					expect(getIndexByCoords(ch.lineIndex, ch.indexInLine, ch.lineSize))
						.equal(ch.itemIndex);
				});
			});
		});
	});

	describe('.isValidIndex() and .isValidSize()', () => {
		it('method exists .isValidIndex()', () => {
			expect(isValidIndex)
				.is.a('function');
		});
		it('method exists .isValidSize()', () => {
			expect(isValidSize)
				.is.a('function');
		});

		const predicates = [
			{
				value: -2,
				resultForIndex: false,
				resultForSize: false
			},
			{
				value: -1,
				resultForIndex: false,
				resultForSize: false
			},
			{
				value: 0,
				resultForIndex: true,
				resultForSize: true
			},
			{
				value: 1,
				resultForIndex: true,
				resultForSize: true
			},
			{
				value: 2,
				resultForIndex: true,
				resultForSize: true
			},
			{
				value: NaN,
				resultForIndex: true,
				resultForSize: false
			}
		];

		predicates.forEach((item) => {
			it(`${item.value} is${item.resultForIndex ? '' : ' not'} valid index`, () => {
				expect(isValidIndex(item.value)).equal(item.resultForIndex);
			});
		});
		predicates.forEach((item) => {
			it(`${item.value} is${item.resultForSize ? '' : ' not'} valid size`, () => {
				expect(isValidSize(item.value)).equal(item.resultForSize);
			});
		});
	});

	describe('.getNextLine() and .getPrevLine()', () => {
		it('method exists .getNextLine()', () => {
			expect(getNextLine)
				.is.a('function');
		});
		it('method exists .getPrevLine()', () => {
			expect(getPrevLine)
				.is.a('function');
		});

		// .. | 00 01 02 03 04
		// -------------------
		// 00 | 00 01 02 03 04
		// 01 | 05 06 07 08 09
		// 02 | 10 11 12 13 14
		// 03 | 15 16 17 18 19

		const nextLine = [
			{from: -5, lineSize: 5, to:  0},
			{from: -1, lineSize: 5, to:  4},
			{from:  0, lineSize: 5, to:  5},
			{from:  5, lineSize: 5, to: 10},
			{from:  6, lineSize: 5, to: 11},
			{from: 14, lineSize: 5, to: 19}
		];

		const prevLine = nextLine.map((next) => ({
			from: next.to,
			to: next.from,
			lineSize: next.lineSize
		}));

		describe('.getNextLine()', () => {
			nextLine.forEach((ch) => {
				const desc = `${ch.from} (linesize ${ch.lineSize}) next line => ${ch.to}`;
				it(desc, () => {
					expect(getNextLine(ch.from, ch.lineSize))
						.equal(ch.to);
				});
			});
		});
		describe('.getPrevLine()', () => {
			prevLine.forEach((ch) => {
				const desc = `${ch.from} (linesize ${ch.lineSize}) prev line => ${ch.to}`;
				it(desc, () => {
					expect(getPrevLine(ch.from, ch.lineSize))
						.equal(ch.to);
				});
			});
		});
	});

	describe('.getNextIndex()', () => {
		it('method exists .getNextIndex()', () => {
			expect(getNextIndex)
				.is.a('function');
		});

		const predicates = [
			{from:  -2, to: NaN},
			{from:  -1, to:   0},
			{from:   0, to:   1},
			{from:   1, to:   2},
			{from:   2, to:   3},
			{from: NaN, to: NaN}
		];

		predicates.forEach((item) => {
			it(`${item.to} is next for ${item.from}`, () => {
				expect(getNextIndex(item.from)).eql(item.to);
			});
		});
	});

	describe('.getPrevIndex()', () => {
		it('method exists .getPrevIndex()', () => {
			expect(getPrevIndex)
				.is.a('function');
		});

		const predicates = [
			{from:  -2, to: NaN},
			{from:  -1, to: NaN},
			{from:   0, to: NaN},
			{from:   1, to:   0},
			{from:   2, to:   1},
			{from: NaN, to: NaN}
		];

		predicates.forEach((item) => {
			it(`${item.to} is prev for ${item.from}`, () => {
				expect(getPrevIndex(item.from)).eql(item.to);
			});
		});
	});

	describe('.endToSize()', () => {
		it('method exists .endToSize()', () => {
			expect(endToSize)
				.is.a('function');
		});

		const predicates = [
			{end:  -2, size: 0},
			{end:  -1, size: 0},
			{end:   0, size: 1},
			{end:   1, size: 2},
			{end:   2, size: 3},
			{end: NaN, size: 0}
		];

		predicates.forEach((item) => {
			it(`${item.size} is size for ${item.end}`, () => {
				expect(endToSize(item.end)).eql(item.size);
			});
		});
	});

	describe('.sizeToEnd()', () => {
		it('method exists .sizeToEnd()', () => {
			expect(sizeToEnd)
				.is.a('function');
		});

		const predicates = [
			{size: -2, end: NaN},
			{size: -1, end: NaN},
			{size:  0, end: NaN},
			{size:  1, end: 0},
			{size:  2, end: 1}
		];

		predicates.forEach((item) => {
			it(`${item.end} is end for ${item.size}`, () => {
				expect(sizeToEnd(item.size)).eql(item.end);
			});
		});
	});
});
