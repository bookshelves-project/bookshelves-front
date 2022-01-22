# Bookshelves Front <!-- omit in toc -->

[![nuxtjs](https://img.shields.io/static/v1?label=NuxtJS&message=v2.15&color=00C58E&style=flat-square&logo=nuxt.js&logoColor=ffffff)](https://nuxtjs.org/)
[![tailwindcss](https://img.shields.io/static/v1?label=Tailwind%20CSS&message=v3.0&color=38B2AC&style=flat-square&logo=tailwind-css&logoColor=ffffff)](https://tailwindcss.com/)
[![nuxtjs](https://img.shields.io/static/v1?label=Designed%20to%20be&message=SSR&color=00C58E&style=flat-square&logo=nuxt.js&logoColor=ffffff)](https://nuxtjs.org/docs/2.x/concepts/server-side-rendering/)

[![NodeJS](https://img.shields.io/static/v1?label=NodeJS&message=v16.13&color=339933&style=flat-square&logo=node.js&logoColor=ffffff)](https://nodejs.org/en)
[![npm](https://img.shields.io/static/v1?label=NPM&message=v8&color=CB3837&style=flat-square&logo=npm&logoColor=CB3837)](https://docs.npmjs.com/cli/)

[**Repository**](https://gitlab.com/bookshelves-project)

💻 [**bookshelves.ink**](https://bookshelves.ink): demo  
📚 [**documentation.bookshelves.ink**](https://documentation.bookshelves.ink): documentation  

## **Table of contents** <!-- omit in toc -->

- [**I. Setup**](#i-setup)
  - [*I. a. Modify API*](#i-a-modify-api)
- [**II. Production in SSR**](#ii-production-in-ssr)

## **I. Setup**

Setup local on <http://localhost:3000> with <https://bookshelves.ink> API

Create `.env`

```bash
cp .env.example .env
```

Node.js dependencies

```bash
npm i
```

Local serve

```bash
npm run dev
```

### *I. a. Modify API*

Modify `.env` on `API_URL` to use local API

```yml
API_URL=http://localhost:8000
```

## **II. Production in SSR**

Update `.env`

```yml
BASE_URL=https://bookshelves.ink
API_URL=https://bookshelves.ink
```

Setup build

```bash
npm run build
```

Launch server in SSR

```bash
npm run start
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
