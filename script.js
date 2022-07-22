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
const enterButton = document.getElementById("enterButton");
let numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (displayStrip.innerHTML.length < displayStripMaxLength) {
      numberAsInput(button.innerHTML);
    }
  });
});

///////////////////////////////////////////////////////////////
//////// CHECK FOR ERROR TEXT OR OVERFLOW ONSCREEN  ///////////
///////////////////////////////////////////////////////////////

const displayStripMaxLength = 18;

const checkForScreenText = () => {
  if (
    displayStrip.innerHTML === "DECLINED" ||
    displayStrip.innerHTML === "NaN" ||
    displayStrip.innerHTML === "Infinity" ||
    displayStrip.innerHTML === "OH, HELLO..."
  ) {
    clear();
  }
};

const roundDecimal = (inputNumber) => {
  if (Number.isInteger(inputNumber)) {
    return inputNumber;
  } else return Number(inputNumber.toFixed(5));
};

const roundDecimalOptionTwo = (inputNumber) => {
  if (Number.isInteger(inputNumber)) {
    return inputNumber;
  } else return Number(inputNumber.toFixed(10));
};

///////////////////////////////////////////////////////////////
/////////// CALCULATOR OPERATION FUNCTIONS ////////////////////
///////////////////////////////////////////////////////////////

const operate = (firstInputValue, operator, secondInputValue) => {
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
};

/////// ATTEMPT AT WRITING A MODULE PATTERN ////////////////

// const operate = ((firstInputValue, secondInputValue) => {
//   const parsedNum1 = Number(firstInputValue);
//   const parsedNum2 = Number(secondInputValue);
//   const operateByAdding = () => {
//     return parsedNum1 + parsedNum2;
//   };
//   const operateBySubtracting = () => {
//     return parsedNum1 - parsedNum2;
//   };
//   const operateByMultiplying = () => {
//     return parsedNum1 * parsedNum2;
//   };
//   const operateByExponentiating = () => {
//     return parsedNum1 ** parsedNum2;
//   };
//   const operateByDividing = () => {
//     return parsedNum1 / parsedNum2;
//   };
//   return {
//     operateByAdding,
//     operateBySubtracting,
//     operateByMultiplying,
//     operateByExponentiating,
//     operateByDividing,
//   };
// })();

// const solution = operate.operateByAdding(3, 4);

const divideValues = () => {
  selectOperator();
  operator = "divide";
  displayStrip.innerHTML = `${displayStrip.innerHTML} / `;
};

const multiplyValues = () => {
  selectOperator();
  operator = "multiply";
  displayStrip.innerHTML = `${displayStrip.innerHTML} X `;
};

const subtractValues = () => {
  selectOperator();
  operator = "subtract";
  displayStrip.innerHTML = `${displayStrip.innerHTML} - `;
};

const addValues = () => {
  selectOperator();
  operator = "add";
  displayStrip.innerHTML = `${displayStrip.innerHTML} + `;
};

const exponentializeValues = () => {
  selectOperator();
  operator = "exponent";
  displayStrip.innerHTML = `${displayStrip.innerHTML} ^ `;
};

const invertValuePolarity = () => {
  checkForScreenText();
  changePositveNegative();
};

const operatorTextToSymbol = (operatorAsText) => {
  switch (operatorAsText) {
    case "multiply":
      return "X";
    case "divide":
      return "/";
    case "add":
      return "+";
    case "subtract":
      return "-";
    case "exponent":
      return "^";
  }
};

const changePositveNegative = () => {
  if (operator) {
    const values = displayStrip.innerHTML.split(
      ` ${operatorTextToSymbol(operator)} `
    );
    const firstInputValue = values[0];
    const secondInputValue = values[1] * -1;
    displayStrip.innerHTML = `${firstInputValue} ${operatorTextToSymbol(
      operator
    )} ${secondInputValue}`;
  } else displayStrip.innerHTML = displayStrip.innerHTML * -1;
};

const clear = () => {
  displayStrip.innerHTML = "0";
  firstInputValue = "";
  secondInputValue = "";
  operator = "";
};

const pressAllClearButton = () => {
  memoryValue = 0;
  clear();
  displayStrip.innerHTML = "OH, HELLO...";
};

const useMemoryButton = () => {
  checkForScreenText();
  if (displayStrip.innerHTML == 0) {
    displayStrip.innerHTML = Number(memoryValue);
  } else if (memoryValue != 0) {
    displayStrip.innerHTML += Number(memoryValue);
  } else memoryValue = Number(displayStrip.innerHTML);
};

const pressEnterButton = () => {
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
};

const selectOperator = () => {
  checkForScreenText();
  if (operator) {
    const values = displayStrip.innerHTML.split(
      ` ${operatorTextToSymbol(operator)} `
    );
    let firstInputValue = values[0];
    let secondInputValue = values[1];
    if (!secondInputValue) {
      displayStrip.innerHTML = `${firstInputValue}`;
      return;
    }
    let newValue = roundDecimalOptionTwo(
      operate(firstInputValue, operator, secondInputValue)
    );
    if (newValue === 0) {
      displayStrip.innerHTML = 0;
    }
    if (newValue) {
      displayStrip.innerHTML = newValue;
    }
    firstInputValue = newValue;
  }
  firstInputValue = displayStrip.innerHTML;
};

///////////////////////////////////////////////////////////////
/////////////// GET NUMERICAL INPUT ///////////////////////////
///////////////////////////////////////////////////////////////

const numberAsInput = (number) => {
  checkForScreenText();
  if (displayStrip.innerHTML === "0") {
    displayStrip.innerHTML = number;
  } else displayStrip.innerHTML += number;
};

decimal.addEventListener("click", function () {
  if (displayStrip.innerHTML.length < displayStripMaxLength - 1) {
    getDecimal();
  }
});

const getDecimal = () => {
  let tempSecondValue;
  checkForScreenText();
  if (operator) {
    tempSecondValue = displayStrip.innerHTML.split(" ").pop();
    if (!tempSecondValue) {
      displayStrip.innerHTML = displayStrip.innerHTML + "0.";
      return;
    }
    if (!tempSecondValue.includes(".")) {
      displayStrip.innerHTML = displayStrip.innerHTML + ".";
    }
  } else if (displayStrip.innerHTML === 0) {
    displayStrip.innerHTML = "0.";
  } else if (displayStrip.innerHTML.includes(".")) {
    return;
  } else {
    displayStrip.innerHTML += ".";
  }
};

///////////////////////////////////////////////////////////////
/////////////// GET OPERATOR INPUT ////////////////////////////
///////////////////////////////////////////////////////////////

clearBtn.addEventListener("click", function () {
  clear();
});
changePositive.addEventListener("click", function () {
  if (displayStrip.innerHTML.length < displayStripMaxLength + 1) {
    invertValuePolarity();
  }
});
memory.addEventListener("click", function () {
  useMemoryButton();
});
divide.addEventListener("click", function () {
  if (displayStrip.innerHTML.length < displayStripMaxLength - 1) {
    divideValues();
  }
});
multiply.addEventListener("click", function () {
  if (displayStrip.innerHTML.length < displayStripMaxLength - 1) {
    multiplyValues();
  }
});
subtract.addEventListener("click", function () {
  if (displayStrip.innerHTML.length < displayStripMaxLength - 1) {
    subtractValues();
  }
});
add.addEventListener("click", function () {
  if (displayStrip.innerHTML.length < displayStripMaxLength - 1) {
    addValues();
  }
});
exponent.addEventListener("click", function () {
  if (displayStrip.innerHTML.length < displayStripMaxLength - 1) {
    exponentializeValues();
  }
});
allClear.addEventListener("click", function () {
  pressAllClearButton();
});
enterButton.addEventListener("click", function () {
  pressEnterButton();
});

document.addEventListener("keydown", function (event) {
  if (Number(event.key)) {
    console.log(event.key);
    if (displayStrip.innerHTML.length < displayStripMaxLength) {
      numberAsInput(event.key);
    }
  }
  if (event.key === "0") {
    if (displayStrip.innerHTML.length < displayStripMaxLength) {
      numberAsInput(0);
    }
  }
  if (event.key === ".") {
    if (displayStrip.innerHTML.length < displayStripMaxLength - 1) {
      getDecimal();
    }
  }
  if (event.key === "Enter" || event.key === "=") {
    pressEnterButton();
  }
  if (
    event.key === "Backspace" ||
    event.key === "c" ||
    event.key === "Escape"
  ) {
    clear();
  }
  if (event.key === "^") {
    if (displayStrip.innerHTML.length < displayStripMaxLength - 1) {
      exponentializeValues();
    }
  }
  if (event.key === "+") {
    if (displayStrip.innerHTML.length < displayStripMaxLength - 1) {
      addValues();
    }
  }
  if (event.key === "-") {
    if (displayStrip.innerHTML.length < displayStripMaxLength - 1) {
      subtractValues();
    }
  }
  if (event.key === "*" || event.key === "x") {
    if (displayStrip.innerHTML.length < displayStripMaxLength - 1) {
      multiplyValues();
    }
  }
  if (event.key === "/") {
    if (displayStrip.innerHTML.length < displayStripMaxLength - 1) {
      divideValues();
    }
  }
  if (event.key === "m") {
    useMemoryButton();
  }
  if (event.key === "a") {
    pressAllClearButton();
  }
  if (event.key === "!") {
    if (displayStrip.innerHTML.length < displayStripMaxLength + 1) {
      invertValuePolarity();
    }
  }
});
