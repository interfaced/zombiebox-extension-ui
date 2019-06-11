import BaseListDataList from 'ui/widgets/base-list/base-list-data-list';
import {createDefaultDataList, setBufferSource, noop} from './helper';


describe('BaseListDataList', () => {
	const expect = chai.expect;
	const when = mochaTestSteps.when;
	const then = mochaTestSteps.then;

	describe('Class', () => {
		it('class exists', () => {
			expect(BaseListDataList)
				.is.a('function');
		});
		it('default constructor (options, changeCallback, selectCallback)', () => {
			expect(() => new BaseListDataList(
				{},
				noop,
				noop
			)).not.to.throw();
		});
	});

	describe('Logic', () => {
		let buffer;

		beforeEach(() => {
			buffer = new BaseListDataList(
				{},
				noop,
				noop
			);
		});

		it('Public methods should exist', () => {
			const publicMethodsNames = [
				'setSource',
				'getSource',
				'hasSource',
				'isCyclical',
				'isDynamic',
				'isLoading',
				'isGlobalStart',
				'isGlobalEnd',
				'getSourceStart',
				'getSourceEnd',
				'isSourceIndex',
				'getSourceSize',
				'getSourceIndex',
				'getSourceItem',
				'getSourceItemIndex',
				'getSourceItems',
				'isLocalIndex',
				'getLocalStart',
				'getLocalEnd',
				'getLocalSize',
				'getLocalIndex',
				'getLocalItems',
				'isGlobalIndex',
				'getGlobalStart',
				'setGlobalEnd',
				'getGlobalEnd',
				'getGlobalSize',
				'getGlobalIndex',
				'getItemsByLines',
				'getLinesByItems',
				'getLineByIndex',
				'selectNextLine',
				'selectPrevLine',
				'selectNextIndex',
				'selectPrevIndex',
				'setIndexByItem',
				'setGlobalIndex'
			];

			publicMethodsNames.forEach((methodName) => {
				expect(buffer[methodName]).is.a('function');
			});
		});

		it('initially has no source (null)', () => {
			expect(buffer.getSource()).is.null();
		});

		it('set source and get it back', () => {
			const dataList = createDefaultDataList();


			when('set new source', () => setBufferSource(buffer, dataList));

			then('set new source', () => {
				expect(buffer.getSource()).equal(dataList);
			});
		});
	});
});
