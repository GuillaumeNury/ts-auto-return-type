import * as ts from 'typescript';

import {
	FonctionNode,
	ITextToInsert,
	IVisitedFunction,
	DEFAULT_CONFIG,
} from './models';
import {
	functionsAtPosition,
	getTextModificationForVisitedFunctions,
} from './utils';

import { isFunctionNode } from './utils';

describe('Utils', () => {
	describe('isFunctionNode', () => {
		it('should return true when FunctionDeclaration and DEFAULT_CONFIG', () => {
			const node = {
				kind: ts.SyntaxKind.FunctionDeclaration,
			} as ts.Node;

			expect(isFunctionNode(node, DEFAULT_CONFIG)).toBe(true);
		});
		it('should return true when MethodDeclaration and DEFAULT_CONFIG', () => {
			const node = {
				kind: ts.SyntaxKind.MethodDeclaration,
			} as ts.Node;

			expect(isFunctionNode(node, DEFAULT_CONFIG)).toBe(true);
		});
	});
	describe('functionsAtPosition', () => {
		it('should return FonctionNodes that wrap position', () => {
			const mockFile = (<any>{
				getPositionOfLineAndCharacter: () => 10,
			}) as ts.SourceFile;

			const mockNodeFactory = (start: number, end: number) => {
				return {
					getStart: () => start,
					getEnd: () => end,
				} as FonctionNode;
			};

			const node1 = mockNodeFactory(0, 20);
			const node2 = mockNodeFactory(0, 10);
			const node3 = mockNodeFactory(10, 20);
			const node4 = mockNodeFactory(11, 20);

			const result = functionsAtPosition(
				mockFile,
				[node1, node2, node3, node4],
				{ character: 0, line: 0 },
			);

			expect(result).toEqual([node1, node2, node3]);
		});
	});

	describe('getTextModificationForVisitedFunctions', () => {
		it('should return textToInsert of visitedFonction that have a textToInsert', () => {
			const mockFunctionFactory = (
				textToInsert: ITextToInsert | null,
			) =>
				({
					textToInsert,
				} as IVisitedFunction);

			const functions = [
				mockFunctionFactory(null),
				mockFunctionFactory({
					text: 'Text 1',
					position: { line: 1, character: 1 },
				}),
			];

			const result = getTextModificationForVisitedFunctions(functions);

			expect(result).toEqual([
				{ text: 'Text 1', position: { line: 1, character: 1 } },
			]);
		});
	});
});
