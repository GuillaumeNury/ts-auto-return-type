import {
	getModificationsAtPosition,
	getModificationsForFile,
} from './executions';
import { DEFAULT_CONFIG } from './models';

describe('Execution', () => {
	describe('getModificationsAtPosition', () => {
		it('should return empty array if cursor on basicFunction0', () => {
			const modifications = getModificationsAtPosition(
				`${__dirname}/../test-data/basic.ts`,
				{ line: 4, character: 6 },
				DEFAULT_CONFIG,
			);

			expect(modifications).toEqual([]);
		});
		it('should return one line if cursor on basicFunction1', () => {
			const modifications = getModificationsAtPosition(
				`${__dirname}/../test-data/basic.ts`,
				{ line: 9, character: 7 },
				DEFAULT_CONFIG,
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
				{ line: 22, character: 12 },
				DEFAULT_CONFIG,
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
		it('should return not truncated type on veryLongReturnType', () => {
			const modifications = getModificationsAtPosition(
				`${__dirname}/../test-data/issue-vscode-3.ts`,
				{ line: 0, character: 0 },
			);
			const expectedType = `: { a0123456789: { b0123456789: { c0123456789: { d0123456789: { e0123456789: { a0123456789: { b0123456789: { c0123456789: { d0123456789: { e0123456789: number; }; }; }; }; }; }; }; }; }; b0123456789: { c0123456789: { d0123456789: { e0123456789: { a0123456789: { b0123456789: { c0123456789: { d0123456789: { e0123456789: number; }; }; }; }; }; }; }; }; c0123456789: { d0123456789: { e0123456789: { a0123456789: { b0123456789: { c0123456789: { d0123456789: { e0123456789: number; }; }; }; }; }; }; }; }`;

			expect(modifications).toEqual([
				{
					text: expectedType,
					position: {
						line: 0,
						character: 29,
					},
				},
			]);
		});
	});

	describe('getModificationsForFile', () => {
		it('should return 9 lines on test-data/basic.ts', () => {
			const modifications = getModificationsForFile(
				`${__dirname}/../test-data/basic.ts`,
				DEFAULT_CONFIG,
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
						line: 14,
						character: 30,
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
				{
					text: ': string',
					position: {
						line: 41,
						character: 33,
					},
				},
				{
					text: ': string',
					position: {
						line: 46,
						character: 11,
					},
				},
			]);
		});
		it('should return empty array on test-data/utils.ts', () => {
			const modifications = getModificationsForFile(
				`${__dirname}/../test-data/utils.ts`,
				DEFAULT_CONFIG,
			);

			expect(modifications).toEqual([]);
		});
	});
});
