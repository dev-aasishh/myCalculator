const clearB=document.getElementById('clear');
const delB=document.getElementById('delete');
const divideB=document.getElementById('divide');
const mulB=document.getElementById('multiply');
const minusB=document.getElementById('minus');
const addB=document.getElementById('add');
const decimalB=document.getElementById('decimal');
const equalB=document.getElementById('equal');

const numButtons=document.querySelectorAll('.number');
const resultElement=document.getElementById('result');

//Initialize the variables
let result='';
let operation=''; //for operator value
let previousOperand=0;


//Function to append Number:
const appendNumber=(number)=>{
    if(number === '.' && result.includes('.')) return;
    result+=number;
    updateDisplay();
}

//function to update display
const updateDisplay =() => {
    if(operation){
        resultElement.innerText = `${previousOperand} ${operation} ${result}`;
    }
    else
        resultElement.innerText=result;
}
//function to select operator
const selectOperator = (operatorValue) => {
    if(result==='') return;

    if(operation !== '' && previousOperand !== ''){
        calculateResult();
    }
    operation=operatorValue;
    previousOperand=result;
    result='';
    updateDisplay();
}

//function to calculate result
const calculateResult=() => {
    let evaluatedResult;
    const prev = parseFloat(previousOperand);
    const current=parseFloat(result);

    if(isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            evaluatedResult = prev + current;
            break;
        case '-':
            evaluatedResult = prev - current;
            break;
        case '×':
            evaluatedResult = prev * current;
            break;
        case '÷':
            evaluatedResult = prev / current;
            break;
    
        default:
            return;
    }
    result=evaluatedResult.toString();
    operation='';
    previousOperand='';
}

//Adding event listener to number buttons
numButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        appendNumber(button.innerText);
    });
});

//Function to clear Display
const clearDisplay = () => {
    result='';
    previousOperand='';
    operation='';
    updateDisplay();
}
//function to delete last character from display
const deleteLastDigit = () => {
    if(result === '' && operation!==''){
        operation='';
        result=previousOperand;
        previousOperand='';
        updateDisplay();
    }else{
        result=result.slice(0,-1);
        updateDisplay();
    }
}

decimalB.addEventListener('click',() => appendNumber('.'))
addB.addEventListener('click', () => selectOperator('+'));
minusB.addEventListener('click', () => selectOperator('-'));
mulB.addEventListener('click', () => selectOperator('×'));
divideB.addEventListener('click', () => selectOperator('÷'));
equalB.addEventListener('click', () =>{
    if(result==='') return;
    calculateResult();
    updateDisplay();
});
clearB.addEventListener('click', clearDisplay);
delB.addEventListener('click',deleteLastDigit);