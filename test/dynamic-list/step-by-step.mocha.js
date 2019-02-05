describe('zb.ui.data.DynamicList step-by-step', function() {
	const expect = chai.expect;
	const given = mochaTestSteps.given;
	const when = mochaTestSteps.when;
	const then = mochaTestSteps.then;

	const DynamicList = zb.ui.data.DynamicList;
	const helper = zb.ui.test.dynamicListHelper;

	this.timeout(20000);

	const expectState = (instance, predicates) => {
		expect(instance.current()).equal(predicates.current);
		expect(instance.isLoading()).equal(predicates.isLoading);
		expect(instance.isStartReached()).equal(predicates.isStartReached);
		expect(instance.isEndReached()).equal(predicates.isEndReached);
		expect(instance.getBufferStart()).eql(predicates.getBufferStart);
		expect(instance.getSize()).eql(predicates.getSize);
		expect(instance.toArray()).eql(predicates.toArray);
	};

	let instance;

	it('Step by step', () => {
		when('creating dynamic list', () => {
			instance = new DynamicList((from, to) => helper.loadRandom(from, to), {
				startFrom: 0,
				startLoadingOnItemsLeft: 2,
				frameSize: 5,
				initialBufferSize: 5,
				bufferSize: 20
			});
		});
		then('state should be initial', () => {
			expectState(instance, {
				current: null,
				isLoading: false,
				isStartReached: true,
				isEndReached: false,
				getBufferStart: NaN,
				getSize: 0,
				toArray: []
			});
		});

		then('state should be loading', () => {
			const promise = instance.preload();

			expectState(instance, {
				current: null,
				isLoading: true,
				isStartReached: true,
				isEndReached: false,
				getBufferStart: NaN,
				getSize: 0,
				toArray: []
			});

			return promise;
		});
		then('frame should be first', () => {
			expectState(instance, {
				current: 'A',
				isLoading: false,
				isStartReached: true,
				isEndReached: false,
				getBufferStart: 0,
				getSize: 5,
				toArray: ['A', 'B', 'C', 'D', 'E']
			});
		});

		then('item should be second', () => {
			const promise = helper.waitForLoad(instance);

			instance.selectNextItem();

			expectState(instance, {
				current: 'B',
				isLoading: false,
				isStartReached: true,
				isEndReached: false,
				getBufferStart: 0,
				getSize: 5,
				toArray: ['A', 'B', 'C', 'D', 'E']
			});

			return promise;
		});
		then('item should be second after wait for load', () => {
			expectState(instance, {
				current: 'B',
				isLoading: false,
				isStartReached: true,
				isEndReached: false,
				getBufferStart: 0,
				getSize: 5,
				toArray: ['A', 'B', 'C', 'D', 'E']
			});
		});

		then('item should be third after call', () => {
			const promise = helper.waitForLoad(instance);

			instance.selectNextItem();

			expectState(instance, {
				current: 'C',
				isLoading: false,
				isStartReached: true,
				isEndReached: false,
				getBufferStart: 0,
				getSize: 5,
				toArray: ['A', 'B', 'C', 'D', 'E']
			});

			return promise;
		});
		then('item should be third after wait for load', () => {
			expectState(instance, {
				current: 'C',
				isLoading: false,
				isStartReached: true,
				isEndReached: false,
				getBufferStart: 0,
				getSize: 5,
				toArray: ['A', 'B', 'C', 'D', 'E']
			});
		});

		then('item should be fourth after call', () => {
			const promise = helper.waitForLoad(instance);

			instance.selectNextItem();

			expectState(instance, {
				current: 'D',
				isLoading: true,
				isStartReached: true,
				isEndReached: false,
				getBufferStart: 0,
				getSize: 5,
				toArray: ['A', 'B', 'C', 'D', 'E']
			});

			return promise;
		});
		then('item should be fourth after wait for load', () => {
			expectState(instance, {
				current: 'D',
				isLoading: false,
				isStartReached: true,
				isEndReached: false,
				getBufferStart: 0,
				getSize: 10,
				toArray: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
			});
		});

		then('item should be J after call', () => {
			const promise = helper.waitForLoad(instance);

			instance.select('J');

			expectState(instance, {
				current: 'J',
				isLoading: true,
				isStartReached: true,
				isEndReached: false,
				getBufferStart: 0,
				getSize: 10,
				toArray: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
			});

			return promise;
		});
		then('item should be J after wait for load', () => {
			expectState(instance, {
				current: 'J',
				isLoading: false,
				isStartReached: true,
				isEndReached: false,
				getBufferStart: 0,
				getSize: 15,
				toArray: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']
			});
		});

		then('item should be K after call', () => {
			const promise = helper.waitForLoad(instance);

			instance.select('K');

			expectState(instance, {
				current: 'K',
				isLoading: false,
				isStartReached: true,
				isEndReached: false,
				getBufferStart: 0,
				getSize: 15,
				toArray: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']
			});

			return promise;
		});
		then('item should be K after wait for load', () => {
			expectState(instance, {
				current: 'K',
				isLoading: false,
				isStartReached: true,
				isEndReached: false,
				getBufferStart: 0,
				getSize: 15,
				toArray: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']
			});
		});

		then('item should be N after call', () => {
			const promise = helper.waitForLoad(instance);

			instance.selectNextItem();
			instance.selectNextItem();
			instance.selectNextItem();

			expectState(instance, {
				current: 'N',
				isLoading: true,
				isStartReached: true,
				isEndReached: false,
				getBufferStart: 0,
				getSize: 15,
				toArray: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']
			});

			return promise;
		});
		then('item should be N after wait for load', () => {
			expectState(instance, {
				current: 'N',
				isLoading: false,
				isStartReached: true,
				isEndReached: false,
				getBufferStart: 0,
				getSize: 20,
				toArray: [
					'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'
				]
			});
		});

		then('item should be T after call', () => {
			const promise = helper.waitForLoad(instance);

			instance.select('T');

			expectState(instance, {
				current: 'T',
				isLoading: true,
				isStartReached: true,
				isEndReached: false,
				getBufferStart: 0,
				getSize: 20,
				toArray: [
					'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'
				]
			});

			return promise;
		});
		then('item should be T after wait for load', () => {
			expectState(instance, {
				current: 'T',
				isLoading: false,
				isStartReached: false,
				isEndReached: false,
				getBufferStart: 5,
				getSize: 25,
				toArray: [
					'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y'
				]
			});
		});

		then('item should be Y after call', () => {
			const promise = helper.waitForLoad(instance);

			instance.select('Y');

			expectState(instance, {
				current: 'Y',
				isLoading: true,
				isStartReached: false,
				isEndReached: false,
				getBufferStart: 5,
				getSize: 25,
				toArray: [
					'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y'
				]
			});

			return promise;
		});
		then('item should be Y after wait for load', () => {
			expectState(instance, {
				current: 'Y',
				isLoading: false,
				isStartReached: false,
				isEndReached: true,
				getBufferStart: 6,
				getSize: 26,
				toArray: [
					'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
				]
			});
		});

		then('item should be Z after call', () => {
			const promise = helper.waitForLoad(instance);

			instance.selectNextItem();
			instance.selectNextItem();
			instance.selectNextItem();

			expectState(instance, {
				current: 'Z',
				isLoading: false,
				isStartReached: false,
				isEndReached: true,
				getBufferStart: 6,
				getSize: 26,
				toArray: [
					'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
				]
			});

			return promise;
		});
		then('item should be Z after wait for load', () => {
			expectState(instance, {
				current: 'Z',
				isLoading: false,
				isStartReached: false,
				isEndReached: true,
				getBufferStart: 6,
				getSize: 26,
				toArray: [
					'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
				]
			});
		});

		then('item should be Z after call', () => {
			const promise = helper.waitForLoad(instance);

			instance.select('Q');

			expectState(instance, {
				current: 'Q',
				isLoading: false,
				isStartReached: false,
				isEndReached: true,
				getBufferStart: 6,
				getSize: 26,
				toArray: [
					'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
				]
			});

			return promise;
		});
		then('item should be Q after wait for load', () => {
			expectState(instance, {
				current: 'Q',
				isLoading: false,
				isStartReached: false,
				isEndReached: true,
				getBufferStart: 6,
				getSize: 26,
				toArray: [
					'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
				]
			});
		});

		then('item should be G after call', () => {
			const promise = helper.waitForLoad(instance);

			instance.select('G');

			expectState(instance, {
				current: 'G',
				isLoading: true,
				isStartReached: false,
				isEndReached: true,
				getBufferStart: 6,
				getSize: 26,
				toArray: [
					'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
				]
			});

			return promise;
		});
		then('item should be G after wait for load', () => {
			expectState(instance, {
				current: 'G',
				isLoading: false,
				isStartReached: false,
				isEndReached: false,
				getBufferStart: 1,
				getSize: 21,
				toArray: [
					'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U'
				]
			});
		});

		then('item should be D after call', () => {
			const promise = helper.waitForLoad(instance);

			instance.selectPrevItem();
			instance.selectPrevItem();
			instance.selectPrevItem();

			expectState(instance, {
				current: 'D',
				isLoading: false,
				isStartReached: false,
				isEndReached: false,
				getBufferStart: 1,
				getSize: 21,
				toArray: [
					'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U'
				]
			});

			return promise;
		});
		then('item should be D after wait for load', () => {
			expectState(instance, {
				current: 'D',
				isLoading: false,
				isStartReached: false,
				isEndReached: false,
				getBufferStart: 1,
				getSize: 21,
				toArray: [
					'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U'
				]
			});
		});

		then('item should be C after call', () => {
			const promise = helper.waitForLoad(instance);

			instance.selectPrevItem();

			expectState(instance, {
				current: 'C',
				isLoading: true,
				isStartReached: false,
				isEndReached: false,
				getBufferStart: 1,
				getSize: 21,
				toArray: [
					'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U'
				]
			});

			return promise;
		});
		then('item should be C after wait for load', () => {
			expectState(instance, {
				current: 'C',
				isLoading: false,
				isStartReached: true,
				isEndReached: false,
				getBufferStart: 0,
				getSize: 20,
				toArray: [
					'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'
				]
			});
		});

		then('item should be B after call', () => {
			const promise = helper.waitForLoad(instance);

			instance.selectPrevItem();

			expectState(instance, {
				current: 'B',
				isLoading: false,
				isStartReached: true,
				isEndReached: false,
				getBufferStart: 0,
				getSize: 20,
				toArray: [
					'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'
				]
			});

			return promise;
		});
		then('item should be B after wait for load', () => {
			expectState(instance, {
				current: 'B',
				isLoading: false,
				isStartReached: true,
				isEndReached: false,
				getBufferStart: 0,
				getSize: 20,
				toArray: [
					'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'
				]
			});
		});

		then('item should be A after call', () => {
			const promise = helper.waitForLoad(instance);

			instance.selectPrevItem();

			expectState(instance, {
				current: 'A',
				isLoading: false,
				isStartReached: true,
				isEndReached: false,
				getBufferStart: 0,
				getSize: 20,
				toArray: [
					'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'
				]
			});

			return promise;
		});
		then('item should be A after wait for load', () => {
			expectState(instance, {
				current: 'A',
				isLoading: false,
				isStartReached: true,
				isEndReached: false,
				getBufferStart: 0,
				getSize: 20,
				toArray: [
					'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'
				]
			});
		});

		then('item should be A after call', () => {
			const promise = helper.waitForLoad(instance);

			instance.selectPrevItem();
			instance.selectPrevItem();
			instance.selectPrevItem();

			expectState(instance, {
				current: 'A',
				isLoading: false,
				isStartReached: true,
				isEndReached: false,
				getBufferStart: 0,
				getSize: 20,
				toArray: [
					'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'
				]
			});

			return promise;
		});
		then('item should be A after wait for load', () => {
			expectState(instance, {
				current: 'A',
				isLoading: false,
				isStartReached: true,
				isEndReached: false,
				getBufferStart: 0,
				getSize: 20,
				toArray: [
					'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'
				]
			});
		});

		return then('done');
	});
});
