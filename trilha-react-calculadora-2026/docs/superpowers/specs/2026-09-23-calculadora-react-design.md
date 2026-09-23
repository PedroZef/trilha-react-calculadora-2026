# Especificação Técnica: Calculadora React 2026 (Dark Glassmorphism)

- **Data:** 2026-09-23
- **Autor:** Pedro Zeferino da Silva / Antigravity
- **Status:** Aprovado para Implementação
- **Tecnologias:** React 19, Vite, CSS Modules / CSS Moderno Nativo

---

## 1. Visão Geral do Projeto

O objetivo deste projeto é construir uma Calculadora moderna, responsiva e completa em React, com interface visual futurista baseada no estilo **Dark Glassmorphism 2026**, componentes reutilizáveis e modulares, cabeçalho elegante, rodapé personalizado e suporte a todas as operações matemáticas essenciais com tratamento robusto de erros.

### Requisitos Principais:
1. **Operações Matemáticas Fundamentais:** Adição (`+`), Subtração (`−`), Multiplicação (`×`), Divisão (`÷`).
2. **Recursos Complementares:** Ponto decimal (`.`), porcentagem (`%`), apagar dígito (`⌫` Backspace), limpar tudo (`C`), exibição da expressão/histórico anterior e atalhos de teclado físico.
3. **Cabeçalho Elegante:** Logotipo estilizado, título com gradiente metálico moderno e badge "React 2026".
4. **Rodapé Oficial:** Assinatura com a formatação exata `@2026 - Pedro Zeferino da Silva` com acabamento refinado.
5. **Estética Visual:** Dark Glassmorphism 2026 (fundo escuro translúcido com `backdrop-filter: blur`, orbs de luz ambiente, reflexos de borda e display estilo OLED).

---

## 2. Arquitetura de Componentes e Diretórios

```
src/
├── assets/
│   └── (ícones SVG / branding)
├── components/
│   ├── Header/
│   │   ├── Header.jsx
│   │   └── Header.module.css
│   ├── Display/
│   │   ├── Display.jsx
│   │   └── Display.module.css
│   ├── Button/
│   │   ├── Button.jsx
│   │   └── Button.module.css
│   └── Footer/
│       ├── Footer.jsx
│       └── Footer.module.css
├── hooks/
│   └── useCalculator.js
├── App.jsx
├── App.module.css
├── index.css
└── main.jsx
```

### Detalhamento dos Componentes:

### 2.1 `Header`
- **Responsabilidade:** Fornecer identidade visual e cabeçalho premium.
- **Elementos:**
  - Ícone de cálculo futurista com brilho neon.
  - Título `"React Calculator 2026"` com gradiente de texto.
  - Badge `"Edição Especial 2026"`.

### 2.2 `Display`
- **Responsabilidade:** Renderizar os dados numéricos e a operação em curso de forma clara e legível.
- **Propriedades:** `value` (string), `equation` (string).
- **Elementos:**
  - `equation-row`: Mostra a expressão intermediária (ex: `"150 × 4 ="`) em tom ciano suave (`#7dd3fc`).
  - `value-row`: Mostra o valor corrente em destaque (40px) com truncamento/ajuste visual inteligente para evitar quebras de layout.

### 2.3 `Button`
- **Responsabilidade:** Botão interativo com animações táteis, feedback visual e acessibilidade.
- **Propriedades:**
  - `label` (ReactNode/string): Conteúdo textual ou ícone do botão.
  - `onClick` (function): Handler acionado no clique.
  - `variant` (string): `'default'` (números), `'operator'` (`+`, `−`, `×`, `÷`), `'action'` (`C`, `⌫`, `%`), `'equals'` (`=`).
  - `ariaLabel` (string): Rótulo para leitores de tela.

### 2.4 `Footer`
- **Responsabilidade:** Apresentar a assinatura oficial com acabamento estético consistente.
- **Conteúdo Obrigatório:** `@2026 - Pedro Zeferino da Silva`.
- **Elementos Adicionais:** Subtítulo discreto indicando `"Desenvolvido com React + Vite"`.

---

## 3. Hook de Estado e Lógica (`useCalculator`)

Toda a lógica de negócios da calculadora reside no custom hook `useCalculator`.

### 3.1 Estados:
- `displayValue`: Valor em exibição no visor principal (padrão `'0'`).
- `previousValue`: Primeiro operando armazenado antes da seleção do operador (número ou `null`).
- `operation`: Operador ativo (`'+'`, `'-'`, `'*'`, `'/'` ou `null`).
- `equation`: String representativa da conta (ex: `"50 + 20 ="`).
- `isWaitingNewValue`: Booleano que sinaliza se o próximo dígito deve substituir o visor.

### 3.2 Funções e Ações:
- `handleDigit(digit)`: Insere dígitos `0` a `9`. Evita repetição excessiva (máximo de 14 dígitos).
- `handleDecimal()`: Adiciona `.` garantindo unicidade por número. Se estiver esperando novo valor, inicia com `'0.'`.
- `handleClear()`: Reseta o estado da calculadora para o padrão inicial.
- `handleDelete()`: Remove o último caractere; caso o comprimento seja 1, redefine para `'0'`.
- `handlePercentage()`:
  - Se houver `previousValue` e `operation` (`+` ou `-`), calcula `(previousValue * displayValue) / 100`.
  - Se for operação simples, divide o valor atual por 100.
- `handleOperator(op)`:
  - Se já houver um cálculo pendente e `isWaitingNewValue` for falso, calcula o resultado parcial antes de aplicar o novo operador.
  - Se o usuário clicar em outro operador consecutivamente, substitui o operador atual sem corromper a conta.
- `handleEquals()`:
  - Executa o cálculo final entre `previousValue` e `displayValue`.
  - Atualiza `equation` para exibir a expressão completa com `=`.
  - Sinaliza `isWaitingNewValue = true`.

### 3.3 Tratamento de Exceções e Precisão:
- **Divisão por Zero:** Identifica tentativas de divisão por zero e exibe `"Não é possível dividir por 0"` sem travar o aplicativo; o próximo clique numérico reseta o visor de forma graciosa.
- **Precisão Decimal:** Normaliza resultados para evitar imperfeições inerentes a IEEE-754 (como `0.1 + 0.2 = 0.30000000000000004`), arredondando para até 8 casas decimais e eliminando zeros à direita.
- **Atalhos de Teclado:** Listener no `window` mapeando:
  - `0-9` → `handleDigit`
  - `.`, `,` → `handleDecimal`
  - `+`, `-`, `*`, `/` → `handleOperator`
  - `Enter`, `=` → `handleEquals`
  - `Backspace` → `handleDelete`
  - `Escape`, `c`, `C` → `handleClear`
  - `%` → `handlePercentage`

---

## 4. Design System: Dark Glassmorphism 2026

### 4.1 Paleta de Cores e Tokens:
- **Fundo Global:** `#0B0E17`
- **Card Calculadora:** `rgba(18, 24, 38, 0.72)` com `backdrop-filter: blur(24px)` e `border: 1px solid rgba(255, 255, 255, 0.12)`.
- **Glow Orbs de Fundo:**
  - Orb 1 (Topo Esquerda): Radial gradient `#3b82f6` (azul elétrico), opacidade 0.25, `filter: blur(100px)`.
  - Orb 2 (Inferior Direita): Radial gradient `#8b5cf6` (violeta neon), opacidade 0.25, `filter: blur(120px)`.
- **Display OLED:** `rgba(10, 14, 23, 0.85)` com borda sutil e sombra interna.
- **Botões:**
  - `default`: Fundo `rgba(255, 255, 255, 0.05)`, texto `#f8fafc`. Hover: `rgba(255, 255, 255, 0.12)`.
  - `operator`: Fundo `rgba(59, 130, 246, 0.2)`, texto `#60a5fa`. Hover: `rgba(59, 130, 246, 0.35)`.
  - `action`: Fundo `rgba(244, 63, 94, 0.15)`, texto `#fb7185`. Hover: `rgba(244, 63, 94, 0.28)`.
  - `equals`: Gradiente `linear-gradient(135deg, #2563eb, #7c3aed)`, texto `#ffffff`, sombra colorida `0 6px 20px rgba(59, 130, 246, 0.45)`.

### 4.2 Tipografia e Responsividade:
- Tipografia: Família do sistema moderna (`Inter`, `-apple-system`, `system-ui`, `Segoe UI`, `Roboto`).
- Grid: Layout CSS Grid com 4 colunas (`repeat(4, 1fr)`) e 5 linhas.
- Responsividade: O container principal se ajusta perfeitamente em telas móveis e desktop, com largura máxima de 380px para a calculadora.

---

## 5. Estratégia de Testes e Validação

1. **Testes Unitários da Lógica (`useCalculator`):**
   - Soma simples (`2 + 3 = 5`)
   - Subtração simples (`10 - 4 = 6`)
   - Multiplicação simples (`7 * 8 = 56`)
   - Divisão simples (`100 / 4 = 25`)
   - Divisão por zero (`15 / 0` → Exibe mensagem de erro)
   - Operações encadeadas (`5 + 5 + 5 = 15`)
   - Porcentagem (`200 + 10% = 220`)
   - Precisão de ponto flutuante (`0.1 + 0.2 = 0.3`)
2. **Validação Visual e Interativa:**
   - Efeito Glassmorphism renderizando de forma nítida com os orbs de fundo.
   - Responsividade e centralização na tela.
   - Digitação e cliques respondendo com microanimações táteis.
   - Header elegante e rodapé com a assinatura oficial visíveis e perfeitamente legíveis.
