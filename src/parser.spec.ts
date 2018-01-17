import {
	enrichFunctionNode,
	enrichFunctionNodes,
	getFunctionNodes,
} from './parser';

import { IVisitedFunction } from './models';
import { startNewExecution } from './executions';

describe('Parser', () => {
	describe('getFunctionNodes', () => {
		it('should return 7 on basic.ts file', () => {
			const { selectedFile } = startNewExecution(
				`${__dirname}/../test-data/basic.ts`,
			);

			const nodes = getFunctionNodes(selectedFile);

			// basicFunction0, basicFunction1, basicFunction2, basicFunction3
			// regularInnerFunction, basicFunction4, basicMethod
			expect(nodes.length).toBe(7);
		});
	});
	describe('enrichFunctionNode', () => {
		it('should return correct information about basicFunction0 on basic.ts file', () => {
			const { selectedFile, typeChecker } = startNewExecution(
				`${__dirname}/../test-data/basic.ts`,
			);

			const [firstNode] = getFunctionNodes(selectedFile);
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

			const nodes = getFunctionNodes(selectedFile);
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
			] as IVisitedFunction[];

			expect(enrichedFunctions).toEqual(expected);
		});
		it('should return an empty array if typeChecker cannot find symbol', () => {
			const { selectedFile, typeChecker } = startNewExecution(
				`${__dirname}/../test-data/basic.ts`,
			);

			typeChecker.getSymbolAtLocation = () => undefined;

			const [firstNode] = getFunctionNodes(selectedFile);
			const enrichedFunctions = enrichFunctionNode(
				selectedFile,
				firstNode,
				typeChecker,
			);

			expect(enrichedFunctions).toEqual([]);
		});
	});
});
