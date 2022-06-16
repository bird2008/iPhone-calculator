//get place of result displayes
const placeOfResultDisplayed = document.getElementById("result");

//display result
let actions = "";
let displayedNumber = "";

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
	placeOfResultDisplayed.innerHTML = displayedNumber;
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
		displayedNumber = displayedNumber.slice(0, -1);
		if (displayedNumber.length === 8) {
			placeOfResultDisplayed.style.fontSize = "100%";
		}
		updateDisplayedNumber();
	}
	console.log(actions);
};

let percentage = () => {
	if (actions.length === 0) {
		return;
	}
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
	displayedNumber = "";
	actions += "/100";
	equality();
};

let divide = () => {
	removeOperationStyle();
	divideButton.classList.add("active");
	displayedNumber = "";

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
	displayedNumber = "";

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
	displayedNumber = "";

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
	displayedNumber = "";

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
			let finalResult = result.toPrecision(12);
			if (finalResult.length > 0) {
				while (finalResult.slice(-1) === "0") {
					finalResult = finalResult.slice(0, -1);
				}
				if (finalResult.slice(-1) === ".") {
					finalResult = finalResult.slice(0, -1);
				}
			}
			if (finalResult.length > 10) {
				placeOfResultDisplayed.style.fontSize = "50%";
			}
			placeOfResultDisplayed.innerHTML = finalResult;
			actions = finalResult;
			console.log(actions);
			displayedNumber = finalResult;
			updateDisplayedNumber;
		}
	}
};

let clear = () => {
	removeOperationStyle();
	actions = "";
	placeOfResultDisplayed.innerHTML = "";
	displayedNumber = "0";
	resultLast = "";
	finalResult = "";
	updateDisplayedNumber();
	placeOfResultDisplayed.style.fontSize = "100%";
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
		removeOperationStyle();
		if (displayedNumber.length === 10) {
			return;
		}
		if (displayedNumber.length === 8) {
			placeOfResultDisplayed.style.fontSize = "90%";
		}
		if (displayedNumber === "0") {
			displayedNumber = "";
			updateDisplayedNumber();
		}
		if (button.textContent === ",") {
			if (displayedNumber.includes(",")) {
				return;
			}
			if (displayedNumber.length === 0) {
				displayedNumber += "0";
			}
			divideButton.classList.remove("active");
			actions += ".";
			displayedNumber += button.textContent;
			updateDisplayedNumber();

			console.log(actions);
		} else {
			divideButton.classList.remove("active");
			actions += button.textContent;
			displayedNumber += button.textContent;
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
