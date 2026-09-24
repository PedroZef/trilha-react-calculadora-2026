import styles from "./Button.module.css";

/**
 * Componente Button
 * Botão modular reutilizável com suporte a múltiplas variantes de design e acessibilidade.
 *
 * @param {string|React.ReactNode} label - Conteúdo textual ou ícone exibido no botão.
 * @param {Function} onClick - Função de callback disparada ao clicar no botão.
 * @param {'default'|'operator'|'action'|'equals'} variant - Estilo visual da tecla.
 * @param {number} span - Número de colunas ocupadas no grid (padrão: 1, ou 2 para teclas largas como o 0).
 * @param {string} ariaLabel - Rótulo acessível para leitores de tela.
 */
export const Button = ({
  label,
  onClick,
  variant = "default",
  span = 1,
  ariaLabel,
}) => {
  // Seleciona a classe CSS correspondente à variante desejada
  const variantClass = styles[variant] || styles.default;

  // Aplica classe de expansão caso o botão ocupe 2 colunas
  const spanClass = span === 2 ? styles.spanTwo : "";

  return (
    <button
      type="button"
      className={`${styles.btn} ${variantClass} ${spanClass}`}
      onClick={onClick}
      aria-label={ariaLabel || (typeof label === "string" ? label : undefined)}
    >
      {label}
    </button>
  );
};

export default Button;
