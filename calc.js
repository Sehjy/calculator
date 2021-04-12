//QuerySelectors and Variables------------------------------------------------

var btns = Array.from(document.querySelectorAll(".btn"));

var opsBtns = Array.from(document.querySelectorAll("#ops"));

var numsBtns = Array.from(document.querySelectorAll("#num"));

var display = document.querySelector(".mainS");

var displayS = document.querySelector(".subS");

var screen = document.querySelector(".screen");

var cleanBtn = document.querySelector("#clr");

var deleteBtn = document.querySelector("#del");

var num1;
var num2;
var opSave = "";
var input = false;
var validInput = false;
var equatedAns = false;
var beforeDel = "";

var opVals = new Array();

//fill up opVals with all the operators
for (let i = 0; i < opsBtns.length; i++) {
	opVals[i] = opsBtns[i].value;
}
//*****last bug i  saw before i crashed 12/3 -> 4 then divide then added number on accident then couldnt delete */
//EventListener------------------------------------------------

btns.forEach((button) =>
	button.addEventListener("click", function (e) {
		//if clear button is clicked, restart calc
		if (button === cleanBtn) {
			clear();
		}

		//if delete button is clicked, run del func
		else if (button == deleteBtn && equatedAns !== true) {
			del();
		}

		//if equal op is clicked, and there is a operator saved, run operation and display result
		else if (
			button.textContent === "=" &&
			opSave !== "" &&
			equatedAns !== true
		) {
			num2 = parseFloat(display.textContent);
			equate(opSave, num1, num2);
			equatedAns = true;
		} else if (button.textContent === "+/-") {
			display.textContent = plusMinus(parseFloat(display.textContent));
		}

		//if input thus far is good, and current input is operator
		else if (
			opVals.includes(button.textContent) &&
			button.textContent !== "=" &&
			input === true
		) {
			if (
				opVals.includes(
					display.textContent.substring(display.textContent.length - 1)
				)
			) {
				display.textContent = display.textContent.slice(0, -1);
			}

			if (typeof num1 === typeof 0 && opSave !== "" && equatedAns === false) {
				num2 = parseFloat(display.textContent);
				equate(opSave, num1, num2);
				//else set num1 to display value
				num1 = parseFloat(display.textContent);
				equatedAns = true;
				opSave = button.textContent;
			} else {
				//else set num1 to display value
				num1 = parseFloat(display.textContent);
				equatedAns = false;
				opSave = button.textContent;
				displayVal(button.textContent);
			}
		}

		//if number value value
		else if (numsBtns.includes(button)) {
			//if the prev value is an operator
			if (
				opVals.includes(
					display.textContent.substring(display.textContent.length - 1)
				)
			) {
				displayS.textContent = beforeDel;
				display.textContent = button.textContent;
			}

			//if there is an empty space post a delete in main display
			else if (
				display.textContent.substring(display.textContent.length - 1) === " "
			) {
				display.textContent = display.textContent.slice(0, -1);
				validInput = false;
				opSave = "";
				displayVal(button.textContent);
			} else {
				displayVal(button.textContent);
			}
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

function plusMinus(x) {
	return x * -1;
}

//displays input on the calculator screen
function displayVal(x) {
	//if there has been no input thus far, replace the 0 with some value
	if (input === false) {
		input = true;
		display.textContent = x;
	}
	//if input is an operator, add input this far into bottom screen and say current input is valid
	else if (opVals.includes(x)) {
		displayS.textContent = display.textContent + " " + x;
		display.textContent = 0;
		validInput = true;
	}

	//if there has been a valid input thus far, begin to display second num input instead of 0
	else if (validInput) {
		display.textContent = x;
		validInput = false;
	}

	//otherwise just append the current number
	else {
		display.textContent += x;
	}
}

//once the equal button is hit, perform correct function
function equate(op, x, y) {
	displayS.textContent = displayS.textContent + " " + y;
	if (op === "-") {
		display.textContent = subtract(x, y);
	} else if (op === "+") {
		display.textContent = add(x, y);
	} else if (op === "×") {
		display.textContent = multiply(x, y);
	} else {
		if (y === 0) {
			display.textContent = "chill out fam";
			displayS.textContent = "";
		} else {
			display.textContent = divide(x, y);
		}
	}

	return;
}

//deletes last input
function del() {
	//if the top display has values, begin to delete those first
	if (display.textContent !== "" || display.textContent !== "0") {
		//if the top display contains space, delete twice
		if (display.textContent.substring(display.textContent.length - 1) === " ") {
			display.textContent = display.textContent.slice(0, -1);
		}
		display.textContent = display.textContent.slice(0, -1);

		//if after deletion the top is empty, place a zero and reset input so that we will replace 0 with the next input
		if (display.textContent === "" || display.textContent === "0") {
			if (displayS.textContent !== "") {
				beforeDel = displayS.textContent;
				display.textContent = displayS.textContent;
				displayS.textContent = "";
			} else {
				clear();
			}
		}
	}
}

//resets all values
function clear() {
	num1 = 0;
	num2 = 0;
	opSave = "";
	input = false;
	validInput = false;
	display.textContent = 0;
	displayS.textContent = "";
	equatedAns = "";
}
