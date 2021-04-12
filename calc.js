//QuerySelectors and Variables------------------------------------------------

var btns = Array.from(document.querySelectorAll(".btn"));

var opsBtns = Array.from(document.querySelectorAll("#ops"));

var numsBtns = Array.from(document.querySelectorAll("#num"));

var display = document.querySelector(".mainS");

var displayS = document.querySelector(".subS");

var screen = document.querySelector(".screen");

var clean = document.querySelector("#clr");

var num1 = 0;
var num2 = 0;
var opSave = "";
var input = false;
var validInput = false;

var opVals = new Array();

//fill up opVals with all the operators
for (let i = 0; i < opsBtns.length; i++) {
	opVals[i] = opsBtns[i].value;
}

//EventListener------------------------------------------------

btns.forEach((button) =>
	button.addEventListener("click", function (e) {
		if (button === clean) {
			clear();
		} else if (button.textContent === "=" && opSave !== "") {
			num2 = parseInt(display.textContent);
			equate(opSave, num1, num2);
		} else if (
			opVals.includes(button.textContent) &&
			button.textContent !== "=" &&
			opSave === ""
		) {
			num1 = parseInt(display.textContent);
			opSave = button.textContent;
			displayVal(button.textContent);
		} else if (!opVals.includes(button.textContent)) {
			displayVal(button.textContent);
		}
	})
);

//FUNCTIONS-----------------------------------------------------
function add(x, y) {
	return x + y;
}

function subtract(x, y) {
	return x - y;
}

function multiply(x, y) {
	return x * y;
}

function divide(x, y) {
	return x / y;
}

function displayVal(x) {
	if (input === false) {
		input = true;
		display.textContent = x;
	} else if (opVals.includes(x)) {
		displayS.textContent = display.textContent + " " + x;
		display.textContent = 0;
		validInput = true;
	} else if (validInput) {
		display.textContent = x;
		validInput = false;
	} else {
		display.textContent += x;
	}
}

function equate(op, x, y) {
	displayS.textContent = displayS.textContent + " " + y;
	if (op === "-") {
		display.textContent = subtract(x, y);
	} else if (op === "+") {
		display.textContent = add(x, y);
	} else if (op === "×") {
		display.textContent = multiply(x, y);
	} else {
		display.textContent = divide(x, y);
	}

	return;
}

function clear() {
	num1 = 0;
	num2 = 0;
	opSave = "";
	input = false;
	validInput = false;
	display.textContent = 0;
	displayS.textContent = "";
}
