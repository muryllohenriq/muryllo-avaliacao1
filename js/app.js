var Calculator = /** @class */ (function () {
    function Calculator() {
    }
    Calculator.appendNumber = function (number) {
        if (number === "mais" || number === "igual" || number === "ponto" || number === "menos" || number === "por" || number === "dividido" || number === "raiz" || number === "sign" || number === "on") {
            return;
        }
        this.currentOperand = this.currentOperand + number;
    };
    Calculator.chooseOperation = function (operation) {
        if (operation === "mais" || operation === "menos" || operation === "por" || operation === "dividido" || operation === "raiz") {
            this.operation = operation;
            this.prevOperand = this.currentOperand;
            this.currentOperand = "";
        }
    };
    Calculator.compute = function () {
        var computation;
        var prev = parseInt(this.prevOperand);
        var current = parseInt(this.currentOperand);
        switch (this.operation) {
            case 'mais':
                computation = prev + current;
                break;
            case 'menos':
                computation = prev - current;
                break;
            case 'por':
                computation = prev * current;
                break;
            case 'dividido':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.prevOperand = '';
        this.displayValue = this.currentOperand;
    };
    var _a;
    _a = Calculator;
    Calculator.buttons = document.querySelectorAll(".tecla");
    Calculator.display = document.getElementById("display");
    Calculator.equalsButton = document.getElementById('igual');
    Calculator.displayValue = "0";
    Calculator.prevOperand = "";
    Calculator.currentOperand = "";
    Calculator.operation = '';
    Calculator.updateDisplay = function () {
        _a.display.textContent = _a.displayValue;
    };
    Calculator.inputDisplay = function (digit) {
        if (_a.displayValue.length >= 8) {
            return; // Limite máximo de 8 dígitos
        }
        if (_a.displayValue === "0")
            _a.displayValue = "";
        _a.displayValue += digit;
        _a.updateDisplay();
    };
    Calculator.start = function () {
        _a.buttons.forEach(function (button) {
            button.addEventListener("click", function () {
                var buttonText = button.getAttribute("id");
                _a.inputDisplay(buttonText);
                _a.appendNumber(buttonText);
                _a.chooseOperation(buttonText);
            });
        });
        _a.equalsButton.addEventListener('click', function (button) {
            _a.compute();
            _a.updateDisplay();
        });
    };
    return Calculator;
}());
Calculator.start();
