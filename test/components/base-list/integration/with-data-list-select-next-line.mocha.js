import {createBuffer, setBufferSource, changeSpy, selectSpy, createDataList} from '../helper';

describe('BaseListDataList: select next line', () => {
	const expect = chai.expect;
	const given = mochaTestSteps.given;
	const when = mochaTestSteps.when;
	const then = mochaTestSteps.then;

	let buffer;
	let dataList;

	beforeEach(() => {
		const array = Array(...new Array(94))
			.map((item, index) => (index < 10 ? '0' : '') + index);
		dataList = createDataList(array);

		buffer = createBuffer({
			padding: 3,
			loadOnLeft: 2,
			lineSize: 6
		});
	});

	// '00', '01', '02', '03', '04', '05',
	// '06', '07', '08', '09', '10', '11',
	// '12', '13', '14', '15', '16', '17',
	// '18', '19', '20', '21', '22', '23',
	// '24', '25', '26', '27', '28', '29',
	// '30', '31', '32', '33', '34', '35',
	// '36', '37', '38', '39', '40', '41',
	// '42', '43', '44', '45', '46', '47',
	// '48', '49', '50', '51', '52', '53',
	// '54', '55', '56', '57', '58', '59',
	// '60', '61', '62', '63', '64', '65',
	// '66', '67', '68', '69', '70', '71',
	// '72', '73', '74', '75', '76', '77',
	// '78', '79', '80', '81', '82', '83',
	// '84', '85', '86', '87', '88', '89',
	// '90', '91', '92', '93'

	it('Selecting 71-th item', () => {

		given('created baselist-datalist', () => setBufferSource(buffer, dataList)
			.then(() => {
				changeSpy.resetHistory();
				selectSpy.resetHistory();
			}));

		when('select 71-th item', () => {
			dataList.selectAt(71);
		});

		then('changeCallback is called once with new buffer contents', () => {
			expect(changeSpy)
				.callCount(1)
				.calledWith([
					'48', '49', '50', '51', '52', '53',
					'54', '55', '56', '57', '58', '59',
					'60', '61', '62', '63', '64', '65',
					'66', '67', '68', '69', '70', '71',
					'72', '73', '74', '75', '76', '77',
					'78', '79', '80', '81', '82', '83',
					'84', '85', '86', '87', '88', '89'
				]);
		});

		return then('done');
	});

	it('Selecting next lines after 71-th item', () => {

		given('created baselist-datalist', () => setBufferSource(buffer, dataList)
			.then(() => {
				dataList.selectAt(71);
			})
			.then(() => {
				changeSpy.resetHistory();
				selectSpy.resetHistory();
			}));

		when('select next line five times', () => {
			buffer.selectNextLine(); // 77-th item
			buffer.selectNextLine(); // 83-th item
			buffer.selectNextLine(); // 89-th item
			buffer.selectNextLine(); // 89-th item
			buffer.selectNextLine(); // 89-th item
		});

		then('changeCallback is called once with new buffer contents', () => {
			expect(changeSpy)
				.callCount(1)
				.calledWith([
					'60', '61', '62', '63', '64', '65',
					'66', '67', '68', '69', '70', '71',
					'72', '73', '74', '75', '76', '77',
					'78', '79', '80', '81', '82', '83',
					'84', '85', '86', '87', '88', '89',
					'90', '91', '92', '93'
				]);
		});

		return then('done');
	});
});
