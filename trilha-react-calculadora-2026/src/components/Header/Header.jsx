import styles from "./Header.module.css";

/**
 * Componente Header
 * Cabeçalho elegante com identidade visual, logotipo em SVG vetorial e indicador da edição 2026.
 */
export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.brandGroup}>
        {/* Ícone de calculadora com efeito neon sutil */}
        <div className={styles.iconWrapper} aria-hidden="true">
          <svg
            className={styles.iconSvg}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="4" y="2" width="16" height="20" rx="3" />
            <line x1="8" y1="6" x2="16" y2="6" />
            <line x1="8" y1="10" x2="10" y2="10" />
            <line x1="14" y1="10" x2="16" y2="10" />
            <line x1="8" y1="14" x2="10" y2="14" />
            <line x1="14" y1="14" x2="16" y2="14" />
            <line x1="8" y1="18" x2="16" y2="18" />
          </svg>
        </div>

        {/* Título da Calculadora e subtítulo */}
        <div className={styles.titleGroup}>
          <h1 className={styles.mainTitle}>NeoReact Calc</h1>
          <span className={styles.subTitle}>Interface 2026</span>
        </div>
      </div>

      {/* Badge indicador de versão e status ativo */}
      <div className={styles.badge}>
        <span className={styles.badgeDot}></span>
        2026 Pro
      </div>
    </header>
  );
};

export default Header;
