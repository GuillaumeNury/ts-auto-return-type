import { return42 } from './utils';

function basicFunction0(): number {
	return 42;
}

function basicFunction1() {
	return 42;
}

function basicFunction2() {
	const innerFunction = () => 42;

	return innerFunction();
}

function basicFunction3() {
	function innerFunction() {
		return 42;
	}

	return innerFunction();
}

function basicFunction4() {
	return return42();
}

class A {
	public basicMethod() {
		return 42;
	}
}
