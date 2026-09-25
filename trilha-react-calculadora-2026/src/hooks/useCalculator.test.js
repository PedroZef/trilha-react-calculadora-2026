import { describe, it, expect } from 'vitest';
import { renderHook, act, fireEvent } from '@testing-library/react';
import { useCalculator } from './useCalculator';

const ERROR_MESSAGE = 'Não é possível dividir por 0';

const renderCalculator = () => renderHook(() => useCalculator());

/**
 * Simula uma sequência de teclas da calculadora.
 * Tokens: dígitos ("0"-"9"), ".", "+", "-", "*", "/", "=", "%", "C" (clear), "⌫" (delete)
 */
const press = (hook, tokens) => {
    tokens.forEach((token) => {
        act(() => {
            const h = hook.result.current;
            if (/^\d$/.test(token)) {
                h.handleDigit(token);
            } else if (token === '.') {
                h.handleDecimal();
            } else if (token === '=') {
                h.handleEquals();
            } else if (token === '%') {
                h.handlePercentage();
            } else if (token === 'C') {
                h.handleClear();
            } else if (token === '⌫') {
                h.handleDelete();
            } else {
                h.handleOperator(token);
            }
        });
    });
};

describe('useCalculator', () => {
    it('inicia com display zerado e sem erro', () => {
        const { result } = renderCalculator();
        expect(result.current.displayValue).toBe('0');
        expect(result.current.equation).toBe('');
        expect(result.current.hasError).toBe(false);
    });

    it('insere dígitos ignorando zero à esquerda', () => {
        const hook = renderCalculator();
        press(hook, ['0', '0', '5']);
        expect(hook.result.current.displayValue).toBe('5');
    });

    it('permite apenas um ponto decimal por número', () => {
        const hook = renderCalculator();
        press(hook, ['1', '.', '2', '.', '3']);
        expect(hook.result.current.displayValue).toBe('1.23');
    });

    it('limita o display a 13 caracteres', () => {
        const hook = renderCalculator();
        press(hook, ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '1', '2', '3', '4', '5']);
        expect(hook.result.current.displayValue).toBe('1234567890123');
    });

    it('resolve soma com igual', () => {
        const hook = renderCalculator();
        press(hook, ['1', '5', '+', '2', '5', '=']);
        expect(hook.result.current.displayValue).toBe('40');
        expect(hook.result.current.equation).toBe('15 + 25 =');
    });

    it('resolve subtração com resultado negativo', () => {
        const hook = renderCalculator();
        press(hook, ['1', '-', '4', '=']);
        expect(hook.result.current.displayValue).toBe('-3');
    });

    it('resolve multiplicação', () => {
        const hook = renderCalculator();
        press(hook, ['6', '*', '7', '=']);
        expect(hook.result.current.displayValue).toBe('42');
    });

    it('resolve divisão', () => {
        const hook = renderCalculator();
        press(hook, ['8', '/', '2', '=']);
        expect(hook.result.current.displayValue).toBe('4');
    });

    it('trata divisão por zero com flag de erro', () => {
        const hook = renderCalculator();
        press(hook, ['5', '/', '0', '=']);
        expect(hook.result.current.displayValue).toBe(ERROR_MESSAGE);
        expect(hook.result.current.hasError).toBe(true);
    });

    it('limpa o estado de erro ao inserir um novo dígito', () => {
        const hook = renderCalculator();
        press(hook, ['5', '/', '0', '=', '7']);
        expect(hook.result.current.displayValue).toBe('7');
        expect(hook.result.current.hasError).toBe(false);
    });

    it('impede operação após erro até limpar', () => {
        const hook = renderCalculator();
        press(hook, ['5', '/', '0', '=', '+']);
        expect(hook.result.current.hasError).toBe(true);
        expect(hook.result.current.displayValue).toBe(ERROR_MESSAGE);
        press(hook, ['C']);
        expect(hook.result.current.hasError).toBe(false);
        expect(hook.result.current.displayValue).toBe('0');
    });

    it('corrige imprecisão de ponto flutuante (0.1 + 0.2)', () => {
        const hook = renderCalculator();
        press(hook, ['0', '.', '1', '+', '0', '.', '2', '=']);
        expect(hook.result.current.displayValue).toBe('0.3');
    });

    it('calcula parciais ao encadear operadores', () => {
        const hook = renderCalculator();
        press(hook, ['2', '+', '3', '*']);
        expect(hook.result.current.displayValue).toBe('5');
        expect(hook.result.current.equation).toBe('5 ×');
        press(hook, ['4', '=']);
        expect(hook.result.current.displayValue).toBe('20');
    });

    it('permite trocar o operador antes de digitar o próximo número', () => {
        const hook = renderCalculator();
        press(hook, ['8', '+', '*']);
        expect(hook.result.current.equation).toBe('8 ×');
        press(hook, ['2', '=']);
        expect(hook.result.current.displayValue).toBe('16');
    });

    it('calcula porcentual contextual em operações de soma', () => {
        const hook = renderCalculator();
        press(hook, ['2', '0', '0', '+', '1', '0', '%']);
        expect(hook.result.current.displayValue).toBe('20');
    });

    it('calcula porcentual isolado', () => {
        const hook = renderCalculator();
        press(hook, ['5', '0', '%']);
        expect(hook.result.current.displayValue).toBe('0.5');
    });

    it('apaga o último dígito com backspace', () => {
        const hook = renderCalculator();
        press(hook, ['1', '2', '3', '⌫']);
        expect(hook.result.current.displayValue).toBe('12');
        press(hook, ['⌫', '⌫']);
        expect(hook.result.current.displayValue).toBe('0');
    });

    it('limpa todo o estado com clear', () => {
        const hook = renderCalculator();
        press(hook, ['1', '5', '+', '2', '5', 'C']);
        expect(hook.result.current.displayValue).toBe('0');
        expect(hook.result.current.equation).toBe('');
        expect(hook.result.current.hasError).toBe(false);
    });

    it('responde ao teclado físico (dígitos, operadores e Escape)', () => {
        const { result } = renderCalculator();

        act(() => fireEvent.keyDown(window, { key: '7' }));
        act(() => fireEvent.keyDown(window, { key: '+' }));
        act(() => fireEvent.keyDown(window, { key: '3' }));
        act(() => fireEvent.keyDown(window, { key: 'Enter' }));
        expect(result.current.displayValue).toBe('10');
        expect(result.current.equation).toBe('7 + 3 =');

        act(() => fireEvent.keyDown(window, { key: 'Escape' }));
        expect(result.current.displayValue).toBe('0');
        expect(result.current.equation).toBe('');
    });

    it('aceita vírgula como ponto decimal no teclado', () => {
        const { result } = renderCalculator();
        act(() => fireEvent.keyDown(window, { key: '1' }));
        act(() => fireEvent.keyDown(window, { key: ',' }));
        act(() => fireEvent.keyDown(window, { key: '5' }));
        expect(result.current.displayValue).toBe('1.5');
    });
});
