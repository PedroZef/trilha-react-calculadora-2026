# Calculadora React 2026 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Desenvolver uma calculadora completa e moderna em React 19 + Vite com visual Dark Glassmorphism 2026, com operações fundamentais (+, -, *, /), recursos estendidos (%, ., C, ⌫, teclado físico), cabeçalho elegante e rodapé com a assinatura oficial `@2026 - Pedro Zeferino da Silva`.

**Architecture:** A aplicação adota arquitetura modular com separação clara de responsabilidades: o estado e as regras matemáticas residem no custom hook `useCalculator`, a interface é dividida em componentes funcionais puros (`Header`, `Display`, `Button`, `Footer`) e a estilização utiliza CSS Moderno e CSS Modules com aceleração por GPU e efeitos de vidro fosco.

**Tech Stack:** React 19, Vite, CSS Modules / CSS Moderno Nativo (variáveis CSS, flexbox/grid, backdrop-filter).

**Spec:** `docs/superpowers/specs/2026-09-23-calculadora-react-design.md`

## Global Constraints
- React 19.x compatível sem dependências externas adicionais de estilização.
- Visual Dark Glassmorphism 2026 com fundo escuro espacial e iluminação de ambient glow.
- Rodapé contendo exatamente a assinatura `@2026 - Pedro Zeferino da Silva`.
- Operações matemáticas: Adição (`+`), Subtração (`−`), Multiplicação (`×`), Divisão (`÷`), Porcentagem (`%`), Ponto (`.`), Limpeza (`C`), Apagar dígito (`⌫`), e suporte a teclado físico.

---

### Task 1: Tokens de Estilo Globais e Reset CSS (`src/index.css`)

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Produces: Variáveis globais CSS (`--bg-primary`, `--glass-bg`, `--glass-border`, `--accent-blue`, `--accent-purple`, `--text-main`, etc.) e background ambient glow com orbs desfocados.

- [ ] **Passo 1: Escrever estilos globais em `src/index.css`**
Configurar reset de margens, tipografia moderna (`Inter`, `-apple-system`, `sans-serif`), `color-scheme: dark`, e estilização do `#root` para centralização vertical e horizontal com luzes de fundo atmosféricas.

- [ ] **Passo 2: Validar sintaxe do CSS**
Verificar ausência de erros de formatação.

- [ ] **Passo 3: Commit**
`git add src/index.css; git commit -m "style: configure global styles and glassmorphism tokens in index.css"`

---

### Task 2: Custom Hook de Lógica Matemática (`src/hooks/useCalculator.js`)

**Files:**
- Create: `src/hooks/useCalculator.js`

**Interfaces:**
- Produces: Objeto retornado pelo hook contendo:
  - `displayValue`: string
  - `equation`: string
  - `handleDigit`: `(digit: string) => void`
  - `handleOperator`: `(op: string) => void`
  - `handleDecimal`: `() => void`
  - `handleClear`: `() => void`
  - `handleDelete`: `() => void`
  - `handlePercentage`: `() => void`
  - `handleEquals`: `() => void`

- [ ] **Passo 1: Criar o arquivo `src/hooks/useCalculator.js`**
Implementar o estado (`displayValue`, `previousValue`, `operation`, `equation`, `isWaitingNewValue`) com precisão numérica decimal, proteção contra divisão por zero, e listener para teclas físicas do teclado (`0-9`, `+`, `-`, `*`, `/`, `Enter`, `Backspace`, `Escape`).

- [ ] **Passo 2: Validar as funções matemáticas**
Garantir que operações compostas e regras de ponto flutuante retornem resultados corretos.

- [ ] **Passo 3: Commit**
`git add src/hooks/useCalculator.js; git commit -m "feat: implement useCalculator hook with full math operations and keyboard support"`

---

### Task 3: Componente `Display` (`src/components/Display/`)

**Files:**
- Create: `src/components/Display/Display.jsx`
- Create: `src/components/Display/Display.module.css`
- Delete: Antigos arquivos em `src/components/Input/` (se obsoletos)

**Interfaces:**
- Consumes: `value` (string), `equation` (string)
- Produces: Componente `<Display value={displayValue} equation={equation} />`

- [ ] **Passo 1: Criar `Display.module.css`**
Estilização estilo OLED embutido, cantos curvos de 18px, alinhamento à direita, linha superior em ciano suave (`#7dd3fc`) e linha principal em destaque com tipografia proporcional e proteção contra quebra.

- [ ] **Passo 2: Criar `Display.jsx`**
Renderizar o visor duplo com atributos de acessibilidade (`aria-live="polite"`).

- [ ] **Passo 3: Commit**
`git add src/components/Display; git commit -m "feat: add modern OLED Display component"`

---

### Task 4: Componente `Button` (`src/components/Button/`)

**Files:**
- Create: `src/components/Button/Button.jsx`
- Create: `src/components/Button/Button.module.css`
- Replace: Conteúdo antigo em `src/components/Button/` para remover referências a styled-components não instalado.

**Interfaces:**
- Consumes: `label` (ReactNode), `onClick` (function), `variant` ('default' | 'operator' | 'action' | 'equals' | 'zero'), `ariaLabel` (string)
- Produces: `<Button label="..." onClick={...} variant="..." />`

- [ ] **Passo 1: Criar `Button.module.css`**
Implementar variantes de botões, efeitos de hover luminoso, clique tátil (`transform: scale(0.96)`), e gradiente destacado para a variante `equals`.

- [ ] **Passo 2: Criar `Button.jsx`**
Componente funcional botão nativo com propriedades dinâmicas e classes modulares.

- [ ] **Passo 3: Commit**
`git add src/components/Button; git commit -m "feat: add interactive Button component with modern variants"`

---

### Task 5: Componente `Header` (`src/components/Header/`)

**Files:**
- Create: `src/components/Header/Header.jsx`
- Create: `src/components/Header/Header.module.css`

**Interfaces:**
- Produces: `<Header />`

- [ ] **Passo 1: Criar `Header.module.css`**
Estilo refinado, alinhamento centralizado/flex, gradiente no título e badge estilizado.

- [ ] **Passo 2: Criar `Header.jsx`**
Estruturar o logotipo com ícone SVG de calculadora moderna, título "React Calculator" e indicador "2026 Edition".

- [ ] **Passo 3: Commit**
`git add src/components/Header; git commit -m "feat: add elegant Header component with 2026 branding"`

---

### Task 6: Componente `Footer` (`src/components/Footer/`)

**Files:**
- Create: `src/components/Footer/Footer.jsx`
- Create: `src/components/Footer/Footer.module.css`

**Interfaces:**
- Produces: `<Footer />` com `@2026 - Pedro Zeferino da Silva`

- [ ] **Passo 1: Criar `Footer.module.css`**
Design sutil, borda superior suave, tipografia delicada e realce no nome.

- [ ] **Passo 2: Criar `Footer.jsx`**
Exibir com precisão a assinatura `@2026 - Pedro Zeferino da Silva` e subtítulo com os créditos de tecnologia.

- [ ] **Passo 3: Commit**
`git add src/components/Footer; git commit -m "feat: add custom Footer component with signature @2026 - Pedro Zeferino da Silva"`

---

### Task 7: Montagem Principal em `App.jsx` e `App.module.css`

**Files:**
- Modify: `src/App.jsx`
- Create: `src/App.module.css`
- Clean up: Remover código padrão do boilerplate Vite que não será usado

**Interfaces:**
- Consumes: `useCalculator`, `Header`, `Display`, `Button`, `Footer`
- Produces: Aplicação completa funcional montada

- [ ] **Passo 1: Criar `src/App.module.css`**
Definir o container da calculadora (`calculatorCard`), grade do teclado (`keypadGrid` com 4 colunas), e camadas de ambient glow.

- [ ] **Passo 2: Atualizar `src/App.jsx`**
Integrar todos os componentes conectando as ações do `useCalculator` a cada botão do teclado numérico e operadores.

- [ ] **Passo 3: Limpeza de arquivos antigos não utilizados**
Remover arquivos desnecessários de template se houver.

- [ ] **Passo 4: Commit**
`git add src/App.jsx src/App.module.css; git commit -m "feat: assemble complete modern calculator application"`

---

### Task 8: Build e Validação Final

**Files:**
- Test: Todo o projeto via build do Vite

- [ ] **Passo 1: Executar build de produção**
Executar `npm run build` para garantir que não há erros de compilação, importação ou linting.

- [ ] **Passo 2: Testar preview da aplicação**
Testar inicialização com `npm run preview` ou verificação dos módulos.

- [ ] **Passo 3: Final Commit e Apresentação**
`git add .; git commit -m "chore: finalize react calculator 2026 implementation"`
