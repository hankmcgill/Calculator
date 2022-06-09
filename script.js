///////////////////////////////////////////////////////////////
/////////////// CALCULATOR INITIAL VALUES /////////////////////
///////////////////////////////////////////////////////////////

let memoryValue = 0;
let firstInputValue = "";
let secondInputValue = "";
let operator = "";

let displayStrip = document.createElement("div");
displayStrip.innerHTML = "OH, HELLO...";
document.getElementById("display").appendChild(displayStrip);

const allClear = document.getElementById("allClear");
const clearBtn = document.getElementById("clear");
const memory = document.getElementById("memory");
const changePositive = document.getElementById("changePositive");
const seven = document.getElementById("seven");
const eight = document.getElementById("eight");
const nine = document.getElementById("nine");
const divide = document.getElementById("divide");
const four = document.getElementById("four");
const five = document.getElementById("five");
const six = document.getElementById("six");
const multiply = document.getElementById("multiply");
const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const subtract = document.getElementById("subtract");
const zero = document.getElementById("zero");
const decimal = document.getElementById("decimal");
const exponent = document.getElementById("exponent");
const add = document.getElementById("add");

///////////////////////////////////////////////////////////////
/////////////// CALCULATOR MATH OPERATIONS ////////////////////
///////////////////////////////////////////////////////////////

function operate(firstInputValue, operator, secondInputValue) {
  const parsedNum1 = Number(firstInputValue);
  const parsedNum2 = Number(secondInputValue);

  if (operator === "add") {
    calculatedResult = parsedNum1 + parsedNum2;
  }
  if (operator === "subtract") {
    calculatedResult = parsedNum1 - parsedNum2;
  }
  if (operator === "multiply") {
    calculatedResult = parsedNum1 * parsedNum2;
  }
  if (operator === "exponent") {
    calculatedResult = parsedNum1 ** parsedNum2;
  }
  if (operator === "divide") {
    if (parsedNum2 === 0) {
      calculatedResult = null;
    } else calculatedResult = parsedNum1 / parsedNum2;
  }
  return calculatedResult;
}

///////////////////////////////////////////////////////////////
/////////////// GET NUMERICAL INPUT ///////////////////////////
///////////////////////////////////////////////////////////////

function getButtonValue(number) {
  if (displayStrip.innerHTML === "0") {
    displayStrip.innerHTML = number;
  } else displayStrip.innerHTML += number;
}

one.addEventListener("click", function () {
  checkForScreenText();
  getButtonValue(1);
});
two.addEventListener("click", function () {
  checkForScreenText();
  getButtonValue(2);
});
three.addEventListener("click", function () {
  checkForScreenText();
  getButtonValue(3);
});
four.addEventListener("click", function () {
  checkForScreenText();
  getButtonValue(4);
});
five.addEventListener("click", function () {
  checkForScreenText();
  getButtonValue(5);
});
six.addEventListener("click", function () {
  checkForScreenText();
  getButtonValue(6);
});
seven.addEventListener("click", function () {
  checkForScreenText();
  getButtonValue(7);
});
eight.addEventListener("click", function () {
  checkForScreenText();
  getButtonValue(8);
});
nine.addEventListener("click", function () {
  checkForScreenText();
  getButtonValue(9);
});
zero.addEventListener("click", function () {
  checkForScreenText();
  getButtonValue(0);
});
decimal.addEventListener("click", function () {
  addDecimal();
});

///////////////////////////////////////////////////////////////
/////////////// GET OPERATOR INPUT ////////////////////////////
///////////////////////////////////////////////////////////////

clearBtn.addEventListener("click", function () {
  clear();
});

changePositive.addEventListener("click", function () {
  checkForScreenText();
  changePositveNegative();
});

memory.addEventListener("click", function () {
  useMemoryButton();
});

divide.addEventListener("click", function () {
  selectOperator();
  operator = "divide";
  displayStrip.innerHTML = `${displayStrip.innerHTML} / `;
  // checkForScreenText();
});
multiply.addEventListener("click", function () {
  selectOperator();
  operator = "multiply";
  displayStrip.innerHTML = `${displayStrip.innerHTML} X `;
});
subtract.addEventListener("click", function () {
  selectOperator();
  operator = "subtract";
  displayStrip.innerHTML = `${displayStrip.innerHTML} - `;
});
add.addEventListener("click", function () {
  selectOperator();
  operator = "add";
  displayStrip.innerHTML = `${displayStrip.innerHTML} + `;
});
exponent.addEventListener("click", function () {
  selectOperator();
  operator = "exponent";
  displayStrip.innerHTML = `${displayStrip.innerHTML} ^ `;
});

///////////////////////////////////////////////////////////////
/////////////// USE "ENTER" BUTTON TO GET RESULTS//////////////
///////////////////////////////////////////////////////////////

enterButton.addEventListener("click", function () {
  secondInputValue = displayStrip.innerHTML.split(" ").pop();
  if (firstInputValue === "" || operator === "" || secondInputValue === "") {
    return;
  } else {
    const res = operate(firstInputValue, operator, secondInputValue);
    if (res === null) {
      displayStrip.innerHTML = "DECLINED";
    } else {
      displayStrip.innerHTML = roundDecimal(res);
    }
  }
  firstInputValue = "";
  secondInputValue = "";
  operator = "";
});

///////////////////////////////////////////////////////////////
/////////////// CHECK FOR MULTIPLE OPERATORS //////////////////
///////////////////////////////////////////////////////////////

function checkForOperator() {
  if (operator) {
    secondInputValue = displayStrip.innerHTML.split(" ").pop();
    let newValue = operate(firstInputValue, operator, secondInputValue);
    if (newValue) {
      displayStrip.innerHTML = newValue;
    }
    firstInputValue = newValue;
  }
}

///////////////////////////////////////////////////////////////
/////// FUNCTION TO ROUND ANSWERS TO 5 DECIMAL POINTS /////////
///////////////////////////////////////////////////////////////

function roundDecimal(inputNumber) {
  if (Number.isInteger(inputNumber)) {
    return inputNumber;
  } else return Number(inputNumber.toFixed(5));
}

///////////////////////////////////////////////////////////////
///////////// CHECK FOR ERROR TEXT ONSCREEN  //////////////////
///////////////////////////////////////////////////////////////

function checkForScreenText() {
  if (
    displayStrip.innerHTML === "DECLINED" ||
    displayStrip.innerHTML === "NaN" ||
    displayStrip.innerHTML === "Infinity" ||
    displayStrip.innerHTML === "OH, HELLO..."
  ) {
    clear();
  }
}

///////////////////////////////////////////////////////////////
////////////// CLEAR INPUT VALUES /////////////////////////////
///////////////////////////////////////////////////////////////

function clear() {
  displayStrip.innerHTML = "0";
  firstInputValue = "";
  secondInputValue = "";
  operator = "";
}

allClear.addEventListener("click", function () {
  memoryValue = 0;
  clear();
  displayStrip.innerHTML = "OH, HELLO...";
});

///////////////////////////////////////////////////////////////
///////////// FLIP POSITIVE TO NEGATIVE  //////////////////////
///////////////////////////////////////////////////////////////

function changePositveNegative() {
  if (operator) {
    let modifiedValue = displayStrip.innerHTML.split(" ").pop() * -1;
    displayStrip.innerHTML =
      displayStrip.innerHTML.slice(0, -1) + modifiedValue;
  } else displayStrip.innerHTML = displayStrip.innerHTML * -1;
}

///////////////////////////////////////////////////////////////
///////////////// ADD DECIMAL POINTS //////////////////////////
///////////////////////////////////////////////////////////////

function addDecimal() {
  let tempSecondValue;
  checkForScreenText();
  if (operator) {
    tempSecondValue = displayStrip.innerHTML.split(" ").pop();
    if (tempSecondValue == "") {
      displayStrip.innerHTML = displayStrip.innerHTML + "0.";
      return;
    }
    if (!tempSecondValue.includes(".")) {
      displayStrip.innerHTML = displayStrip.innerHTML + ".";
    }
  } else if (displayStrip.innerHTML === 0) {
    displayStrip.innerHTML = "0.";
  } else displayStrip.innerHTML += ".";
}

///////////////////////////////////////////////////////////////
///////////////// SELECT OPERATOR /////////////////////////////
///////////////////////////////////////////////////////////////

function selectOperator() {
  checkForScreenText();
  checkForOperator();
  firstInputValue = displayStrip.innerHTML;
}

///////////////////////////////////////////////////////////////
////////////////  USE MEMORY BUTTON  //////////////////////////
///////////////////////////////////////////////////////////////

function useMemoryButton() {
  checkForScreenText();
  if (displayStrip.innerHTML == 0) {
    displayStrip.innerHTML = Number(memoryValue);
  } else if (memoryValue != 0) {
    displayStrip.innerHTML += Number(memoryValue);
  } else memoryValue = Number(displayStrip.innerHTML);
}

///////////////////////////////////////////////////////////////
////////// CHECK FOR BACK - TO - BACK OPERATORS  //////////////
///////////////////////////////////////////////////////////////

function checkForDeclined() {
  if (typeof displayStrip.innerHTML != "number") {
    clear();
    console.log("yep");
  }
}
