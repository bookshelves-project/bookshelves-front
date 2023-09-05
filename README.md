# Bookshelves · Front <!-- omit in toc -->

[![nuxt](https://img.shields.io/static/v1?label=Nuxt&message=v3.x&color=00C58E&style=flat-square&logo=nuxt.js&logoColor=ffffff)](https://nuxtjs.org/)
[![nuxt-ssr](https://img.shields.io/static/v1?label=Designed%20to%20be&message=SSR&color=00C58E&style=flat-square&logo=nuxt.js&logoColor=ffffff)](https://nuxtjs.org/docs/concepts/server-side-rendering/)
[![tailwindcss](https://img.shields.io/static/v1?label=Tailwind%20CSS&message=v3.x&color=38B2AC&style=flat-square&logo=tailwind-css&logoColor=ffffff)](https://tailwindcss.com/)

[![node](https://img.shields.io/static/v1?label=NodeJS&message=v16.x&color=339933&style=flat-square&logo=node.js&logoColor=ffffff)](https://nodejs.org/en)
[![pnpm](https://img.shields.io/static/v1?label=pnpm&message=v7.x&color=F69220&style=flat-square&logo=pnpm&logoColor=ffffff)](https://pnpm.io)

<https://img.shields.io/badge/dynamic/json?url=https://gitlab.com/bookshelves-project/bookshelves-front/-/raw/main/package.json&label=Nuxt.js&query=$.devDependencies.nuxt&color=00C58E&prefix=v&style=flat-square&logo=nuxt.js&logoColor=ffffff>
<https://img.shields.io/badge/dynamic/json?url=https://gitlab.com/bookshelves-project/bookshelves-front/-/raw/main/package.json&label=Tailwind%20CSS&query=$.devDependencies.tailwindcss&color=38B2AC&prefix=v&style=flat-square&logo=tailwind-css&logoColor=ffffff>
<https://img.shields.io/badge/dynamic/json?url=https://gitlab.com/bookshelves-project/bookshelves-front/-/raw/main/package.json&label=Node.js&query=$.engines.node&color=339933&prefix=v&style=flat-square&logo=node.js&logoColor=ffffff>
<https://img.shields.io/badge/dynamic/json?url=https://gitlab.com/bookshelves-project/bookshelves-front/-/raw/main/package.json&label=pnpm&query=$.engines.pnpm&color=F69220&prefix=v&style=flat-square&logo=pnpm&logoColor=ffffff>

<https://jsonpath.com>

- 📀 [**bookshelves-project**](https://github.com/bookshelves-project) : Bookshelves repository
- 💻 [**bookshelves.ink**](https://bookshelves.ink): demo
- 📚 [**documentation.bookshelves.ink**](https://bookshelves-documentation.netlify.app): documentation, if this link not work, you can check doc on [this repository](https://github.com/bookshelves-project/bookshelves-doc)

Works with [documentation](https://nuxtjs.org).

## Commands

To upgrade

<https://github.com/nuxt/framework/releases/tag/v3.0.0-rc.13>

```bash
npx nuxi-edge@latest upgrade --force // Automated
```

Manual: Bump `nuxt` dependency to `3.0.0-rc.13` and then use `npx nuxi-edge@latest cleanup` to cleanup any local caches

_OR_

Bump `nuxt` dependency to `npm:nuxt3@latest` and then use `npx nuxi-edge@latest cleanup` to cleanup any local caches

## **Setup**

Setup local on <http://localhost:3000> with <https://bookshelves.ink> API

Create `.env`

```bash
cp .env.example .env
```

Node.js dependencies

```bash
pnpm i
```

Local serve

```bash
pnpm dev
```

### _Update API_

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
pnpm build
```

Launch server in SSR

```bash
pnpm start
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
