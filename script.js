document.addEventListener("DOMContentLoaded", function () {
    const display = this.getElementById("display");
    const buttons = this.getElementById("buttons");
    let currentInput = "";
    let firstOperand = null;
    let operator = null;
    let awaitingNextInput = false;

    buttons, this.addEventListener("click", function (event) {
        // Get the value of the clicked button
        const value = event.target.innerText;
        console.log(value)

        if (value >= "0" && value <= "9") {
            // Handle number input
            if (awaitingNextInput) {
                currentInput = value;
                awaitingNextInput = false;
            } else {
                currentInput += value;
            }
            display.innerText = currentInput;

        } else if (value === ".") {
            // Handle decimal input
            if (!currentInput.includes(".")) {
                currentInput += ".";
                display.innerText = currentInput;
            }
        }
        else if (["+", "-", "*", "/", "%", ".", "X²"].includes(value)) {
            // Handle Operations
            operator = value;
            firstOperand = currentInput;
            console.log(firstOperand)
            awaitingNextInput = true;
        } else if (value === "AC") {
            // Handle Clear All button
            currentInput = "";
            firstOperand = null;
            operator = null;
            display.innerText = "0";
        } else if (value === "=") {
            // Handle Equal button
            currentInput = evaluate(firstOperand, currentInput, operator);
            display.innerText = currentInput.toFixed(0);
            operator = null;
        }
    });

    function evaluate(prev, current, operator) {
        // Perform calculation
        const a = parseFloat(prev);
        const b = parseFloat(current);

        switch (operator) {
            case "+": return a + b;
            case "-": return a - b;
            case "*": return a * b;
            case "/": return a / b;
            case "%": return a % b;
            case ".": return a + b / 100;
            case "X²": return Math.pow(a, 2);
            default: return current;
        }
    }
})