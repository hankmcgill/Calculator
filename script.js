///////////////////////////////////////////////////////////////
/////////////// CALCULATOR INITIAL VALUES /////////////////////
///////////////////////////////////////////////////////////////

let memoryValue = 0;
let firstInputValue = '';
let secondInputValue = '';
let operator = '';

let displayStrip = document.createElement('div');
displayStrip.innerHTML = 'OH, HELLO...';
document.getElementById('display').appendChild(displayStrip);

const allClear = document.getElementById('allClear');
const clearBtn = document.getElementById('clear');
const memory = document.getElementById('memory');
const changePositive = document.getElementById('changePositive');
const seven = document.getElementById('seven');
const eight = document.getElementById('eight');
const nine = document.getElementById('nine');
const divide = document.getElementById('divide');
const four = document.getElementById('four');
const five = document.getElementById('five');
const six = document.getElementById('six');
const multiply = document.getElementById('multiply');
const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const subtract = document.getElementById('subtract');
const zero = document.getElementById('zero');
const decimal = document.getElementById('decimal');
const exponent = document.getElementById('exponent');
const add = document.getElementById('add');
const enterButton = document.getElementById('enterButton');
let numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    numberAsInput(button.innerHTML);
  });
});

///////////////////////////////////////////////////////////////
//////// CHECK FOR ERROR TEXT OR OVERFLOW ONSCREEN  ///////////
///////////////////////////////////////////////////////////////

function checkForScreenText() {
  if (
    displayStrip.innerHTML === 'DECLINED' ||
    displayStrip.innerHTML === 'NaN' ||
    displayStrip.innerHTML === 'Infinity' ||
    displayStrip.innerHTML === 'OH, HELLO...'
  ) {
    clear();
  }
}

function roundDecimal(inputNumber) {
  if (Number.isInteger(inputNumber)) {
    return inputNumber;
  } else return Number(inputNumber.toFixed(5));
}

///////////////////////////////////////////////////////////////
/////////// CALCULATOR OPERATION FUNCTIONS ////////////////////
///////////////////////////////////////////////////////////////

function operate(firstInputValue, operator, secondInputValue) {
  const parsedNum1 = Number(firstInputValue);
  const parsedNum2 = Number(secondInputValue);

  if (operator === 'add') {
    calculatedResult = parsedNum1 + parsedNum2;
  }
  if (operator === 'subtract') {
    calculatedResult = parsedNum1 - parsedNum2;
  }
  if (operator === 'multiply') {
    calculatedResult = parsedNum1 * parsedNum2;
  }
  if (operator === 'exponent') {
    calculatedResult = parsedNum1 ** parsedNum2;
  }
  if (operator === 'divide') {
    if (parsedNum2 === 0) {
      calculatedResult = null;
    } else calculatedResult = parsedNum1 / parsedNum2;
  }
  return calculatedResult;
}

function divideValues() {
  selectOperator();
  operator = 'divide';
  displayStrip.innerHTML = `${displayStrip.innerHTML} / `;
}

function multiplyValues() {
  selectOperator();
  operator = 'multiply';
  displayStrip.innerHTML = `${displayStrip.innerHTML} X `;
}

function subtractValues() {
  selectOperator();
  operator = 'subtract';
  displayStrip.innerHTML = `${displayStrip.innerHTML} - `;
}

function addValues() {
  selectOperator();
  operator = 'add';
  displayStrip.innerHTML = `${displayStrip.innerHTML} + `;
}

function exponentializeValues() {
  selectOperator();
  operator = 'exponent';
  displayStrip.innerHTML = `${displayStrip.innerHTML} ^ `;
}

function invertValuePolarity() {
  checkForScreenText();
  changePositveNegative();
}

function changePositveNegative() {
  if (operator) {
    let modifiedValue = displayStrip.innerHTML.split(' ').pop() * -1;
    let modifiedBeginning = modifiedValue[1];
    // console.log(modifiedBeginning);
    console.log(modifiedValue);
    displayStrip.innerHTML = modifiedBeginning + modifiedValue;
  } else displayStrip.innerHTML = displayStrip.innerHTML * -1;
}

function clear() {
  displayStrip.innerHTML = '0';
  firstInputValue = '';
  secondInputValue = '';
  operator = '';
}

function pressAllClearButton() {
  memoryValue = 0;
  clear();
  displayStrip.innerHTML = 'OH, HELLO...';
}

function useMemoryButton() {
  checkForScreenText();
  if (displayStrip.innerHTML == 0) {
    displayStrip.innerHTML = Number(memoryValue);
  } else if (memoryValue != 0) {
    displayStrip.innerHTML += Number(memoryValue);
  } else memoryValue = Number(displayStrip.innerHTML);
}

function pressEnterButton() {
  secondInputValue = displayStrip.innerHTML.split(' ').pop();
  if (firstInputValue === '' || operator === '' || secondInputValue === '') {
    return;
  } else {
    const res = operate(firstInputValue, operator, secondInputValue);
    if (res === null) {
      displayStrip.innerHTML = 'DECLINED';
    } else {
      displayStrip.innerHTML = roundDecimal(res);
    }
  }
  firstInputValue = '';
  secondInputValue = '';
  operator = '';
}

function selectOperator() {
  checkForScreenText();
  if (operator) {
    secondInputValue = displayStrip.innerHTML.split(' ').pop();
    // determine whether or not you should only add operator to displayStrip
    // or if you should operate and add to displayStrip
    let newValue = operate(firstInputValue, operator, secondInputValue);
    // consider if newValue is 0
    if (newValue) {
      displayStrip.innerHTML = newValue;
    }
    firstInputValue = newValue;
  }
  firstInputValue = displayStrip.innerHTML;
}

///////////////////////////////////////////////////////////////
/////////////// GET NUMERICAL INPUT ///////////////////////////
///////////////////////////////////////////////////////////////

function numberAsInput(number) {
  checkForScreenText();
  if (displayStrip.innerHTML === '0') {
    displayStrip.innerHTML = number;
  } else displayStrip.innerHTML += number;
}

decimal.addEventListener('click', function () {
  getDecimal();
});

function getDecimal() {
  let tempSecondValue;
  checkForScreenText();
  if (operator) {
    tempSecondValue = displayStrip.innerHTML.split(' ').pop();
    if (!tempSecondValue) {
      displayStrip.innerHTML = displayStrip.innerHTML + '0.';
      return;
    }
    if (!tempSecondValue.includes('.')) {
      displayStrip.innerHTML = displayStrip.innerHTML + '.';
    }
  } else if (displayStrip.innerHTML === 0) {
    displayStrip.innerHTML = '0.';
  } else if (displayStrip.innerHTML.includes('.')) {
    return;
  } else {
    displayStrip.innerHTML += '.';
  }
}

///////////////////////////////////////////////////////////////
/////////////// GET OPERATOR INPUT ////////////////////////////
///////////////////////////////////////////////////////////////

clearBtn.addEventListener('click', function () {
  clear();
});
changePositive.addEventListener('click', function () {
  invertValuePolarity();
});
memory.addEventListener('click', function () {
  useMemoryButton();
});
divide.addEventListener('click', function () {
  divideValues();
});
multiply.addEventListener('click', function () {
  multiplyValues();
});
subtract.addEventListener('click', function () {
  subtractValues();
});
add.addEventListener('click', function () {
  addValues();
});
exponent.addEventListener('click', function () {
  exponentializeValues();
});
allClear.addEventListener('click', function () {
  pressAllClearButton();
});
enterButton.addEventListener('click', function () {
  pressEnterButton();
});

document.addEventListener('keydown', function (event) {
  if (Number(event.key)) {
    numberAsInput(Number(event.key));
  }
  if (event.key === '0') {
    numberAsInput(0);
  }
  if (event.key === '.') {
    getDecimal();
  }
  if (event.key === 'Enter' || event.key === '=') {
    pressEnterButton();
  }
  if (event.key === 'Backspace' || event.key === 'c') {
    clear();
  }
  if (event.key === '^') {
    exponentializeValues();
  }
  if (event.key === '+') {
    addValues();
  }
  if (event.key === '-') {
    subtractValues();
  }
  if (event.key === '*' || event.key === 'x') {
    multiplyValues();
  }
  if (event.key === '/') {
    divideValues();
  }
  if (event.key === 'm') {
    useMemoryButton();
  }
  if (event.key === 'a') {
    pressAllClearButton();
  }
  if (event.key === '!') {
    invertValuePolarity();
  }
});
