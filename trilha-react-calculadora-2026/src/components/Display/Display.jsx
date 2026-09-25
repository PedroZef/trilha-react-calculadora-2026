import styles from './Display.module.css';

/**
 * Componente Display
 * Visor duplo estilo OLED para a Calculadora React 2026.
 *
 * @param {string} value - Valor principal numérico ou mensagem de erro a ser exibido.
 * @param {string} equation - Expressão/operação matemática anterior (histórico).
 * @param {boolean} isError - Indica se o valor atual representa um estado de erro (ex: divisão por zero).
 */
export const Display = ({ value = '0', equation = '', isError = false }) => {
    // Reduz a escala da fonte para números longos para manter o layout elegante
    const isLong = value.length > 9;

    return (
        <div className={styles.displayContainer} role="region" aria-label="Visor da Calculadora">
            {/* Linha superior: Exibe a operação em andamento ou histórico */}
            <div className={styles.equationRow} aria-label="Expressão anterior">
                {equation || '\u00A0'}
            </div>

            {/* Linha principal: Dígitos ativos em destaque com acessibilidade */}
            <div
                className={`${styles.valueRow} ${isLong ? styles.valueSmall : ''} ${isError ? styles.errorState : ''}`}
                aria-live="polite"
                aria-atomic="true">
                {value}
            </div>
        </div>
    );
};

export default Display;
