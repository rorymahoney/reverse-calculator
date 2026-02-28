let mode = 'build'; // Can be 'build', 'guess', or 'result'
let expression = '';
let actualAnswer = null;
let userGuess = '';

const topDisplay = document.getElementById('top-display');
const mainDisplay = document.getElementById('main-display');

function append(value) {
    // If a game just finished, reset before starting a new one
    if (mode === 'result') {
        clearCalc();
    }

    if (mode === 'build') {
        // Build the math problem
        expression += value;
        mainDisplay.innerText = expression;
    } else if (mode === 'guess') {
        // Build the user's guess (only allow numbers, decimals, and negative signs)
        if (!isNaN(value) || value === '.' || value === '-') {
            userGuess += value;
            mainDisplay.innerText = userGuess;
        }
    }
}

function backspace() {
    if (mode === 'build') {
        expression = expression.slice(0, -1);
        mainDisplay.innerText = expression;
    } else if (mode === 'guess') {
        userGuess = userGuess.slice(0, -1);
        mainDisplay.innerText = userGuess;
    }
}

function handleEquals() {
    if (mode === 'build') {
        if (expression === '') return;
        
        try {
            // Calculate the actual answer behind the scenes
            actualAnswer = eval(expression);
            
            // Switch to guessing mode
            mode = 'guess';
            topDisplay.innerText = expression + ' = ?';
            mainDisplay.innerText = '';
            
            // Minor visual cue
            mainDisplay.style.borderBottom = "2px solid #ff9f0a"; 
        } catch (error) {
            mainDisplay.innerText = "Error";
            setTimeout(clearCalc, 1500);
        }
    } else if (mode === 'guess') {
        if (userGuess === '') return;
        
        // Switch to result mode to evaluate
        mode = 'result';
        topDisplay.innerText = expression + ' = ' + actualAnswer;
        mainDisplay.style.borderBottom = "none";
        
        // Compare their guess to the actual answer
        if (parseFloat(userGuess) === actualAnswer) {
            mainDisplay.innerText = "Correct! ✅";
            mainDisplay.style.color = "#32d74b"; // Green
        } else {
            mainDisplay.innerText = "Wrong! ❌";
            mainDisplay.style.color = "#ff453a"; // Red
        }
    }
}

function clearCalc() {
    mode = 'build';
    expression = '';
    userGuess = '';
    actualAnswer = null;
    
    topDisplay.innerText = 'Build a problem';
    mainDisplay.innerText = '';
    mainDisplay.style.color = 'white';
    mainDisplay.style.borderBottom = "none";
}
