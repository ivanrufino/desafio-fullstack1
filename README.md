# Dashboard Hospitalar

Aplicação web para visualização de indicadores financeiros de procedimentos hospitalares, com layout administrativo, identificação do usuário e edição de perfil.

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18.18 ou superior
- [pnpm](https://pnpm.io/) (recomendado) — ou npm / yarn

## Instalação e execução

1. Clone o repositório e entre na pasta do projeto:

```bash
git clone <url-do-repositorio>
cd hospital-dashboard
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
- **Tailwind CSS** — estilização utilitária
- **shadcn/ui** (preset Radix Maia) — componentes acessíveis (Button, Card, Sheet, Input, Avatar, etc.)
- **Zustand** — estado global do usuário logado
- **React Hook Form** + **Zod** — formulário de perfil com validação
- **Sonner** — feedback visual após salvar o perfil

### Arquitetura

O código segue uma separação simples por responsabilidade:

```
src/
├── app/              # Rotas e layout raiz (Next.js)
├── components/       # UI (dashboard, perfil, shadcn/ui)
├── hooks/            # Lógica reutilizável (ex.: useDashboard)
├── services/         # Acesso a dados (simula API)
├── store/            # Estado global (usuário, UI do perfil)
├── schemas/          # Validação Zod
├── mock/             # Dados fictícios de procedimentos
├── types/            # Tipos TypeScript
└── lib/              # Utilitários (formatação, cn, iniciais)
```

- **Dados do dashboard**: o `dashboard.service.ts` consome a rota REST `GET /api/procedimentos`, que simula latência (~1,2s) e retorna o JSON em `mock/procedimentos.json`. O hook `useDashboard` expõe lista, loading e erro.
- **Indicadores (balanço)**: total executado, total rejeitado, soma em reais dos aprovados e dos rejeitados — calculados em `lib/dashboard.ts` e exibidos em cards.
- **Top 5 procedimentos**: ranking por quantidade de execuções do mesmo nome de procedimento, exibido em tabela.
- **Layout**: sidebar fixa com links visuais (Relatórios, Configurações, Suporte) sem navegação real; área principal com cabeçalho e grid de indicadores.
- **Perfil do usuário**: dados fictícios iniciais no `user.store.ts`. A edição abre um painel lateral (Sheet) com validação de nome e senha; o e-mail é somente leitura. Ao salvar, o store é atualizado e a interface (sidebar, cabeçalho, avatar) reflete as mudanças imediatamente.

### Validação do perfil

| Campo            | Regra                                                                 |
|------------------|-----------------------------------------------------------------------|
| Nome             | 3–30 caracteres; apenas letras e espaços                              |
| E-mail           | Exibido; não editável                                                 |
| Senha            | Opcional; se informada: 8–12 caracteres, letras + números e confirmação |

## Estrutura de telas

- **Dashboard** — indicadores financeiros e identificação do usuário
- **Editar perfil** — acionado pelo card do usuário, pelo rodapé da sidebar ou pelo item “Configurações”
