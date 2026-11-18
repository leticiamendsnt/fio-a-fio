# Backend da API — Fio a Fio

Esta pasta contém o backend da aplicação Fio a Fio, construído em **Node.js**, **Express**, **MongoDB** (via Mongoose), **Zod** para validação de esquemas e **WebSockets** para troca de mensagens e chat em tempo real.

## Requisitos

- **Node.js 18+**
- **MongoDB** em execução localmente em `mongodb://127.0.0.1:27017/fioafio` ou configurado via variável `MONGODB_URI` no arquivo `.env`.

## Configuração

Copie o arquivo de exemplo caso ainda não tenha o `.env`:

```sh
cp .env.example .env
```

## Executar

Na raiz do repositório ou dentro da pasta `backend`:

```sh
npm run dev --prefix backend
# ou dentro de backend:
npm run dev
```

O servidor HTTP iniciará em `http://localhost:3001` e o endpoint WebSocket em `ws://localhost:3001/ws`.

## Testes

Para rodar os testes de validação de schemas Zod e integração:

```sh
npm test --prefix backend
```

## Recursos e Endpoints Principais

A API Express disponibiliza:
- Autenticação JWT: `/auth/login`, `/auth/register`, `/auth/me`
- Comunidade: `/users`, `/posts`, `/comments`, `/stories`
- Aprendizagem: `/videoLessons`, `/videoLessons/:id/reviews`, `/materials`
- E-commerce e Gestão: `/purchases`, `/sales`, `/salesSummary`, `/adminDashboard`
- Conversas em tempo real: `/conversations`, `/messages` e conexão WebSocket via `/ws`.
