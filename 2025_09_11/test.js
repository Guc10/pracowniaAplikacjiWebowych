let x;
let y;
let z;

const prime = (x) => {
	if (x > 1) {
		for (let i = 2; i < x; i++) {
			if (x % i == 0) {
				return false;
			}
		}
		return true;
	} else {
		return false;
	}
};
const perfect = (x) => {
	let sum = 0;

	for (let i = 1; i < x; i++) {
		if (x % i == 0) {
			sum += i;
		}
	}
	if (sum == x) {
		return true;
	} else {
		return false;
	}
};
const power = (x) => {
	let power = x;
	for (let i = 1; i < 3; i++) {
		power *= x;
	}
	return power;
};

const readline = require('node:readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.question(`x = `, x => {
	y = (prime(Number(x))) ? "prime" : "not prime";
	z = (perfect(Number(x))) ? "perfect" : "not perfect";
	console.log(`The number ${x} is ${y} and is ${z}.`);
	console.log(`Your number to the power of 3 is ${power(Number(x))}.`);
	rl.close();
});