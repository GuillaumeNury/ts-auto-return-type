import {
	enrichFunctionNode,
	enrichFunctionNodes,
	getFunctionNodes,
} from './parser';

import { IVisitedFunction, DEFAULT_CONFIG } from './models';
import { startNewExecution } from './executions';

describe('Parser', () => {
	describe('getFunctionNodes', () => {
		it('should return 11 on basic.ts file', () => {
			const { selectedFile } = startNewExecution(
				`${__dirname}/../test-data/basic.ts`,
			);

			const nodes = getFunctionNodes(selectedFile, DEFAULT_CONFIG);

			// basicFunction0, basicFunction1, basicFunction2, arrowInnerFunction, basicFunction3
			// regularInnerFunction, basicFunction4, basicMethod, arrowFunction1, basicFunction5, arrowInnerFunction
			expect(nodes.length).toBe(11);
		});
	});
	describe('enrichFunctionNode', () => {
		it('should return correct information about basicFunction0 on basic.ts file', () => {
			const { selectedFile, typeChecker } = startNewExecution(
				`${__dirname}/../test-data/basic.ts`,
			);

			const [firstNode] = getFunctionNodes(
				selectedFile,
				DEFAULT_CONFIG,
			);
			const enrichedFunctions = enrichFunctionNode(
				selectedFile,
				firstNode,
				typeChecker,
			);

			expect(enrichedFunctions.length).toBe(1);

			const [enriched] = enrichedFunctions;

			expect(enriched.name).toBe('basicFunction0');
			expect(enriched.inferredReturnType).toBe('number');
			expect(enriched.textToInsert).toBe(null); // it has alread a return type
		});
	});
	describe('enrichFunctionNodes', () => {
		it('should return correct information about all fonctions on basic.ts file', () => {
			const { selectedFile, typeChecker } = startNewExecution(
				`${__dirname}/../test-data/basic.ts`,
			);

			const nodes = getFunctionNodes(selectedFile, DEFAULT_CONFIG);
			const enrichedFunctions = enrichFunctionNodes(
				selectedFile,
				nodes,
				typeChecker,
			);

			const expected = [
				{
					name: 'basicFunction0',
					inferredReturnType: 'number',
					textToInsert: null,
				},
				{
					name: 'basicFunction1',
					inferredReturnType: 'number',
					textToInsert: {
						text: ': number',
						position: {
							line: 8,
							character: 25,
						},
					},
				},
				{
					name: 'basicFunction2',
					inferredReturnType: 'number',
					textToInsert: {
						text: ': number',
						position: {
							line: 13,
							character: 25,
						},
					},
				},
				{
					inferredReturnType: 'number',
					textToInsert: {
						text: ': number',
						position: {
							line: 14,
							character: 30,
						},
					},
				},
				{
					name: 'basicFunction3',
					inferredReturnType: 'number',
					textToInsert: {
						text: ': number',
						position: {
							line: 20,
							character: 25,
						},
					},
				},
				{
					name: 'regularInnerFunction',
					inferredReturnType: 'number',
					textToInsert: {
						text: ': number',
						position: {
							line: 21,
							character: 32,
						},
					},
				},
				{
					name: 'basicFunction4',
					inferredReturnType: 'number',
					textToInsert: {
						text: ': number',
						position: {
							line: 29,
							character: 25,
						},
					},
				},
				{
					name: 'basicMethod',
					inferredReturnType: 'number',
					textToInsert: {
						text: ': number',
						position: {
							line: 35,
							character: 21,
						},
					},
				},
				{
					inferredReturnType: 'string',
					textToInsert: {
						text: ': string',
						position: {
							line: 41,
							character: 33,
						},
					},
				},
				{
					inferredReturnType: 'void',
					name: 'basicFunction5',
					textToInsert: null,
				},
				{
					inferredReturnType: 'string',
					textToInsert: {
						position: {
							character: 11,
							line: 46,
						},
						text: ': string',
					},
				},
			] as IVisitedFunction[];

			expect(enrichedFunctions).toEqual(expected);
		});
	});
});
