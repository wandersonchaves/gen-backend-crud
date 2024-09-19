<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Índice

- [Índice](#índice)
- [Visão Geral](#visão-geral)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Execução da API](#execução-da-api)
  - [Modos de Execução](#modos-de-execução)
- [Testes](#testes)
- [Exemplo de Uso](#exemplo-de-uso)
  - [Consultar Usuários](#consultar-usuários)
  - [Criar um Usuário](#criar-um-usuário)
  - [Atualizar um Usuário](#atualizar-um-usuário)
  - [Remover um Usuário](#remover-um-usuário)
- [Endpoints da API](#endpoints-da-api)
- [Erros Comuns](#erros-comuns)
- [Recursos Adicionais](#recursos-adicionais)

---

## Visão Geral

Esta API é desenvolvida utilizando o framework [NestJS](https://nestjs.com/) em Node.js, com suporte a TypeORM para gerenciamento de banco de dados. A API permite operações de criação, leitura, atualização e exclusão (CRUD) para gerenciar usuários.

## Pré-requisitos

- **Node.js** (versão 20 ou superior)
- **PNPM**
- **Docker** e **Docker Compose**

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/wandersonchaves/gen-backend-crud
   cd gen-backend-crud
   ```

2. Instale as dependências:

   ```bash
   pnpm install
   ```

## Configuração do Ambiente

1. Copie o arquivo de exemplo de configuração:

   ```bash
   cp .env.example .env
   ```

2. Configure as variáveis de ambiente no arquivo `.env` conforme necessário. Exemplo de variáveis que podem ser configuradas:

   ```plaintext
   DATABASE_TYPE=mysql
   DATABASE_HOST=localhost
   DATABASE_PORT=3306
   DATABASE_USERNAME=root
   DATABASE_PASSWORD=password
   DATABASE_NAME=nome_do_banco
   ```

3. Para iniciar o banco de dados, execute o `docker-compose`:

   ```bash
   docker-compose up -d
   ```

4. Com o TypeORM, você pode gerar as migrações e sincronizar o banco de dados. Execute o seguinte comando:

   ```bash
   npx typeorm migration:run
   ```

## Execução da API

Para iniciar a API em modo de desenvolvimento, execute o seguinte comando:

```bash
pnpm run start:dev
```

### Modos de Execução

- **Desenvolvimento**: `pnpm run start`
- **Modo de Produção**: `pnpm run start:prod`

## Testes

Para garantir que a aplicação funcione corretamente, você pode executar os seguintes testes:

- **Testes Unitários**: 

  Execute os testes unitários com o comando:

  ```bash
  pnpm run test
  ```

- **Testes End-to-End (e2e)**: 

  Para realizar testes de integração e garantir que todos os componentes da API funcionem juntos, utilize o comando:

  ```bash
  pnpm run test:e2e
  ```

## Exemplo de Uso

### Consultar Usuários

```graphql
query {
  users {
    id
    name
    email
  }
}
```

### Criar um Usuário

```graphql
mutation {
  createUser(input: { name: "John Doe", email: "john@example.com" }) {
    id
    name
    email
  }
}
```

### Atualizar um Usuário

```graphql
mutation {
  updateUser(updateUserInput: { id: 1, name: "Jane Doe", email: "jane@example.com" }) {
    id
    name
    email
  }
}
```

### Remover um Usuário

```graphql
mutation {
  removeUser(id: 1)
}
```

## Endpoints da API

- **GraphQL**: Acesse o endpoint principal para interagir com a API através de GraphQL em `http://localhost:3000/graphql`.

## Erros Comuns

- **Erro 400**: Solicitação inválida.
- **Erro 404**: Usuário não encontrado.
- **Erro 500**: Erro interno do servidor.

## Recursos Adicionais

- Consulte a [Documentação do NestJS](https://docs.nestjs.com) para aprender mais sobre o framework.
- Veja nossos cursos oficiais [aqui](https://courses.nestjs.com/).
- Use [NestJS Devtools](https://devtools.nestjs.com) para visualizar sua aplicação em tempo real.
