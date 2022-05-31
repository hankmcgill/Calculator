///////////////////////////////////////////////////////////////
/////////////// CALCULATOR STYLE //////////////////////////////
///////////////////////////////////////////////////////////////
let memoryValue = 0;
let calcDisplay = "0";

let firstInputValue;
let secondInputValue;
let operator;

allClear.addEventListener("click", function () {
  displayStrip.innerHTML = "0";
  memoryValue = 0;
});

let displayStrip = document.createElement("div");
displayStrip.innerHTML = `${calcDisplay}`;
document.getElementById("display").appendChild(displayStrip);

///////////////////////////////////////////////////////////////
/////////////// CALCULATOR FUNCTIONS //////////////////////////
///////////////////////////////////////////////////////////////

function operate(firstInputValue, operator, secondInputValue) {
  if (operator === "add") {
    calcDisplay = firstInputValue + secondInputValue;
  }
  if (operator === "subtract") {
    calcDisplay = firstInputValue - secondInputValue;
  }
  if (operator === "multiply") {
    calcDisplay = firstInputValue * secondInputValue;
  }
  if (operator === "exponent") {
    calcDisplay = firstInputValue ** secondInputValue;
  }
  if (operator === "divide") {
    if (secondInputValue === 0) {
      calcDisplay = "DECLINED";
    } else calcDisplay = firstInputValue / secondInputValue;
  }
  return calcDisplay;
}

///////////////////////////////////////////////////////////////
/////////////// GET NUMERICAL INPUT ///////////////////////////
///////////////////////////////////////////////////////////////

one.addEventListener("click", function () {
  if (displayStrip.innerHTML === "0") {
    displayStrip.innerHTML = 1;
  } else displayStrip.innerHTML += 1;
});
two.addEventListener("click", function () {
  if (displayStrip.innerHTML === "0") {
    displayStrip.innerHTML = 2;
  } else displayStrip.innerHTML += 2;
});
three.addEventListener("click", function () {
  if (displayStrip.innerHTML === "0") {
    displayStrip.innerHTML = 3;
  } else displayStrip.innerHTML += 3;
});
four.addEventListener("click", function () {
  if (displayStrip.innerHTML === "0") {
    displayStrip.innerHTML = 4;
  } else displayStrip.innerHTML += 4;
});
five.addEventListener("click", function () {
  if (displayStrip.innerHTML === "0") {
    displayStrip.innerHTML = 5;
  } else displayStrip.innerHTML += 5;
});
six.addEventListener("click", function () {
  if (displayStrip.innerHTML === "0") {
    displayStrip.innerHTML = 6;
  } else displayStrip.innerHTML += 6;
});
seven.addEventListener("click", function () {
  if (displayStrip.innerHTML === "0") {
    displayStrip.innerHTML = 7;
  } else displayStrip.innerHTML += 7;
});
eight.addEventListener("click", function () {
  if (displayStrip.innerHTML === "0") {
    displayStrip.innerHTML = 8;
  } else displayStrip.innerHTML += 8;
});
nine.addEventListener("click", function () {
  if (displayStrip.innerHTML === "0") {
    displayStrip.innerHTML = 9;
  } else displayStrip.innerHTML += 9;
});
zero.addEventListener("click", function () {
  if (displayStrip.innerHTML === "0") {
    displayStrip.innerHTML = 0;
  } else displayStrip.innerHTML += 0;
});
decimal.addEventListener("click", function () {
  if (displayStrip.innerHTML.includes(".")) {
    displayStrip.innerHTML = "DECLINED";
  } else if (displayStrip.innerHTML === 0) {
    displayStrip.innerHTML = "0.";
  } else displayStrip.innerHTML += ".";
});

///////////////////////////////////////////////////////////////
/////////////// GET OPERATOR INPUT ////////////////////////////
///////////////////////////////////////////////////////////////

clear.addEventListener("click", function () {
  // if (displayStrip.innerHTML == 0) {  // USE FOR BACKSPACE BUTTON //
  displayStrip.innerHTML = 0;
  // } else displayStrip.innerHTML = displayStrip.innerHTML.slice(0, -1);//for backspace//
});

changePositive.addEventListener("click", function () {
  displayStrip.innerHTML = displayStrip.innerHTML * -1;
});

memory.addEventListener("click", function () {
  if (memoryValue !== 0) {
    displayStrip.innerHTML += memoryValue;
  } else memoryValue = displayStrip.innerHTML;
});

divide.addEventListener("click", function () {
  operator = "divide";
  firstInputValue = parseInt(displayStrip.innerHTML);
  displayStrip.innerHTML = `${displayStrip.innerHTML} / `;
});

multiply.addEventListener("click", function () {
  operator = "multiply";
  firstInputValue = parseInt(displayStrip.innerHTML);
  displayStrip.innerHTML = `${displayStrip.innerHTML} X `;
});

subtract.addEventListener("click", function () {
  operator = "subtract";
  firstInputValue = parseInt(displayStrip.innerHTML);
  displayStrip.innerHTML = `${displayStrip.innerHTML} - `;
});

add.addEventListener("click", function () {
  operator = "add";
  firstInputValue = parseInt(displayStrip.innerHTML);
  displayStrip.innerHTML = `${displayStrip.innerHTML} + `;
});

exponent.addEventListener("click", function () {
  operator = "exponent";
  firstInputValue = parseInt(displayStrip.innerHTML);
  displayStrip.innerHTML = `${displayStrip.innerHTML} ^ `;
});

enterButton.addEventListener("click", function () {
  secondInputValueString = displayStrip.innerHTML.split(" ").pop();
  secondInputValue = parseInt(secondInputValueString);
  if (firstInputValue === undefined || operator === undefined) {
    displayStrip.innerHTML = "DECLINED";
  } else displayStrip.innerHTML = operate(firstInputValue, operator, secondInputValue);
});
