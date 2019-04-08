import * as ts from 'typescript';

import {
	FonctionNode,
	IPosition,
	ITextToInsert,
	IVisitedFunction,
	ITsAutoReturnTypeConfig,
} from './models';

export function isFunctionNode(
	node: ts.Node,
	config: ITsAutoReturnTypeConfig,
): node is ts.FunctionDeclaration | ts.MethodDeclaration {
	return (
		(config.inferFunctionReturnType &&
			ts.isFunctionDeclaration(node)) ||
		(config.inferMethodReturnType && ts.isMethodDeclaration(node)) ||
		(config.inferArrowFunctionReturnType && ts.isArrowFunction(node))
	);
}

export function functionsAtPosition(
	file: ts.SourceFile,
	nodes: FonctionNode[],
	{ line, character }: IPosition,
): FonctionNode[] {
	const position = file.getPositionOfLineAndCharacter(line, character);

	return nodes.filter(
		node => position >= node.getStart() && position <= node.getEnd(),
	);
}

export function getTextModificationForVisitedFunctions(
	functions: IVisitedFunction[],
): ITextToInsert[] {
	return functions.reduce(
		(acc, func) => {
			if (func.textToInsert) {
				acc.push(func.textToInsert);
			}

			return acc;
		},
		[] as ITextToInsert[],
	);
}
