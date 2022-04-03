import { defineConfig } from 'windicss/helpers'
import formsPlugin from 'windicss/plugin/forms'
import typographyPlugin from 'windicss/plugin/typography'
import scrollbarPlugin from '@windicss/plugin-scrollbar'
import plugin from 'windicss/plugin'

const primary = {
  100: process.env.PRIMARY_COLOR_100 ?? '#e2e0ff',
  200: process.env.PRIMARY_COLOR_200 ?? '#c4c1ff',
  300: process.env.PRIMARY_COLOR_300 ?? '#a7a1ff',
  400: process.env.PRIMARY_COLOR_400 ?? '#8982ff',
  500: process.env.PRIMARY_COLOR_500 ?? '#6c63ff',
  600: process.env.PRIMARY_COLOR_600 ?? '#564fcc',
  700: process.env.PRIMARY_COLOR_700 ?? '#413b99',
  800: process.env.PRIMARY_COLOR_800 ?? '#2b2866',
  900: process.env.PRIMARY_COLOR_900 ?? '#161433',
}

export default defineConfig({
  extract: {
    include: ['**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules', '.git'],
  },
  darkMode: 'class',
  theme: {
    extend: {
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
      colors: {
        primary,
      },
      borderColor: {
        primary,
      },
      textColor: {
        primary,
      },
      fontFamily: {
        handlee: ['Handlee'],
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontFamily: 'Handlee',
            },
            h2: {
              fontFamily: 'Handlee',
            },
          },
        },
      },
    },
  },
  shortcuts: {
    'debug-screens':
      'before:bottom-0 before:left-0 before:fixed before:z-[2147483647] before:px-1 before:text-base before:bg-black before:text-white before:shadow-xl @sm:before:content-["screen:sm"] @md:before:content-["screen:md"] @lg:before:content-["screen:lg"] @xl:before:content-["screen:xl"] @2xl:before:content-["screen:2xl"] <sm:before:content-["screen:none"]',
    'display-grid':
      'grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-y-hidden',
    'main-content':
      'container !max-w-7xl lg:pt-6 pt-5 text-black dark:text-white',
    'content-min-height': 'min-h-[70vh]',
    // btn: 'inline-flex items-center rounded-md border text-base font-semibold transition-colors duration-100 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:focus:ring-gray-900 dark:focus:ring-offset-gray-800',
    // 'btn-secondary':
    //   'border-transparent bg-primary-100 text-primary-600 hover:bg-primary-200 hover:text-primary-600 dark:bg-primary-200 dark:text-gray-800 dark:hover:bg-primary-300',
    // 'btn-primary':
    //   'border-transparent bg-primary-600 text-white shadow-sm hover:bg-primary-500',
    // 'btn-white':
    //   'border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-primary-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
    // 'btn-danger':
    //   'border-red-300 bg-white text-red-700 shadow-sm hover:bg-red-100 dark:border-red-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-red-700',
    // 'btn-sm': 'px-2 py-1',
    // 'btn-md': 'px-4 py-2',
    // 'btn-lg': 'px-5 py-3',
    // 'btn-disabled': '!opacity-50 pointer-events-none',
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.word-wraping': {
          'text-align': 'justify',
          '-webkit-hyphens': 'auto',
          '-moz-hyphens': 'auto',
          '-ms-hyphens': 'auto',
          hyphens: 'auto',
        },
        '.word-wrap-break': {
          'word-wrap': 'break-word',
        },
        '.max-content': {
          width: 'max-content',
        },
      }
      addUtilities(newUtilities)
    }),
    formsPlugin,
    typographyPlugin({
      dark: true,
    }),
    scrollbarPlugin,
  ],
})
