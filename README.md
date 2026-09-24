# 🚀 Calculadora NeoReact 2026

Calculadora web moderna desenvolvida com **React 19** e **Vite 8**, projetada sob a estética **Dark Glassmorphism 2026** com iluminação ambiente (Ambient Glow) e mostrador digital estilo OLED.

Projeto prático do **Desafio da Trilha React** — acompanha as etapas do checklist em [`docs/200030.png`](trilha-react-calculadora-2026/docs/200030.png).

Desenvolvida por **Pedro Zeferino da Silva**.

---

## 📑 Índice

- [Funcionalidades](#-funcionalidades)
- [Checklist do Desafio](#-checklist-do-desafio)
- [Tech Stack](#-tech-stack)
- [Pré-requisitos](#-pré-requisitos)
- [Como Executar](#-como-executar-o-projeto-localmente)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Arquitetura de Componentes](#-arquitetura-de-componentes)
- [Fluxo de Estado e Dados](#-fluxo-de-estado-e-dados)
- [Atalhos de Teclado](#️-atalhos-de-teclado)
- [Acessibilidade](#-acessibilidade)
- [Padrões de Código e Qualidade](#-padrões-de-código-e-qualidade)
- [Testes](#-testes)
- [Build e Deploy](#-build-e-deploy)
- [Pendências e Roadmap](#-pendências-e-roadmap)
- [Solução de Problemas](#-solução-de-problemas)
- [Licença e Créditos](#-licença-e-créditos)

---

## ✨ Funcionalidades

| Recurso                 | Descrição                                                                             |
| :---------------------- | :------------------------------------------------------------------------------------ |
| **Soma (`+`)**          | Adição entre inteiros e decimais com encadeamento contínuo.                           |
| **Subtração (`−`)**     | Subtração precisa com suporte a resultados negativos.                                 |
| **Multiplicação (`×`)** | Multiplicação com correção de imprecisão de ponto flutuante (ex.: `0.1 + 0.2 = 0.3`). |
| **Divisão (`÷`)**       | Divisão protegida com mensagem de erro para divisão por zero.                         |
| **Porcentagem (`%`)**   | Percentual contextual: `200 + 10%` → `20`; sozinho → `50%` = `0.5`.                   |
| **Ponto Decimal (`.`)** | Impede múltiplos pontos no mesmo número.                                              |
| **Limpar (`C`)**        | Reinicia display, operação pendente e histórico.                                      |
| **Apagar (`⌫`)**        | Remove o último dígito inserido.                                                      |
| **Histórico no Visor**  | Linha superior mostra a expressão (ex.: `150 × 4 =`).                                 |
| **Teclado Físico**      | Todos os botões operáveis pelo teclado do computador.                                 |
| **Cadeia de Operações** | Calcula parciais ao encadear operadores (`2 + 3 ×` → `5 ×`).                          |

### 🎨 Direção Visual

- **Dark Glassmorphism:** cartão translúcido com `backdrop-filter: blur(24px)`, bordas com reflexo de luz e sombras multicamadas.
- **Ambient Glow:** esferas atmosféricas em gradiente azul/violeta no fundo.
- **Display OLED Duplo:** expressão anterior na linha superior + valor corrente com redução automática de escala para números longos.
- **Teclas com Microinterações:** resposta luminosa em `:hover` e `:active`.
- **Design Tokens:** todas as cores e sombras centralizadas como variáveis CSS em `src/index.css`.

---

## ✅ Checklist do Desafio

Mapeamento com as etapas do arquivo [`docs/200030.png`](trilha-react-calculadora-2026/docs/200030.png):

| Etapa                                 | Status | Onde está implementado                                                                                |
| :------------------------------------ | :----: | :---------------------------------------------------------------------------------------------------- |
| Primeiras Estilizações                |   ✅   | `src/index.css` (tokens globais) + `src/App.module.css` (card e grid)                                 |
| Criando os Botões Principais          |   ✅   | `src/components/Button/` (componente com variantes `default`, `operator`, `action`, `equals`)         |
| Desenvolvendo Interações nos Botões   |   ✅   | `Button.module.css` (`:hover`, `:active`, transições) + listener de teclado em `useCalculator`        |
| Função de Soma e Igual                |   ✅   | `handleOperator()` e `handleEquals()` em `src/hooks/useCalculator.js`                                 |
| Função de Subtração e Próximos Passos |   ✅   | Subtração, multiplicação, divisão, `%`, `⌫`, histórico e teclado físico — todas em `useCalculator.js` |

---

## 🛠️ Tech Stack

| Camada        | Tecnologia                                                                         | Versão               |
| :------------ | :--------------------------------------------------------------------------------- | :------------------- |
| Linguagem     | JavaScript (ES Modules)                                                            | ES2024               |
| Biblioteca UI | React + React DOM                                                                  | ^19.2.8              |
| Build Tool    | Vite (`@vitejs/plugin-react`)                                                      | ^8.3.0               |
| Estilização   | CSS Modules + CSS nativo (variáveis, grid, backdrop-filter)                        | —                    |
| Linting       | ESLint (flat config) + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh` | ^10.10.0             |
| Testes        | Vitest + Testing Library (jsdom)                                                  | ^5.0.1               |
| CI            | GitHub Actions (lint + test + build)                                              | —                    |
| Runtime       | Node.js                                                                            | ^20.19.0 ou ≥22.12.0 |

**Zero dependências externas de estilização ou lógica** — apenas React e React DOM em `dependencies`.

---

## 💻 Pré-requisitos

- [Node.js](https://nodejs.org/) **20.19+ ou 22.12+** (exigência do Vite 8 — verifique com `node -v`)
- npm 10+ (distribuído junto com o Node)

---

## 🚀 Como Executar o Projeto Localmente

### 1. Acessar o diretório do projeto

```bash
cd trilha-react-calculadora-2026
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

Abra o navegador na URL indicada no terminal (padrão: `http://localhost:5173`).

### 4. Gerar build de produção

```bash
npm run build
```

Os arquivos otimizados são gerados em `dist/`.

### 5. Visualizar o build localmente

```bash
npm run preview
```

---

## 📜 Scripts Disponíveis

| Comando             | Descrição                                             |
| :------------------ | :---------------------------------------------------- |
| `npm run dev`       | Sobe o servidor de desenvolvimento com HMR (Vite)     |
| `npm run build`     | Gera o build de produção otimizado em `dist/`         |
| `npm run preview`   | Serve o build de produção localmente para verificação |
| `npm run lint`      | Executa o ESLint sobre todo o projeto                 |
| `npm run test`      | Executa a suíte de testes (Vitest, modo único)        |
| `npm run test:watch`| Executa os testes em modo watch (desenvolvimento)     |

---

## 🏗️ Arquitetura de Componentes

Separação de responsabilidades: **lógica no hook**, **composição no App**, **estilo no CSS Module de cada componente**.

```
trilha-react-calculadora-2026/
├── .github/workflows/
│   └── ci.yml                  # CI: lint + test + build (push/PR)
├── docs/
│   └── 200030.png              # Checklist do desafio (Trilha React)
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header/             # Cabeçalho com logo vetorial e badge "2026 Pro"
│   │   │   ├── Header.jsx
│   │   │   ├── Header.module.css
│   │   │   └── index.js        # Barrel export
│   │   ├── Display/            # Visor duplo OLED (histórico + valor)
│   │   │   ├── Display.jsx
│   │   │   ├── Display.module.css
│   │   │   └── index.js        # Barrel export
│   │   ├── Button/             # Botão reutilizável com 4 variantes
│   │   │   ├── Button.jsx
│   │   │   ├── Button.module.css
│   │   │   └── index.js        # Barrel export
│   │   └── Footer/             # Rodapé com assinatura e créditos
│   │       ├── Footer.jsx
│   │       ├── Footer.module.css
│   │       └── index.js        # Barrel export
│   ├── hooks/
│   │   ├── useCalculator.js    # Estado, regras matemáticas e teclado físico
│   │   └── useCalculator.test.js # 20 testes unitários (Vitest)
│   ├── App.jsx                 # Composição da calculadora
│   ├── App.module.css          # Grid do teclado e card de vidro
│   ├── index.css               # Reset, design tokens, foco e Ambient Glow
│   └── main.jsx                # Ponto de montagem (StrictMode)
├── eslint.config.js            # Config flat do ESLint 10
├── vite.config.js              # Vite + configuração do Vitest
└── index.html                  # HTML semântico (lang="pt-BR")
```

### Componentes

| Componente | Responsabilidade                             | Props                                              |
| :--------- | :------------------------------------------- | :------------------------------------------------- |
| `Header`   | Identidade visual / marca                    | —                                                  |
| `Display`  | Renderizar valor, expressão e estado de erro | `value`, `equation`, `isError`                     |
| `Button`   | Tecla acessível com variante visual          | `label`, `onClick`, `variant`, `span`, `ariaLabel` |
| `Footer`   | Assinatura e créditos                        | —                                                  |
| `App`      | Orquestrar hook + composição                 | —                                                  |

### Hook `useCalculator`

Encapsula todo o estado da calculadora:

| Estado              | Tipo             | Papel                               |
| :------------------ | :--------------- | :---------------------------------- |
| `displayValue`      | `string`         | Valor corrente no visor             |
| `previousValue`     | `string \| null` | Operando esquerdo pendente          |
| `operation`         | `string \| null` | Operador ativo (`+ - * /`)          |
| `equation`          | `string`         | Expressão exibida na linha superior |
| `isWaitingNewValue` | `boolean`        | Próximo dígito substitui o visor    |
| `hasError`          | `boolean`        | Estado de erro (ex.: divisão por 0) |

Expõe: `displayValue`, `equation`, `hasError`, `handleDigit`, `handleDecimal`, `handleOperator`, `handleEquals`, `handlePercentage`, `handleClear`, `handleDelete`.

---

## ⚡ Fluxo de Estado e Dados

```
Clique/Tecla
    │
    ▼
App.jsx ── chama handler ──► useCalculator (estado + regras)
    │                              │
    ▼                              ▼
Button/Display ◄── props ── displayValue, equation
```

**Cadeia de operação:** `2 + 3 ×` → ao pressionar `×`, `compute(2, 3, +)` roda, `previousValue = 5`, o visor mostra `5` e a equation `5 ×`.

**Tratamento de erro:** divisão por zero ativa a flag `hasError` do hook (`displayValue = "Não é possível dividir por 0"`) e o `Display` recebe `isError` por prop para aplicar a classe `errorState`. Inserir um dígito ou `C` limpa o erro automaticamente.

---

## ⌨️ Atalhos de Teclado

| Tecla              | Ação                   |
| :----------------- | :--------------------- |
| `0`–`9`            | Inserir dígito         |
| `.` ou `,`         | Ponto decimal          |
| `+`, `-`, `*`, `/` | Operadores matemáticos |
| `Enter` ou `=`     | Calcular resultado     |
| `Backspace`        | Apagar último dígito   |
| `Escape` ou `C`    | Limpar tudo            |
| `%`                | Porcentagem            |

---

## ♿ Acessibilidade

**Implementado:**

- `lang="pt-BR"` e viewport no `index.html`
- Elementos de visor com `role="region"`, `aria-label` e `aria-live="polite"`/`aria-atomic` — resultados anunciados por leitores de tela
- Todos os botões com `aria-label` explícito (ex.: "Dividir", "Apagar último dígito")
- Grade do teclado com `role="group"` + `aria-label`
- SVG decorativo com `aria-hidden="true"`
- Botões nativos `<button type="button">` — operáveis por Tab e Enter
- **Foco visível por teclado** (`:focus-visible` com anel de alto contraste — WCAG 2.4.7)
- **`prefers-reduced-motion`** — animações e transições desativadas para usuários com sensibilidade a movimento (WCAG 2.3.3)

---

## 📏 Padrões de Código e Qualidade

| Padrão                                                | Status                                  |
| :---------------------------------------------------- | :-------------------------------------- |
| ESLint 10 flat config com regras oficiais React Hooks | ✅ `npm run lint` passa sem erros       |
| Build de produção limpo                               | ✅ `npm run build` conclui sem warnings |
| Testes automatizados (Vitest, 20 casos)               | ✅ `npm run test` passa                 |
| CI no push/PR (lint + test + build)                   | ✅ GitHub Actions (`.github/workflows`) |
| Separação lógica/UI (custom hook + componentes)       | ✅                                      |
| CSS Modules com escopo por componente                 | ✅                                      |
| Design tokens centralizados (CSS custom properties)   | ✅                                      |
| `React.StrictMode` habilitado                         | ✅                                      |
| HTML semântico                                        | ✅                                      |
| `:focus-visible` e `prefers-reduced-motion`           | ✅                                      |
| Updaters de estado puros (sem efeitos colaterais)     | ✅                                      |
| Estado de erro explícito (`hasError`, sem string match) | ✅                                    |
| Imports de componentes via barrel (`index.js`)        | ✅                                      |

---

## 🧪 Testes

```bash
npm run test         # execução única (CI)
npm run test:watch   # modo watch (desenvolvimento)
```

**Stack:** Vitest 5 + Testing Library (ambiente jsdom) — configurado em `vite.config.js`.

**Cobertura** (`src/hooks/useCalculator.test.js` — 20 testes):

| Grupo | Cenários |
| :--- | :--- |
| Entrada | zeros à esquerda, ponto decimal único, limite de 13 caracteres |
| Operações | soma, subtração (resultado negativo), multiplicação, divisão |
| Erro | divisão por zero, flag `hasError`, recuperação com dígito/`C` |
| Precisão | `0.1 + 0.2 = 0.3` (correção de ponto flutuante) |
| Encadeamento | parciais ao trocar operador (`2 + 3 ×` → `5 ×`) |
| Porcentual | contextual (`200 + 10% = 20`) e isolado (`50% = 0.5`) |
| UI | backspace, clear completo |
| Teclado físico | dígitos, operadores, `Enter`, `Escape`, vírgula decimal |

---

## 📦 Build e Deploy

### Build

```bash
npm run build   # gera dist/
npm run preview # valida localmente antes de publicar
```

Saída esperada (gzip):

| Arquivo                   | Tamanho |
| :------------------------ | :------ |
| `dist/assets/index-*.css` | ~2.4 kB |
| `dist/assets/index-*.js`  | ~71 kB  |

### Deploy

O resultado de `npm run build` é um site estático — pode ir para qualquer host:

- **Netlify:** build `npm run build`, publish directory `dist`
- **Vercel:** framework preset _Vite_, output `dist`
- **GitHub Pages:** publique `dist/` (use `base` no `vite.config.js` se for servir em subdiretório)

> `dist/` e `node_modules/` já estão no `.gitignore`.

---

## 🗺️ Pendências e Roadmap

### Resolvidos na revisão de padrões

1. ✅ **Testes unitários** — Vitest adicionado com 20 testes cobrindo `useCalculator`.
2. ✅ **Foco visível** — `:focus-visible` com anel de alto contraste substituiu o `outline: none` global (WCAG 2.4.7).
3. ✅ **`prefers-reduced-motion`** — animações reduzidas para usuários sensíveis (WCAG 2.3.3).
4. ✅ **Estado de erro explícito** — flag `hasError` no hook substituiu o `includes('Não é possível')` duplicado em 5 handlers e no `Display`.
5. ✅ **CI** — GitHub Actions com `lint + test + build` em push/PR para `main`.
6. ✅ **Updaters puros** — `setIsWaitingNewValue` movido para fora dos updaters do `setDisplayValue` (seguro com StrictMode).
7. ✅ **Barrel imports** — todos os componentes exportam via `index.js` e são importados pela pasta.
8. ✅ **Versão do Node** — `engines` no `package.json` e README corrigidos para `^20.19.0 || >=22.12.0`.

### Melhorias futuras opcionais

- Migrar para **TypeScript** (tipagem dos handlers e props do `Button`).
- Testes E2E com **Playwright** (fluxo completo no navegador).
- Publicação automática do `dist/` no push para `main` (GitHub Pages/Netlify).

---

## 🔧 Solução de Problemas

### `npm run dev` falha com erro de versão do Node

**Erro:** `Vite ... required node ...`

**Solução:** o Vite 8 exige Node `^20.19.0 || >=22.12.0`. Atualize com [nvm](https://github.com/coreybutler/nvm-windows) ou baixe em [nodejs.org](https://nodejs.org):

```bash
node -v   # deve mostrar 20.19+ ou 22.12+
```

### `backdrop-filter` não renderiza

Navegadores antigos não suportam o efeito de vidro. O layout continua funcional sem o desfoque — verifique Chrome 76+, Safari 18+, Firefox 103+.

### Comportamento estranho após erro de divisão

Pressione `C` (ou `Escape`) para limpar o estado de erro antes de nova operação.

---

## 📄 Licença e Créditos

Projeto desenvolvido com dedicação por **Pedro Zeferino da Silva**.

> **@2026 - Pedro Zeferino da Silva** • Todos os direitos reservados.
