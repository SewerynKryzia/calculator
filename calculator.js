const allBtns = document.querySelectorAll('div.calc-container div');
const allBtnsArr = [...allBtns];
let showResult = allBtnsArr[0];
let firstNumber = '';
let secondNumber = '';
let operator = '';
let clearPanel = false;
let resetAll = false;
let manyTimeEquals = false;
const maxDigits = 20;
const startSmallDigits = 10;

const calculator = e => {
    const value = e.target.textContent;

    if (value === '+' || value === '-') {
        setOperator(value)
    }
    else if (value === '÷') {
        setOperator("/")
    }
    else if (value === 'X') {
        setOperator("*")
    }
    else if (value === 'AC') {
        showZero();
        resetNumbers();
    }
    else if (value === '=') {
        doCalculation();
    }
    else if (value === '%') {
        if (showResult.textContent !== '-') {
            showResult.textContent /= 100;
        }
    }
    else if (value === '+/-') {
        changeSign();
        clearPanel = false;
    }
    else if (value === '.') {
        if (!showResult.textContent.includes('.')) {
            showResult.textContent += value;
        }
        clearPanel = false;
    }
    else {
        if (showResult.textContent === '0') {
            showNothing();
        }
        if (clearPanel) {
            showNothing();
            clearPanel = !clearPanel;
        }
        if (resetAll) {
            resetNumbers();
        }
        if (showResult.textContent.length <= maxDigits) {
            showResult.textContent += value;
        }
        manyTimeEquals = false;
    }

    if (showResult.textContent.length > startSmallDigits) {
        showResult.style.fontSize = "3vh";
    } else {
        showResult.style.fontSize = "6vh";
    }

    if (showResult.textContent === "Infinity" || showResult.textContent === '-Infinity' || showResult.textContent === 'NaN') {
        showResult.textContent = 'Error';
    }
}

const setOperator = value => {
    operator = value;
    setFirstNumber();
    clearPanel = true;
    resetAll = false;
}

const showZero = () => {
    showResult.textContent = '0'
}

const showNothing = () => {
    showResult.textContent = ''
}

const setFirstNumber = () => {
    firstNumber = showResult.textContent;
}

const resetNumbers = () => {
    firstNumber = '';
    secondNumber = '';
}

const doCalculation = () => {
    if (firstNumber !== '') {
        if (!manyTimeEquals) { secondNumber = showResult.textContent; }
        showResult.textContent = eval(firstNumber + operator + secondNumber);
        setFirstNumber();
        clearPanel = true;
        resetAll = true;
        manyTimeEquals = true;
    }
}

const changeSign = () => {
    if (showResult.textContent * 1 > 0) {
        showResult.textContent = `-${showResult.textContent}`;
    } else if (showResult.textContent * 1 < 0) {
        showResult.textContent = Math.abs(showResult.textContent);
    }
}

for (let i = 1; i < allBtnsArr.length; i++) {
    allBtnsArr[i].addEventListener('click', calculator);
}