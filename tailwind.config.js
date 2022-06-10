const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'components/**/*.{vue,js}',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'plugins/**/*.{js,ts}',
    'app.vue',
  ],
  darkMode: 'class',
  theme: {
    container: {
      padding: '1.25rem',
      center: true,
    },
    screens: {
      sm: '360px',
      md: '600px',
      lg: '900px',
      xl: '1300px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        orange: colors.orange,
        primary: {
          100: process.env.PRIMARY_COLOR_100 ?? '#e2e0ff',
          200: process.env.PRIMARY_COLOR_200 ?? '#c4c1ff',
          300: process.env.PRIMARY_COLOR_300 ?? '#a7a1ff',
          400: process.env.PRIMARY_COLOR_400 ?? '#8982ff',
          500: process.env.PRIMARY_COLOR_500 ?? '#6c63ff',
          600: process.env.PRIMARY_COLOR_600 ?? '#564fcc',
          700: process.env.PRIMARY_COLOR_700 ?? '#413b99',
          800: process.env.PRIMARY_COLOR_800 ?? '#2b2866',
          900: process.env.PRIMARY_COLOR_900 ?? '#161433',
        },
      },
      fontFamily: {
        handlee: ['Handlee'],
      },
      keyframes: {
        life: {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
      },
      animation: {
        life: 'life 3750ms linear forwards',
      },
    },
  },
  plugins: [
    plugin(({ addComponents, theme }) => {
      addComponents({
        '.main-content': {
          '@apply container !max-w-7xl lg:pt-6 pt-5 text-black dark:text-white':
            {},
        },
        '.main-block': {
          '@apply mx-auto max-w-md px-6 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8':
            {},
        },
        '.content-min-height': {
          '@apply min-h-[70vh]': {},
        },
        '.internal-link': {
          '@apply text-gray-900 transition-colors duration-100 border-b border-gray-500 dark:border-gray-100 dark:hover:border-gray-400 hover:border-gray-400 dark:text-gray-100 hover:text-gray-400 dark:hover:text-gray-400 !important':
            {},
        },
        '.word-wraping': {
          'text-align': 'justify',
          '-webkit-hyphens': 'auto',
          '-moz-hyphens': 'auto',
          '-ms-hyphens': 'auto',
          hyphens: 'auto',
        },
        '.display-grid': {
          '@apply grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-hidden':
            {},
        },
        '.text-gray': {
          '@apply text-gray-500 dark:text-gray-400': {},
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
        },
        '.debug-screens': {
          '@apply before:bottom-0 before:left-0 before:fixed before:px-1 before:text-sm before:bg-black before:text-white before:shadow-xl sm:before:content-["screen:sm"] md:before:content-["screen:md"] lg:before:content-["screen:lg"] xl:before:content-["screen:xl"] 2xl:before:content-["screen:2xl"] before:content-["screen:none"]':
            {},
          '&:before': {
            'z-index': '2147483647',
          },
        },
      })
    }),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}
