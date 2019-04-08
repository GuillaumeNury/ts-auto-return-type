import * as ts from 'typescript';

export const DEFAULT_CONFIG: ITsAutoReturnTypeConfig = {
	inferArrowFunctionReturnType: true,
	inferFunctionReturnType: true,
	inferMethodReturnType: true,
};

export interface ITsAutoReturnTypeConfig {
	inferArrowFunctionReturnType: boolean;
	inferFunctionReturnType: boolean;
	inferMethodReturnType: boolean;
}

export interface ITsAutoReturnTypeResult {
	allFunctions: IVisitedFunction[];
	matchings: IVisitedFunction[];
	position: number;
}

export interface IVisitedFunction {
	name?: string;
	inferredReturnType: string;
	textToInsert: ITextToInsert | null;
}

export interface IPosition {
	line: number;
	character: number;
}

export interface ITextToInsert {
	position: IPosition;
	text: string;
}

export interface ITsAutoReturnTypeExecution {
	program: ts.Program;
	typeChecker: ts.TypeChecker;
	files: ts.SourceFile[];
	selectedFile: ts.SourceFile;
}

export type FonctionNode =
	| ts.FunctionDeclaration
	| ts.MethodDeclaration;
