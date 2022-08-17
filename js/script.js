const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if ( waitingForSecondOperand === true ) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else{
        if( displayValue === '0' ) {
            calculator.displayValue = digit;
            
        }else {
            calculator.displayValue = calculator.displayValue + digit;
        }
    }
}

function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = '0.'
        calculator.waitingForSecondOperand = false;
        return;
    }

    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(calculator.displayValue);
    
    if (calculator.operator && calculator.waitingForSecondOperand)  {
        calculator.operator = nextOperator;
        return;
    }
  
    if (calculator.firstOperand == null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (calculator.operator) {
        const result = calculate(calculator.firstOperand, inputValue, calculator.operator);
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }
  
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}  

function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    }else{
        return secondOperand;
    }
}

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}

function updateDisplay() {
    const display = document.querySelector(".js-calculator-display");
    display.value = calculator.displayValue;
    display.textContent = display.value;
}

updateDisplay();

const keys = document.querySelector('.js-calculator-keys');
keys.addEventListener('click', (e) => {
    const targetBtn = e.target;

    if (!targetBtn.matches('button')) {
        return;
    }

    if (targetBtn.classList.contains('operator')) {
        handleOperator(targetBtn.value);
        updateDisplay();
        return;
    }

    if (targetBtn.classList.contains('decimal')) {
        inputDecimal(targetBtn.value);
        updateDisplay();
        return;
    }

    if (targetBtn.classList.contains('all-clear')) {
        resetCalculator();
        updateDisplay();
        return;
    }

    inputDigit(targetBtn.value);
    updateDisplay();
});