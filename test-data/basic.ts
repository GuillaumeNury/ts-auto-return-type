import { return42 } from './utils';

// @ts-ignore
function basicFunction0(): number {
	return 42;
}

// @ts-ignore
function basicFunction1() {
	return 42;
}

// @ts-ignore
function basicFunction2() {
	const arrowInnerFunction = () => 42;

	return arrowInnerFunction();
}

// @ts-ignore
function basicFunction3() {
	function regularInnerFunction() {
		return 42;
	}

	return regularInnerFunction();
}

// @ts-ignore
function basicFunction4() {
	return return42();
}

// @ts-ignore
class A {
	public basicMethod() {
		return 42;
	}
}

// @ts-ignore
const arrowFunction1 = (one, two) => 'string';

// @ts-ignore
function basicFunction5(): void {
	let app: any;
	app.use(() => 'string');
}
