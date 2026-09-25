import { useState, useEffect, useCallback } from 'react';

const OPERATOR_SYMBOLS = {
    '+': '+',
    '-': '−',
    '*': '×',
    '/': '÷',
};

const DIVISION_BY_ZERO_MESSAGE = 'Não é possível dividir por 0';
const MAX_DISPLAY_LENGTH = 13;

function formatMathResult(val) {
    if (!Number.isFinite(val)) {
        return DIVISION_BY_ZERO_MESSAGE;
    }
    // Corrige imprecisões de ponto flutuante em JS (ex: 0.1 + 0.2)
    const rounded = parseFloat(Number(val.toFixed(10)).toString());
    return String(rounded);
}

export function useCalculator() {
    const [displayValue, setDisplayValue] = useState('0');
    const [previousValue, setPreviousValue] = useState(null);
    const [operation, setOperation] = useState(null);
    const [equation, setEquation] = useState('');
    const [isWaitingNewValue, setIsWaitingNewValue] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Inserir dígito (0-9)
    const handleDigit = useCallback(
        (digit) => {
            if (hasError) {
                setDisplayValue(digit);
                setHasError(false);
                setIsWaitingNewValue(false);
                return;
            }
            if (isWaitingNewValue) {
                setDisplayValue(digit);
                setIsWaitingNewValue(false);
                return;
            }
            setDisplayValue((prev) => {
                if (prev === '0') {
                    return digit;
                }
                // Limite de segurança de caracteres para não estourar o display
                if (prev.length >= MAX_DISPLAY_LENGTH) {
                    return prev;
                }
                return prev + digit;
            });
        },
        [hasError, isWaitingNewValue],
    );

    // Inserir ponto decimal (.)
    const handleDecimal = useCallback(() => {
        if (hasError) {
            setDisplayValue('0.');
            setHasError(false);
            setIsWaitingNewValue(false);
            return;
        }
        if (isWaitingNewValue) {
            setDisplayValue('0.');
            setIsWaitingNewValue(false);
            return;
        }
        setDisplayValue((prev) => (prev.includes('.') ? prev : `${prev}.`));
    }, [hasError, isWaitingNewValue]);

    // Limpar tudo (C)
    const handleClear = useCallback(() => {
        setDisplayValue('0');
        setPreviousValue(null);
        setOperation(null);
        setEquation('');
        setIsWaitingNewValue(false);
        setHasError(false);
    }, []);

    // Apagar último dígito (Backspace)
    const handleDelete = useCallback(() => {
        if (hasError) {
            setDisplayValue('0');
            setHasError(false);
            setIsWaitingNewValue(false);
            return;
        }
        if (isWaitingNewValue) {
            setDisplayValue('0');
            return;
        }
        setDisplayValue((prev) => (prev.length <= 1 ? '0' : prev.slice(0, -1)));
    }, [hasError, isWaitingNewValue]);

    // Função interna de cálculo entre dois números
    const compute = useCallback((num1, num2, op) => {
        const a = parseFloat(num1);
        const b = parseFloat(num2);
        if (Number.isNaN(a) || Number.isNaN(b)) return num2;

        switch (op) {
            case '+':
                return formatMathResult(a + b);
            case '-':
                return formatMathResult(a - b);
            case '*':
                return formatMathResult(a * b);
            case '/':
                if (b === 0) {
                    return DIVISION_BY_ZERO_MESSAGE;
                }
                return formatMathResult(a / b);
            default:
                return num2;
        }
    }, []);

    // Selecionar operador (+, -, *, /)
    const handleOperator = useCallback(
        (nextOp) => {
            const symbol = OPERATOR_SYMBOLS[nextOp] || nextOp;

            // Se estiver em estado de erro, reinicia
            if (hasError) {
                return;
            }

            // Se o usuário trocou de operador logo após clicar no anterior
            if (operation && isWaitingNewValue) {
                setOperation(nextOp);
                setEquation(`${previousValue} ${symbol}`);
                return;
            }

            // Se já havia uma operação pendente e agora foi digitado um novo número
            if (previousValue !== null && operation) {
                const result = compute(previousValue, displayValue, operation);
                setPreviousValue(result);
                setDisplayValue(result);
                setEquation(`${result} ${symbol}`);
                setHasError(result === DIVISION_BY_ZERO_MESSAGE);
            } else {
                setPreviousValue(displayValue);
                setEquation(`${displayValue} ${symbol}`);
            }

            setOperation(nextOp);
            setIsWaitingNewValue(true);
        },
        [displayValue, operation, isWaitingNewValue, previousValue, hasError, compute],
    );

    // Porcentagem (%)
    const handlePercentage = useCallback(() => {
        if (hasError) {
            return;
        }

        const current = parseFloat(displayValue);
        if (Number.isNaN(current)) return;

        if (previousValue !== null && (operation === '+' || operation === '-')) {
            // Ex: 200 + 10% => 10% de 200 = 20
            const base = parseFloat(previousValue);
            const percentVal = (base * current) / 100;
            setDisplayValue(formatMathResult(percentVal));
        } else {
            // Ex: 50% => 0.5
            setDisplayValue(formatMathResult(current / 100));
        }
    }, [displayValue, previousValue, operation, hasError]);

    // Executar resultado final (=)
    const handleEquals = useCallback(() => {
        if (operation === null || previousValue === null) {
            return;
        }

        const symbol = OPERATOR_SYMBOLS[operation] || operation;
        const result = compute(previousValue, displayValue, operation);

        setEquation(`${previousValue} ${symbol} ${displayValue} =`);
        setDisplayValue(result);
        setPreviousValue(null);
        setOperation(null);
        setIsWaitingNewValue(true);
        setHasError(result === DIVISION_BY_ZERO_MESSAGE);
    }, [operation, previousValue, displayValue, compute]);

    // Listener para teclado físico
    useEffect(() => {
        const handleKeyDown = (event) => {
            const { key } = event;

            if (/^[0-9]$/.test(key)) {
                event.preventDefault();
                handleDigit(key);
            } else if (key === '.' || key === ',') {
                event.preventDefault();
                handleDecimal();
            } else if (key === '+' || key === '-' || key === '*' || key === '/') {
                event.preventDefault();
                handleOperator(key);
            } else if (key === 'Enter' || key === '=') {
                event.preventDefault();
                handleEquals();
            } else if (key === 'Backspace') {
                event.preventDefault();
                handleDelete();
            } else if (key === 'Escape' || key.toLowerCase() === 'c') {
                event.preventDefault();
                handleClear();
            } else if (key === '%') {
                event.preventDefault();
                handlePercentage();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [
        handleDigit,
        handleDecimal,
        handleOperator,
        handleEquals,
        handleDelete,
        handleClear,
        handlePercentage,
    ]);

    return {
        displayValue,
        equation,
        hasError,
        handleDigit,
        handleOperator,
        handleDecimal,
        handleClear,
        handleDelete,
        handlePercentage,
        handleEquals,
    };
}

export default useCalculator;
