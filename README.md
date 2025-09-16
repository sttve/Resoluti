## 🎯 Objetivo

O objetivo principal é criar uma base de aplicação robusta e escalável que não precise de alterações no código front-end para adicionar novas telas de listagem (CRUDs). Toda a configuração da interface é controlada por um endpoint de API.

## ✨ Features

-   **Menu Lateral Dinâmico**: O menu de navegação é gerado a partir do endpoint `/api/menu`.
-   **Tabelas Dinâmicas**: As colunas, títulos e ordenação das tabelas são definidos pela mesma API.
-   **Filtros Dinâmicos**: Os campos de filtro (inputs, selects, etc.) para cada tabela também são controlados pela API.
-   **Roteamento Dinâmico**: Utiliza o App Router do Next.js com rotas dinâmicas (`/[programa]/[modulo]/[acao]`).
-   **Gerenciamento de Estado de API**: Usa TanStack Query para data fetching, caching, e tratamento de estados de loading/erro.
-   **Componentes de UI**: Utiliza a biblioteca Ant Design para uma UI consistente e de alta qualidade.
-   **Estado na URL**: Os filtros aplicados são refletidos na URL como query parameters, permitindo que o estado seja compartilhável e recarregável.

## 🏛️ Arquitetura

A arquitetura foi projetada para ser modular e desacoplada, com uma clara separação de responsabilidades.

1.  **Fonte da Verdade (`/api/menu`)**: Este endpoint da API é o coração da aplicação. Ele fornece um array de "módulos" (ex: Clientes, Produtos), e para cada um, define:
    -   A estrutura do menu (`programa`, `modulo`, `acoes`).
    -   As colunas da tabela de listagem (`columns`).
    -   Os filtros disponíveis para aquela tabela (`filters`).

2.  **Next.js App Router**: Usamos rotas dinâmicas para criar as páginas. Uma única página (`app/[programa]/[modulo]/[acao]/page.tsx`) é capaz de renderizar qualquer tela de listagem ou formulário, simplesmente lendo os parâmetros da URL.

3.  **TanStack Query (React Query)**: Atua como a camada de dados.
    -   O hook `useMenu` busca e armazena em cache a configuração da UI, que é usada por múltiplos componentes (Sider, Página de Listagem) sem re-fetch desnecessário.
    -   O hook `useListingData` busca os dados para as tabelas. Seu `queryKey` dinâmico inclui os filtros atuais, garantindo que o TanStack Query refaça a chamada à API automaticamente quando os filtros mudam.

4.  **Componentização**:
    -   `AppSider`: Consome o `useMenu` para renderizar o menu.
    -   `ListingView`: Componente orquestrador que usa o `useMenu` para obter os metadados (colunas/filtros) e o `useListingData` para obter os dados da tabela.
    -   `DynamicFilters`: Recebe uma configuração de filtros e renderiza o formulário apropriado. Ele não tem lógica de negócio, apenas de UI.

## 🚀 Como Rodar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/sttve/Resoluti.git
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    # ou
    pnpm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 💡 Possíveis Melhorias

-   **Paginação**: Adicionar suporte a paginação nos dados da API e no componente `Table` do Ant Design.
-   **Ordenação (Backend)**: Implementar a lógica de ordenação no backend, acionada pelo evento `onChange` da tabela.
-   **Formulários de Cadastro/Edição Dinâmicos**: Estender a configuração da API para incluir a definição dos campos do formulário de cadastro, permitindo a criação de `POST`/`PUT` dinâmicos.
-   **Autenticação e Autorização**: Proteger rotas e filtrar os itens de menu visíveis com base nas permissões do usuário.
-   **Tipos de Filtro Avançados**: Adicionar suporte para mais tipos de filtros, como `DatePicker`, `RangeSlider`, etc.
-   **Testes**: Implementar testes unitários e de integração com Jest e React Testing Library.
-   **Otimizações de Performance**: Para tabelas muito grandes, virtualizar a renderização das linhas.