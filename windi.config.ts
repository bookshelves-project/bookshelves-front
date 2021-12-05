import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'

export default defineConfig({
  darkMode: 'class',
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
  shortcuts: {
    'debug-screens': 'before:bottom-0 before:left-0 before:fixed before:z-[2147483647] before:px-1 before:text-sm before:bg-black before:text-white before:shadow-xl @sm:before:content-["screen:sm"] @md:before:content-["screen:md"] @lg:before:content-["screen:lg"] @xl:before:content-["screen:xl"] @2xl:before:content-["screen:2xl"] <sm:before:content-["screen:none"]'
  },
  plugins: [
    // require('windicss/plugin/filters'),
    require('windicss/plugin/forms'),
    require('windicss/plugin/aspect-ratio'),
    require('windicss/plugin/line-clamp'),
    require('@windicss/plugin-scrollbar'),
    require('windicss/plugin/typography')
    // typographyPlugin({
    //   modifiers: ['DEFAULT', 'dark', 'sm', 'lg', 'red'],
    //   dark: true
    // })
  ]
})
