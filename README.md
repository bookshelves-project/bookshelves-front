# Bookshelves Front <!-- omit in toc -->

[![nuxtjs](https://img.shields.io/static/v1?label=NuxtJS&message=v2.14&color=00C58E&style=flat-square&logo=nuxt.js&logoColor=ffffff)](https://nuxtjs.org/)
[![tailwindcss](https://img.shields.io/static/v1?label=Tailwind%20CSS&message=v2.0&color=38B2AC&style=flat-square&logo=tailwind-css&logoColor=ffffff)](https://tailwindcss.com/)

[![NodeJS](https://img.shields.io/static/v1?label=NodeJS&message=v14.15&color=339933&style=flat-square&logo=node.js&logoColor=ffffff)](https://nodejs.org/en)
[![Yarn](https://img.shields.io/static/v1?label=Yarn&message=v1.2&color=2C8EBB&style=flat-square&logo=yarn&logoColor=ffffff)](https://classic.yarnpkg.com/lang/en/)

- 📀 [**bookshelves-back**](https://gitlab.com/EwieFairy/bookshelves-back) : back-end of Bookshelves
- 🎨 [**bookshelves-front**](https://gitlab.com/EwieFairy/bookshelves-front) : front-end of Bookshelves (current repository)
- 💻 [**bookshelves.git-projects.xyz**](https://bookshelves.git-projects.xyz) : preprod
- 📚 [**Documentation**](https://bookshelves.git-projects.xyz/api/documentation)

---

**Table of contents**

- [TODO](#todo)
- [**I. Setup**](#i-setup)
  - [**I. a. Production**](#i-a-production)

---

## TODO

- book grid: add full title on hover
- author sort by serie with divider
- add last books added with random book cta
- entity card book add lang
- add dark mode
- add i18n
- check h1, h2, h3
- skeleton nuxtjs: <https://stackoverflow.com/questions/57178253/how-to-create-skeleton-loading-in-nuxt-js>
- pagination
  - <https://medium.com/@rafaelogic/create-a-reusable-pagination-vue-js-component-with-laravel-and-tailwind-css-c2e5c49bd93>
  - <https://github.com/tailable/pagination>
- avif format: <https://www.zdnet.com/article/chrome-and-firefox-are-getting-support-for-the-new-avif-image-format/>
- jest:
  - <https://vue-test-utils.vuejs.org/>
  - <https://dev.to/bawa_geek/how-to-setup-jest-testing-in-nuxt-js-project-5c84>
  - <https://medium.com/@brandonaaskov/how-to-test-nuxt-stores-with-jest-9a5d55d54b28>
  - <https://dev.to/alousilva/how-to-mock-nuxt-client-only-component-with-jest-47da>
  - <https://stackoverflow.com/questions/41458736/how-to-write-test-that-mocks-the-route-object-in-vue-components>
  - For global variables check test of Nuxt modules
    - <https://github.com/nuxt-community/color-mode-module>

## **I. Setup**

Setup local on <http://localhost:3000>

```bash
cp .env.example .env ; yarn ; yarn dev
```

### **I. a. Production**

Setup build

```bash
yarn build
```

Launch server in SSR

```bash
yarn start
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
