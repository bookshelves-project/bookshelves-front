import fs from 'fs'
import { Plugin } from 'vite'

interface Options {
  path: string
  extension: string
}

// const loadSvg = (options: Options) => {
//   let types = ''
//   fs.readdirSync(options.path).forEach((file) => {
//     const svgName = file.replace('.svg', '')
//     types += ` '${svgName}' |`
//   })
//   types = types.slice(0, -2)
//   fs.writeFileSync('./.nuxt/types/svg-library.ts', `export type SvgLibrary =${types}\n`)
// }

const loadVueComponents = (options: Options) => {
  let types = ''
  fs.readdirSync(options.path).forEach((file) => {
    const name = file.replace(`.${options.extension}`, '')
    types += ` '${name}' |`
  })
  types = types.slice(0, -2)
  fs.writeFileSync('./.nuxt/types/svg-library.ts', `export type SvgLibrary =${types}\n`)
}

export default function plugin(options: Options = {
  path: './assets/icons',
  extension: 'svg'
}): Plugin {
  return {
    name: 'svg-library',

    buildStart() {
      loadVueComponents(options)
    },
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.svg')) {
        server.restart()
        loadVueComponents(options)
      }
    }
  }
}
