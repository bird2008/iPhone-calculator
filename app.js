//get place of result displayes
const placeOfResultDisplayed = document.getElementById("result");

//display result
let actions = "";
let currentNumber = "";

//get buttons
const clearButton = document.getElementById("clear");
const backspaceButton = document.getElementById("backspace");
const percentageButton = document.getElementById("percentage");

const numberButtons = document.querySelectorAll(".numberButton");
const opaertionButtons = document.querySelectorAll(".operationButton");

const divideButton = document.getElementById("divide");
const multiplyButton = document.getElementById("multiply");
const minusButton = document.getElementById("minus");
const plusButton = document.getElementById("plus");
const equalityButton = document.getElementById("equality");

//calculator operations
let removeOperationStyle = () => {
	opaertionButtons.forEach((button) => {
		button.classList.remove("active");
	});
};

let updateDisplayedNumber = () => {
	placeOfResultDisplayed.innerHTML = currentNumber;
};

let backspace = () => {
	if (actions.length > 0) {
		if (
			actions.slice(-1) === "*" ||
			actions.slice(-1) === "/" ||
			actions.slice(-1) === "-" ||
			actions.slice(-1) === "+" ||
			actions.slice(-1) === "="
		) {
			return;
		}
		actions = actions.slice(0, -1);
		currentNumber = currentNumber.slice(0, -1);
		updateDisplayedNumber();
	}
	console.log(actions);
};

let percentage = () => {
	if (actions.length > 0) {
		if (
			actions.slice(-1) === "*" ||
			actions.slice(-1) === "/" ||
			actions.slice(-1) === "-" ||
			actions.slice(-1) === "+"
		) {
			return;
		}
	}
	currentNumber = "";
	actions += "/100";
	equality();
};

let divide = () => {
	removeOperationStyle();
	divideButton.classList.add("active");
	currentNumber = "";

	if (actions.length > 0) {
		if (actions.slice(-1) === "/") {
			return;
		} else if (
			actions.slice(-1) === "*" ||
			actions.slice(-1) === "+" ||
			actions.slice(-1) === "-"
		) {
			actions = actions.slice(0, -1);
		}
	}
	actions += "/";

	console.log(actions);
};

let multiply = () => {
	removeOperationStyle();
	multiplyButton.classList.add("active");
	currentNumber = "";

	if (actions.length > 0) {
		if (actions.slice(-1) === "*") {
			return;
		} else if (
			actions.slice(-1) === "/" ||
			actions.slice(-1) === "+" ||
			actions.slice(-1) === "-"
		) {
			actions = actions.slice(0, -1);
		}
	}
	actions += "*";

	console.log(actions);
};

let minus = () => {
	removeOperationStyle();
	minusButton.classList.add("active");
	currentNumber = "";

	if (actions.length > 0) {
		if (actions.slice(-1) === "-") {
			return;
		} else if (
			actions.slice(-1) === "/" ||
			actions.slice(-1) === "*" ||
			actions.slice(-1) === "+"
		) {
			actions = actions.slice(0, -1);
		}
	}
	actions += "-";

	console.log(actions);
};

let plus = () => {
	removeOperationStyle();
	plusButton.classList.add("active");
	currentNumber = "";

	if (actions.length > 0) {
		if (actions.slice(-1) === "+") {
			return;
		} else if (
			actions.slice(-1) === "/" ||
			actions.slice(-1) === "*" ||
			actions.slice(-1) === "-"
		) {
			actions = actions.slice(0, -1);
		}
	}
	actions += "+";

	console.log(actions);
};

let equality = () => {
	removeOperationStyle();
	currentNumber = "";

	if (actions.includes("/0")) {
		placeOfResultDisplayed.innerHTML = "Error";
		return;
	}
	if (actions.length > 1) {
		if (
			actions.slice(-1) === "*" ||
			actions.slice(-1) === "/" ||
			actions.slice(-1) === "-" ||
			actions.slice(-1) === "+"
		) {
			let resultLast = actions.slice(0, -1);
			resultLast = eval(resultLast);
			placeOfResultDisplayed.innerHTML = resultLast;
			actions = resultLast;
			console.log(actions);
		} else {
			let result = eval(actions);
			placeOfResultDisplayed.innerHTML = result;
			actions = result;
			console.log(actions);
		}
	}
};

let clear = () => {
	removeOperationStyle();
	actions = "";
	placeOfResultDisplayed.innerHTML = "";
	currentNumber = "0";
	updateDisplayedNumber();
};

//eventlistener and call functions
clear();

clearButton.addEventListener("click", () => {
	clear();
});
backspaceButton.addEventListener("click", () => {
	backspace();
});
percentageButton.addEventListener("click", () => {
	percentage();
});

numberButtons.forEach((button) => {
	button.addEventListener("click", () => {
		if (currentNumber.length === 6) {
			placeOfResultDisplayed.style.fontSize = "90%";
		} else if (currentNumber.length === 5) {
			placeOfResultDisplayed.style.fontSize = "100%";
		}
		removeOperationStyle();
		if (currentNumber === "0") {
			currentNumber = "";
			updateDisplayedNumber();
		}
		if (button.textContent === ",") {
			if (currentNumber.includes(",")) {
				return;
			}
			if (currentNumber.length === 0) {
				currentNumber += "0";
			}
			divideButton.classList.remove("active");
			actions += ".";
			currentNumber += button.textContent;
			updateDisplayedNumber();

			console.log(actions);
		} else {
			divideButton.classList.remove("active");
			actions += button.textContent;
			currentNumber += button.textContent;
			updateDisplayedNumber();

			console.log(actions);
		}
	});
});

divideButton.addEventListener("click", () => {
	divide();
});
multiplyButton.addEventListener("click", () => {
	multiply();
});
minusButton.addEventListener("click", () => {
	minus();
});
plusButton.addEventListener("click", () => {
	plus();
});
equalityButton.addEventListener("click", () => {
	equality();
});
