import {
	getModificationsAtPosition,
	getModificationsForFile,
} from './executions';

describe('Execution', () => {
	describe('getModificationsAtPosition', () => {
		it('should return empty array if cursor on basicFunction0', () => {
			const modifications = getModificationsAtPosition(
				`${__dirname}/../test-data/basic.ts`,
				{ line: 4, character: 6 },
			);

			expect(modifications).toEqual([]);
		});
		it('should return one line if cursor on basicFunction1', () => {
			const modifications = getModificationsAtPosition(
				`${__dirname}/../test-data/basic.ts`,
				{ line: 9, character: 7 },
			);

			expect(modifications).toEqual([
				{
					text: ': number',
					position: {
						line: 8,
						character: 25,
					},
				},
			]);
		});
		it('should return two lines if cursor on basicFunction3', () => {
			const modifications = getModificationsAtPosition(
				`${__dirname}/../test-data/basic.ts`,
				{ line: 22, character: 13 },
			);

			expect(modifications).toEqual([
				{
					text: ': number',
					position: {
						line: 20,
						character: 25,
					},
				},
				{
					text: ': number',
					position: {
						line: 21,
						character: 32,
					},
				},
			]);
		});
	});

	describe('getModificationsForFile', () => {
		it('should return 6 lines on test-data/basic.ts', () => {
			const modifications = getModificationsForFile(
				`${__dirname}/../test-data/basic.ts`,
			);

			expect(modifications).toEqual([
				{
					text: ': number',
					position: {
						line: 8,
						character: 25,
					},
				},
				{
					text: ': number',
					position: {
						line: 13,
						character: 25,
					},
				},
				{
					text: ': number',
					position: {
						line: 20,
						character: 25,
					},
				},
				{
					text: ': number',
					position: {
						line: 21,
						character: 32,
					},
				},
				{
					text: ': number',
					position: {
						line: 29,
						character: 25,
					},
				},
				{
					text: ': number',
					position: {
						line: 35,
						character: 21,
					},
				},
			]);
		});
		it('should return empty array on test-data/utils.ts', () => {
			const modifications = getModificationsForFile(
				`${__dirname}/../test-data/utils.ts`,
			);

			expect(modifications).toEqual([]);
		});
	});
});
