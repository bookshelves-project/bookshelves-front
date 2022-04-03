import svgLoader from 'vite-svg-loader'
import { InlineConfig } from 'vite'

const vite: InlineConfig = {
  // vue: {
  //   reactivityTransform: true
  // }
  plugins: [svgLoader()],
}

export default vite
