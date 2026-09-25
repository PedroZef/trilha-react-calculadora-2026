/**
 * Componente Principal App
 * Orquestra a interface e as interações da Calculadora NeoReact 2026.
 * Integração do Header, Display OLED, Grade de Teclas e Footer.
 *
 * Desenvolvido por: Pedro Zeferino da Silva (@2026)
 */

import { Header } from './components/Header';
import { Display } from './components/Display';
import { Button } from './components/Button';
import { Footer } from './components/Footer';
import { useCalculator } from './hooks/useCalculator';
import styles from './App.module.css';

export function App() {
    // Inicialização do hook contendo os estados e regras matemáticas
    const {
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
    } = useCalculator();

    return (
        <div className={styles.appContainer}>
            {/* Header moderno com logotipo e badge 2026 */}
            <Header />

            {/* Cartão principal da Calculadora com efeito Dark Glassmorphism */}
            <main className={styles.calculatorCard}>
                {/* Visor duplo estilo OLED (expressão anterior + valor atual) */}
                <Display value={displayValue} equation={equation} isError={hasError} />

                {/* Grade do Teclado Numérico e Operadores */}
                <div
                    className={styles.keypadGrid}
                    role="group"
                    aria-label="Teclado numérico e de operações">
                    {/* Linha 1: Limpeza (C), Apagar (⌫), Porcentagem (%) e Divisão (÷) */}
                    <Button
                        label="C"
                        onClick={handleClear}
                        variant="action"
                        ariaLabel="Limpar tudo"
                    />
                    <Button
                        label="⌫"
                        onClick={handleDelete}
                        variant="action"
                        ariaLabel="Apagar último dígito"
                    />
                    <Button
                        label="%"
                        onClick={handlePercentage}
                        variant="action"
                        ariaLabel="Porcentagem"
                    />
                    <Button
                        label="÷"
                        onClick={() => handleOperator('/')}
                        variant="operator"
                        ariaLabel="Dividir"
                    />

                    {/* Linha 2: Dígitos 7, 8, 9 e Multiplicação (×) */}
                    <Button label="7" onClick={() => handleDigit('7')} variant="default" />
                    <Button label="8" onClick={() => handleDigit('8')} variant="default" />
                    <Button label="9" onClick={() => handleDigit('9')} variant="default" />
                    <Button
                        label="×"
                        onClick={() => handleOperator('*')}
                        variant="operator"
                        ariaLabel="Multiplicar"
                    />

                    {/* Linha 3: Dígitos 4, 5, 6 e Subtração (−) */}
                    <Button label="4" onClick={() => handleDigit('4')} variant="default" />
                    <Button label="5" onClick={() => handleDigit('5')} variant="default" />
                    <Button label="6" onClick={() => handleDigit('6')} variant="default" />
                    <Button
                        label="−"
                        onClick={() => handleOperator('-')}
                        variant="operator"
                        ariaLabel="Subtrair"
                    />

                    {/* Linha 4: Dígitos 1, 2, 3 e Adição (+) */}
                    <Button label="1" onClick={() => handleDigit('1')} variant="default" />
                    <Button label="2" onClick={() => handleDigit('2')} variant="default" />
                    <Button label="3" onClick={() => handleDigit('3')} variant="default" />
                    <Button
                        label="+"
                        onClick={() => handleOperator('+')}
                        variant="operator"
                        ariaLabel="Somar"
                    />

                    {/* Linha 5: Dígito 0 com largura dupla, Ponto Decimal (.) e Resultado (=) */}
                    <Button
                        label="0"
                        onClick={() => handleDigit('0')}
                        variant="default"
                        span={2}
                        ariaLabel="Zero"
                    />
                    <Button
                        label="."
                        onClick={handleDecimal}
                        variant="default"
                        ariaLabel="Ponto decimal"
                    />
                    <Button
                        label="="
                        onClick={handleEquals}
                        variant="equals"
                        ariaLabel="Igual, calcular resultado"
                    />
                </div>
            </main>

            {/* Rodapé oficial com a assinatura @2026 - Pedro Zeferino da Silva */}
            <Footer />
        </div>
    );
}

export default App;
