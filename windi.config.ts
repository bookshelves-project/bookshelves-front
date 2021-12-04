import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'
import filtersPlugin from 'windicss/plugin/filters'
import formsPlugin from 'windicss/plugin/forms'
import aspectRatioPlugin from 'windicss/plugin/aspect-ratio'
import lineClampPlugin from 'windicss/plugin/line-clamp'
import typographyPlugin from 'windicss/plugin/typography'
import scrollbarPlugin from '@windicss/plugin-scrollbar'

export default defineConfig({
  darkMode: 'class',
  extract: {
    include: [
      'assets/**/*.css',
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  },
  safelist: [],
  theme: {
    container: {
      padding: '1.25rem',
      center: true
    },
    screens: {
      sm: '360px',
      md: '600px',
      lg: '900px',
      xl: '1300px',
      '2xl': '1536px',
      '3xl': '1920px'
    },
    extend: {
      colors: {
        orange: colors.orange,
        primary: {
          100: '#e2e0ff',
          200: '#c4c1ff',
          300: '#a7a1ff',
          400: '#8982ff',
          500: '#6c63ff',
          600: '#564fcc',
          700: '#413b99',
          800: '#2b2866',
          900: '#161433'
        }
      },
      fontFamily: {
        handlee: ['Handlee']
      }
    }
  },
  plugins: [
    filtersPlugin,
    formsPlugin,
    aspectRatioPlugin,
    lineClampPlugin,
    scrollbarPlugin,
    typographyPlugin({
      modifiers: ['DEFAULT', 'dark', 'sm', 'lg', 'red'],
      dark: true
    })
  ]
})
