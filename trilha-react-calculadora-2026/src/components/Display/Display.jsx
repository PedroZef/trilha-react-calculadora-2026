import styles from './Display.module.css';

export const Display = ({ value = '0', equation = '' }) => {
  const isError = value.includes('Não é possível') || value.includes('Erro');
  const isLong = value.length > 9;

  return (
    <div className={styles.displayContainer} role="region" aria-label="Visor da Calculadora">
      <div className={styles.equationRow} aria-label="Expressão anterior">
        {equation || '\u00A0'}
      </div>
      <div
        className={`${styles.valueRow} ${isLong ? styles.valueSmall : ''} ${isError ? styles.errorState : ''}`}
        aria-live="polite"
        aria-atomic="true"
      >
        {value}
      </div>
    </div>
  );
};

export default Display;
