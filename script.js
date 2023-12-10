const numberButtons = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const del = document.querySelector(".del");
const clear = document.querySelector(".clear");
const equal = document.querySelector(".equal");
const decimal = document.querySelector(".dot");
const currentNumber = document.querySelector(".currentNumber");
const previousNumber = document.querySelector(".previousNumber");

let currentNum = "";
let previousNum = "";
let operator = "";

window.addEventListener("keydown", keyPressing);

decimal.addEventListener("click", () => {
  addDecimal();
});

equal.addEventListener("click", () => {
  if (currentNum != "" && previousNum != "") {
    operate();
  }
});

del.addEventListener("click", erase);

clear.addEventListener("click", () => {
  currentNum = "";
  previousNum = "";
  operator = "";
  currentNumber.textContent = "0";
  previousNumber.textContent = "";
});

numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
  });
});

function erase() {
  currentNum = currentNum.slice(0, -1);
  currentNumber.textContent = currentNum;
}

function handleNumber(number) {
  if (previousNum != "" && currentNum != "" && operator === "") {
    previousNum = "";
    currentNumber.textContent = currentNum;
  }
  currentNum += number;
  currentNumber.textContent = currentNum;
}

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    handleOperator(e.target.textContent);
  });
});

function handleOperator(op) {
  if (previousNum === "") {
    previousNum = currentNum;
    checkOp(op);
  } else if (currentNum === "") {
    checkOp(op);
  } else {
    operate();
    operator = op;
    currentNumber.textContent = "0";
    previousNumber.textContent = previousNum + " " + operator;
  }
}

function checkOp(op) {
  operator = op;
  currentNumber.textContent = "0";
  previousNumber.textContent = previousNum + " " + operator;
  currentNum = "";
}

function roundedNumber(number) {
  return Math.round(number * 10000000000) / 10000000000;
}

function operate() {
  previousNum = +previousNum;
  currentNum = +currentNum;

  if (operator === "+") {
    previousNum = previousNum + currentNum;
  } else if (operator === "-") {
    previousNum = previousNum - currentNum;
  } else if (operator === "*") {
    previousNum = previousNum * currentNum;
  } else if (operator === "÷") {
    if (currentNum === 0) {
      previousNum = "You can't divide by zero";
      showresult();
      return;
    }
    previousNum = previousNum / currentNum;
  }
  previousNum = roundedNumber(previousNum);
  showresult();
}

function showresult() {
  previousNumber.textContent = previousNum;
  currentNumber.textContent = "0";
  currentNum = "";
  operator = "";
}

function addDecimal() {
  if (!currentNum.includes(".")) {
    currentNum = currentNum + ".";
    currentNumber.textContent = currentNum;
  }
}

function keyPressing(e) {
  e.preventDefault();
  if (e.key >= 0 && e.key <= 9) {
    handleNumber(e.key);
  }
  if (
    e.key === "Enter" ||
    (e.key === "=" && currentNum != "" && previousNum != "")
  ) {
    operate();
  }
  if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*") {
    handleOperator(e.key);
  }
  if (e.key === ".") {
    addDecimal();
  }
  if (e.key === "Backspace") {
    erase();
  }
}
