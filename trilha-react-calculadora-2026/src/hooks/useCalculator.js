import { useState, useEffect, useCallback } from 'react';

const OPERATOR_SYMBOLS = {
  '+': '+',
  '-': '−',
  '*': '×',
  '/': '÷',
};

function formatMathResult(val) {
  if (!Number.isFinite(val)) {
    return 'Não é possível dividir por 0';
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

  // Inserir dígito (0-9)
  const handleDigit = useCallback((digit) => {
    setDisplayValue((prev) => {
      // Se tiver erro ou precisando de novo número, substitui
      if (prev.includes('Não é possível') || prev.includes('Erro') || isWaitingNewValue) {
        setIsWaitingNewValue(false);
        return digit;
      }
      if (prev === '0') {
        return digit;
      }
      // Limite de segurança de caracteres para não estourar o display
      if (prev.length >= 13) {
        return prev;
      }
      return prev + digit;
    });
  }, [isWaitingNewValue]);

  // Inserir ponto decimal (.)
  const handleDecimal = useCallback(() => {
    setDisplayValue((prev) => {
      if (prev.includes('Não é possível') || prev.includes('Erro') || isWaitingNewValue) {
        setIsWaitingNewValue(false);
        return '0.';
      }
      if (!prev.includes('.')) {
        return prev + '.';
      }
      return prev;
    });
  }, [isWaitingNewValue]);

  // Limpar tudo (C)
  const handleClear = useCallback(() => {
    setDisplayValue('0');
    setPreviousValue(null);
    setOperation(null);
    setEquation('');
    setIsWaitingNewValue(false);
  }, []);

  // Apagar último dígito (Backspace)
  const handleDelete = useCallback(() => {
    setDisplayValue((prev) => {
      if (prev.includes('Não é possível') || prev.includes('Erro') || isWaitingNewValue) {
        return '0';
      }
      if (prev.length <= 1) {
        return '0';
      }
      return prev.slice(0, -1);
    });
  }, [isWaitingNewValue]);

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
          return 'Não é possível dividir por 0';
        }
        return formatMathResult(a / b);
      default:
        return num2;
    }
  }, []);

  // Selecionar operador (+, -, *, /)
  const handleOperator = useCallback((nextOp) => {
    const symbol = OPERATOR_SYMBOLS[nextOp] || nextOp;

    // Se estiver em estado de erro, reinicia
    if (displayValue.includes('Não é possível') || displayValue.includes('Erro')) {
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
    } else {
      setPreviousValue(displayValue);
      setEquation(`${displayValue} ${symbol}`);
    }

    setOperation(nextOp);
    setIsWaitingNewValue(true);
  }, [displayValue, operation, isWaitingNewValue, previousValue, compute]);

  // Porcentagem (%)
  const handlePercentage = useCallback(() => {
    if (displayValue.includes('Não é possível') || displayValue.includes('Erro')) {
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
  }, [displayValue, previousValue, operation]);

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
  }, [handleDigit, handleDecimal, handleOperator, handleEquals, handleDelete, handleClear, handlePercentage]);

  return {
    displayValue,
    equation,
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
