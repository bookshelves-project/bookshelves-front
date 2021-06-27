# Bookshelves Front <!-- omit in toc -->

[![nuxtjs](https://img.shields.io/static/v1?label=NuxtJS&message=v2.15&color=00C58E&style=flat-square&logo=nuxt.js&logoColor=ffffff)](https://nuxtjs.org/)
[![tailwindcss](https://img.shields.io/static/v1?label=Tailwind%20CSS&message=v2.0&color=38B2AC&style=flat-square&logo=tailwind-css&logoColor=ffffff)](https://tailwindcss.com/)
[![nuxtjs](https://img.shields.io/static/v1?label=Designed%20to%20be&message=SSR&color=00C58E&style=flat-square&logo=nuxt.js&logoColor=ffffff)](https://nuxtjs.org/docs/2.x/concepts/server-side-rendering/)

[![NodeJS](https://img.shields.io/static/v1?label=NodeJS&message=v14.16&color=339933&style=flat-square&logo=node.js&logoColor=ffffff)](https://nodejs.org/en)
[![Yarn](https://img.shields.io/static/v1?label=Yarn&message=v1.2&color=2C8EBB&style=flat-square&logo=yarn&logoColor=ffffff)](https://classic.yarnpkg.com/lang/en/)

📀 [**bookshelves-back**](https://gitlab.com/ewilan-riviere/bookshelves-back) : back-end of Bookshelves  
🎨 [**bookshelves-front**](https://gitlab.com/ewilan-riviere/bookshelves-front) : front-end of Bookshelves (current repository)  

💻 [**bookshelves.ink**](https://bookshelves.ink): front demo  
📚 [**bookshelves.ink/api/documentation**](https://bookshelves.ink/api/documentation): Documentation API  
📚 [**bookshelves.ink/api/wiki**](https://bookshelves.ink/api/wiki): wiki for Bookshelves usage, if this link not work check [**files here**](https://gitlab.com/ewilan-riviere/bookshelves-back/-/tree/master/resources/views/pages/api/wiki/content)

**Table of contents**

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
yarn
```

Local serve

```bash
yarn dev
```

### *I. a. Modify API*

Modify `.env` on `API_URL` to use local API

```yml
API_URL=http://localhost:8000/api
```

## **II. Production in SSR**

Update `.env`

```yml
BASE_URL=https://bookshelves.ink
API_URL=https://bookshelves.ink/api
```

Setup build

```bash
yarn build
```

Launch server in SSR

```bash
yarn start
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## TODO <!-- omit in toc -->

- [ ] add last books added with random book cta
- [ ] add i18n
- [ ] skeleton nuxtjs: <https://stackoverflow.com/questions/57178253/how-to-create-skeleton-loading-in-nuxt-js>
- [ ] avif format: <https://www.zdnet.com/article/chrome-and-firefox-are-getting-support-for-the-new-avif-image-format/>
- [ ] jest:
  - <https://vue-test-utils.vuejs.org/>
  - <https://dev.to/bawa_geek/how-to-setup-jest-testing-in-nuxt-js-project-5c84>
  - <https://medium.com/@brandonaaskov/how-to-test-nuxt-stores-with-jest-9a5d55d54b28>
  - <https://dev.to/alousilva/how-to-mock-nuxt-client-only-component-with-jest-47da>
  - <https://stackoverflow.com/questions/41458736/how-to-write-test-that-mocks-the-route-object-in-vue-components>
- [ ] covers:
  - optimize:
    - <https://image.nuxtjs.org>
    - <https://github.com/juliomrqz/nuxt-optimized-images>
- [ ] design
  - buttons on book details stealth
  - review agile book selection (with vol 0)
  - agile language flag to text
  - review blocks order book detail (masonry or tailwind)
  - book detail agile same page refer change
  - book detail current vol remove
  - book list filter remove (refresh page not appear)
  - book list hover dark
  - content custom component for zoom on img
  - last books, book selection on home
  - list min height
  - search improve with options, add text to explain, change no result text
  - paginate design color for not available page
  - settings, update website name for vivacia
  - review title by og
  - jsonld, sitelinks
  - fix route generate
