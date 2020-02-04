import DynamicList from 'ui/data/dynamic-list';
import {loadRandom, waitForLoad} from './helper';


describe('DynamicList step-by-step', () => {
	const expect = chai.expect;

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

	it('Step by step', async () => {
		let promise;
		instance = new DynamicList((from, to) => loadRandom(from, to), {
			startFrom: 0,
			startLoadingOnItemsLeft: 2,
			frameSize: 5,
			initialBufferSize: 5,
			bufferSize: 20
		});

		expectState(instance, {
			current: null,
			isLoading: false,
			isStartReached: true,
			isEndReached: false,
			getBufferStart: NaN,
			getSize: 0,
			toArray: []
		});

		promise = instance.preload();

		expectState(instance, {
			current: null,
			isLoading: true,
			isStartReached: true,
			isEndReached: false,
			getBufferStart: NaN,
			getSize: 0,
			toArray: []
		});

		await promise;

		expectState(instance, {
			current: 'A',
			isLoading: false,
			isStartReached: true,
			isEndReached: false,
			getBufferStart: 0,
			getSize: 5,
			toArray: ['A', 'B', 'C', 'D', 'E']
		});

		promise = waitForLoad(instance);

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

		await promise;

		expectState(instance, {
			current: 'B',
			isLoading: false,
			isStartReached: true,
			isEndReached: false,
			getBufferStart: 0,
			getSize: 5,
			toArray: ['A', 'B', 'C', 'D', 'E']
		});

		promise = waitForLoad(instance);

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

		await promise;

		expectState(instance, {
			current: 'C',
			isLoading: false,
			isStartReached: true,
			isEndReached: false,
			getBufferStart: 0,
			getSize: 5,
			toArray: ['A', 'B', 'C', 'D', 'E']
		});

		promise = waitForLoad(instance);

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

		await promise;

		expectState(instance, {
			current: 'D',
			isLoading: false,
			isStartReached: true,
			isEndReached: false,
			getBufferStart: 0,
			getSize: 10,
			toArray: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
		});

		promise = waitForLoad(instance);

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

		await promise;

		expectState(instance, {
			current: 'J',
			isLoading: false,
			isStartReached: true,
			isEndReached: false,
			getBufferStart: 0,
			getSize: 15,
			toArray: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']
		});

		promise = waitForLoad(instance);

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

		await promise;

		expectState(instance, {
			current: 'K',
			isLoading: false,
			isStartReached: true,
			isEndReached: false,
			getBufferStart: 0,
			getSize: 15,
			toArray: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']
		});

		promise = waitForLoad(instance);

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

		await promise;

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

		promise = waitForLoad(instance);

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

		await promise;

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

		promise = waitForLoad(instance);

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

		await promise;

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

		promise = waitForLoad(instance);

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

		await promise;

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

		promise = waitForLoad(instance);

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

		await promise;

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

		promise = waitForLoad(instance);

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

		await promise;

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

		promise = waitForLoad(instance);

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

		await promise;

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

		promise = waitForLoad(instance);

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

		await promise;

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

		promise = waitForLoad(instance);

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

		await promise;

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

		promise = waitForLoad(instance);

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

		await promise;

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

		promise = waitForLoad(instance);

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

		await promise;

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
	})
		.timeout(20000);
});
