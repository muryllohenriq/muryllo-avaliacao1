class Calculator {
    static buttons = document.querySelectorAll(".tecla");
    static display = document.getElementById("display") as HTMLSpanElement;
    static equalsButton = document.getElementById('igual') as HTMLSpanElement;

    static displayValue: string = "0";
    static prevOperand: string = "";
    static currentOperand: string = "";
    static operation: string = '';

    static updateDisplay = () => {
        this.display.textContent = this.displayValue;
    };

    static inputDisplay = (digit: string) => {
        if (this.displayValue.length >= 8) {
            return; // Limite máximo de 8 dígitos
        }

        if (this.displayValue === "0") this.displayValue = "";
        this.displayValue += digit;

        this.updateDisplay();
    };

    static appendNumber(number: string) {
        if (number === "mais" || number === "igual" || number === "ponto" || number === "menos" || number === "por" || number === "dividido" || number === "raiz" || number === "sign" || number === "on") {
            return;
        }

        this.currentOperand = this.currentOperand + number
    }

    static chooseOperation(operation: string) {
        if (operation === "mais" || operation === "menos" || operation === "por" || operation === "dividido" || operation === "raiz") {
            this.operation = operation
            this.prevOperand = this.currentOperand
            this.currentOperand = ""
        }
        
    }

    static compute() {
        let computation
        const prev = parseInt(this.prevOperand)
        const current = parseInt(this.currentOperand)
        switch (this.operation) {
            case 'mais':
                computation = prev + current
                break;
            case 'menos':
                computation = prev - current
                break;
            case 'por':
                computation = prev * current
                break;
            case 'dividido':
                    computation = prev / current
                    break;
            default:
                return
        }
        this.currentOperand = computation as unknown as string
        this.operation = undefined as unknown as string
        this.prevOperand = ''
        this.displayValue = this.currentOperand
    }

    static start = () => {
        this.buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const buttonText = button.getAttribute("id");

                this.inputDisplay(buttonText!);
                this.appendNumber(buttonText!);
                this.chooseOperation(buttonText!);
            });
        });

        this.equalsButton.addEventListener('click', button => {
            this.compute()
            this.updateDisplay()
        });

    };
}

Calculator.start();