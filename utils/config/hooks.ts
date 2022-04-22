import type { Plugin } from 'postcss'

const order = (names: Plugin[]) => {
  const tailwindNesting = names.splice(
    names.findIndex((plugin) => plugin.postcssPlugin === 'tailwindcss/nesting'),
    1
  )[0]
  names.unshift(tailwindNesting)
}

const hooks = {
  // 'vite:extend'({ config }) {
  //   order(config.css.postcss.plugins)
  // },
  // 'content:file:beforeInsert': (document: any) => {
  //   if (document.extension === '.md') {
  //     // eslint-disable-next-line @typescript-eslint/no-var-requires
  //     const readingTime = require('reading-time')
  //     const stats = readingTime(document.text)
  //     document.readingTime = stats
  //   }
  // }
}

export default hooks
