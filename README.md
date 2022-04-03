# Bookshelves · Front <!-- omit in toc -->

[![nuxtjs](https://img.shields.io/static/v1?label=Nuxt&message=v3.*&color=00C58E&style=flat-square&logo=nuxt.js&logoColor=ffffff)](https://nuxtjs.org/)
[![nuxtjs](https://img.shields.io/static/v1?label=Designed%20to%20be&message=SSR&color=00C58E&style=flat-square&logo=nuxt.js&logoColor=ffffff)](https://nuxtjs.org/docs/concepts/server-side-rendering/)
[![tailwindcss](https://img.shields.io/static/v1?label=Tailwind%20CSS&message=v3.*&color=38B2AC&style=flat-square&logo=tailwind-css&logoColor=ffffff)](https://tailwindcss.com/)

[![NodeJS](https://img.shields.io/static/v1?label=NodeJS&message=v16.14&color=339933&style=flat-square&logo=node.js&logoColor=ffffff)](https://nodejs.org/en)
[![pnpm](https://img.shields.io/static/v1?label=pnpm&message=v6.*&color=F69220&style=flat-square&logo=pnpm&logoColor=ffffff)](https://pnpm.io)

📀 [**bookshelves-project**](https://gitlab.com/bookshelves-project) : Bookshelves repository  
💻 [**bookshelves.ink**](https://bookshelves.ink): demo  
📚 [**documentation.bookshelves.ink**](https://bookshelves-documentation.netlify.app): documentation, if this link not work, you can check doc on [this repository](https://gitlab.com/bookshelves-project/bookshelves-doc)  

Works with [documentation](https://nuxtjs.org).

## Commands

```bash
npx nuxi upgrade
```

## **Setup**

Setup local on <http://localhost:3000> with <https://bookshelves.ink> API

Create `.env`

```bash
cp .env.example .env
```

Node.js dependencies

```bash
pnpm i --shamefully-hoist
```

Local serve

```bash
pnpm dev
```

### *Update API*

Update `.env` on `API_URL` to use local API

```yml
API_URL=http://localhost:8000
```

## **Production in SSR**

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
