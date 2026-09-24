import styles from "./Footer.module.css";

/**
 * Componente Footer
 * Rodapé com acabamento refinado contendo a assinatura oficial do autor.
 */
export const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      {/* Assinatura oficial do desenvolvedor */}
      <div className={styles.copyrightName}>
        @2026 - Pedro Zeferino da Silva
      </div>

      {/* Identificação das tecnologias utilizadas */}
      <div className={styles.techCredit}>
        <span>Desenvolvido com React 19</span>
        <span className={styles.dotSeparator}></span>
      </div>
    </footer>
  );
};

export default Footer;
