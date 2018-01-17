import * as ts from 'typescript';

import {
	FonctionNode,
	IPosition,
	ITextToInsert,
	IVisitedFunction,
} from './models';

export function isFunctionNode(
	node: ts.Node,
): node is ts.FunctionDeclaration | ts.MethodDeclaration {
	return (
		ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node)
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
