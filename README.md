# Dashboard Hospitalar

Aplicação web para visualização de indicadores financeiros de procedimentos hospitalares, com layout administrativo responsivo, identificação do usuário e edição de perfil.

**Repositório:** [https://github.com/ivanrufino/desafio-fullstack1](https://github.com/ivanrufino/desafio-fullstack1)

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18.18 ou superior
- [pnpm](https://pnpm.io/) (recomendado) — ou npm / yarn

## Instalação e execução

1. Clone o repositório e entre na pasta do projeto:

```bash
git clone https://github.com/ivanrufino/desafio-fullstack1.git
cd desafio-fullstack1
```

2. Instale as dependências:

```bash
pnpm install
```

3. Inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

4. Acesse no navegador: [http://localhost:3000](http://localhost:3000)

### Outros comandos

| Comando        | Descrição                          |
|----------------|------------------------------------|
| `pnpm build`   | Gera a versão de produção          |
| `pnpm start`   | Sobe o app após o build            |
| `pnpm lint`    | Executa o ESLint                   |

## Abordagem utilizada

### Stack

- **Next.js 15** (App Router) — renderização e roteamento
- **React 19** + **TypeScript** — interface tipada
- **Tailwind CSS** — estilização utilitária e layout responsivo
- **shadcn/ui** (preset Radix Maia) — componentes acessíveis (Button, Card, Sheet, Input, Avatar, Table, etc.)
- **Zustand** — estado global do usuário e UI (perfil, menu mobile)
- **React Hook Form** + **Zod** — formulário de perfil com validação
- **Sonner** — feedback visual após salvar o perfil

### Arquitetura

O código segue uma separação simples por responsabilidade:

```
src/
├── app/              # Rotas, layout raiz e API Route (Next.js)
├── components/       # UI (dashboard, perfil, shadcn/ui)
├── hooks/            # Lógica reutilizável (ex.: useDashboard)
├── services/         # Consumo da API (fetch)
├── store/            # Estado global (usuário, UI do perfil)
├── schemas/          # Validação Zod
├── mock/             # Dados fictícios de procedimentos
├── types/            # Tipos TypeScript
└── lib/              # Utilitários (métricas, formatação, iniciais)
```

### Funcionalidades principais

- **Simulação de API REST**: `dashboard.service.ts` faz `fetch` em `GET /api/procedimentos`. A route handler em `src/app/api/procedimentos/route.ts` simula latência (~1,2s) e retorna `mock/procedimentos.json`. O hook `useDashboard` expõe dados, loading e erro.

- **Balanço (indicadores)**:
  - Total de procedimentos executados
  - Total de procedimentos rejeitados
  - Total aprovado (valor em reais)
  - Total rejeitado (valor em reais)

- **Top 5 procedimentos**: ranking por quantidade de execuções do mesmo nome de procedimento, exibido em tabela.

- **Layout**:
  - Sidebar fixa no desktop com links visuais (Relatórios, Configurações, Suporte) sem navegação real
  - No mobile, menu lateral oculto e aberto via botão (Sheet)
  - Cabeçalho com identificação do usuário logado (dados fictícios)

- **Perfil do usuário**: edição em painel lateral (Sheet) com validação. Nome e senha editáveis; e-mail somente leitura. Alterações refletidas imediatamente na interface via Zustand.

### Validação do perfil

| Campo  | Regra                                                                   |
|--------|-------------------------------------------------------------------------|
| Nome   | 3–30 caracteres; apenas letras e espaços                                |
| E-mail | Exibido; não editável                                                   |
| Senha  | Opcional; se informada: 8–12 caracteres, letras + números e confirmação |

## Estrutura de telas

- **Dashboard** — balanço financeiro, top 5 procedimentos e identificação do usuário
- **Editar perfil** — acionado pelo card do usuário, pelo rodapé da sidebar ou pelo item “Configurações”
