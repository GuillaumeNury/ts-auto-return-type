import * as ts from 'typescript';

import {
	FonctionNode,
	ITextToInsert,
	IVisitedFunction,
	ITsAutoReturnTypeConfig,
} from './models';

import { isFunctionNode } from './utils';

export function enrichFunctionNodes(
	file: ts.SourceFile,
	nodes: FonctionNode[],
	typeChecker: ts.TypeChecker,
): IVisitedFunction[] {
	return nodes.reduce(
		(acc, node) => [
			...acc,
			...enrichFunctionNode(file, node, typeChecker),
		],
		[] as IVisitedFunction[],
	);
}

export function enrichFunctionNode(
	file: ts.SourceFile,
	node: FonctionNode,
	typeChecker: ts.TypeChecker,
): IVisitedFunction[] {
	const typeOfFunction = typeChecker.getTypeAtLocation(node);

	return typeOfFunction.getCallSignatures().map(signature => {
		const type = signature.getReturnType();
		const typeAsString = typeChecker.typeToString(type, undefined, ts.TypeFormatFlags.NoTruncation);

		const textToInsert = getTextToInsert(file, node, typeAsString);
		const symbol =
			node.name && typeChecker.getSymbolAtLocation(node.name);

		return {
			inferredReturnType: typeAsString,
			textToInsert,
			name: symbol && symbol.name,
		};
	});
}

export function getFunctionNodes(
	node: ts.Node,
	config: ITsAutoReturnTypeConfig,
): FonctionNode[] {
	return node.getChildren().reduce(
		(acc, child) => {
			if (isFunctionNode(child, config)) {
				acc.push(child);
			}

			return [...acc, ...getFunctionNodes(child, config)];
		},
		[] as FonctionNode[],
	);
}

function getTextToInsert(
	file: ts.SourceFile,
	node: FonctionNode,
	type: string,
): ITextToInsert | null {
	let parenthesisPosition = -1;
	let colonPosition = -1;

	node.getChildren().forEach(child => {
		if (child.kind === ts.SyntaxKind.CloseParenToken) {
			parenthesisPosition = child.getEnd();
		}

		// Find a ":" after a ")"
		if (
			parenthesisPosition >= 0 &&
			child.kind === ts.SyntaxKind.ColonToken
		) {
			colonPosition = child.getEnd();
		}
	});

	// if colonPosition >= 0, it means that here is already a return type
	const noInsertion = parenthesisPosition === -1 || colonPosition >= 0;

	if (noInsertion) {
		return null;
	}

	const text = `: ${type}`;
	const position = file.getLineAndCharacterOfPosition(
		parenthesisPosition,
	);

	return parenthesisPosition >= 0 ? { position, text } : null;
}
