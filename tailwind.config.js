/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
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
          100: '#e2e0ff',
          200: '#c4c1ff',
          300: '#a7a1ff',
          400: '#8982ff',
          500: '#6c63ff',
          600: '#564fcc',
          700: '#413b99',
          800: '#2b2866',
          900: '#161433',
        },
      },
      fontFamily: {
        handlee: ['Handlee'],
      },
      // https://github.com/tailwindlabs/tailwindcss-typography#customizing-shared-styles
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              fontWeight: theme('fontWeight.semibold'),
              // color: theme('colors.primary.400'),
              // margin: '0 !important',
            },
            'a:hover': {
              color: theme('colors.primary.600'),
            },
            h1: {
              fontFamily: theme('fontFamily.quicksand'),
            },
            h2: {
              'margin-top': theme('margin.12') + ' !important',
              'margin-bottom': theme('margin.8') + ' !important',
              fontSize: theme('fontSize.xl'),
              fontFamily: theme('fontFamily.quicksand'),
              width: 'max-content',
            },
            'h2::after': {
              display: 'block',
              width: theme('width.4/5'),
              'margin-top': theme('margin.2') + ' !important',
              'margin-bottom': theme('margin.1') + ' !important',
              'border-radius': theme('borderRadius.md') + ' !important',
              'border-width': theme('borderWidth.2'),
              'border-color': theme('borderColor.primary.600'),
            },
            h3: {
              'margin-top': theme('margin.10') + ' !important',
              'margin-bottom': theme('margin.8') + ' !important',
              fontSize: theme('fontSize.xl'),
              fontFamily: theme('fontFamily.quicksand'),
              width: 'max-content',
            },
            'h3::after': {
              display: 'block',
              width: theme('width.4/5'),
              'margin-top': theme('margin.2') + ' !important',
              'margin-bottom': theme('margin.1') + ' !important',
              'border-width': theme('borderWidth.2'),
              'border-color': theme('borderColor.primary.600'),
              'border-style': 'dashed',
            },
            h4: {
              'margin-top': theme('margin.8') + ' !important',
              'margin-bottom': theme('margin.8') + ' !important',
              fontSize: theme('fontSize.xl.text') + ' !important',
              fontFamily: theme('fontFamily.quicksand'),
              width: 'max-content',
            },
            'h4::after': {
              display: 'block',
              width: theme('width.5/5'),
              'margin-top': theme('margin.2') + ' !important',
              'margin-bottom': theme('margin.1') + ' !important',
              'border-radius': theme('borderRadius.md') + ' !important',
              'border-width': theme('borderWidth.1'),
              'border-color': theme('borderColor.primary.600'),
              'border-style': 'solid',
            },
            h5: {
              'margin-top': theme('margin.8') + ' !important',
              'margin-bottom': theme('margin.8') + ' !important',
              fontSize: theme('fontSize.text.lg') + ' !important',
              fontFamily: theme('fontFamily.quicksand'),
              width: 'max-content',
            },
            blockquote: {
              // fontWeight: '400',
              // color: theme('colors.gray.600'),
              // fontStyle: 'normal',
              // quotes: '"\\201C""\\201D""\\2018""\\2019"',
            },
            // 'blockquote p:first-of-type::before': {
            //   content: '',
            // },
            // 'blockquote p:last-of-type::after': {
            //   content: '',
            // },
            code: {
              fontFamily: theme('fontFamily.mono'),
              backgroundColor: theme('colors.gray.200'),
              padding: theme('padding.1'),
              borderRadius: theme('borderRadius.sm'),
            },
            pre: {
              fontFamily: theme('fontFamily.mono'),
            },
          },
        },
        light: {
          css: {
            color: theme('colors.gray.100'),
            '[class~="lead"]': {
              color: theme('colors.gray.100'),
            },
            a: {
              color: theme('colors.primary.300'),
            },
            'a:hover': {
              color: theme('colors.primary.500'),
            },
            p: {
              color: theme('colors.gray.100'),
            },
            strong: {
              color: theme('colors.gray.100'),
            },
            pre: {
              backgroundColor: theme('colors.gray.800'),
            },
            h1: {
              color: theme('colors.gray.100'),
            },
            h2: {
              color: theme('colors.gray.100'),
            },
            h3: {
              color: theme('colors.gray.100'),
            },
            h4: {
              color: theme('colors.gray.100'),
            },
            h5: {
              color: theme('colors.gray.100'),
            },
            'ol > li::before': {
              color: theme('colors.gray.400'),
            },
            'ul > li::before': {
              backgroundColor: theme('colors.gray.600'),
            },
            hr: {
              borderColor: theme('colors.gray.700'),
            },
            blockquote: {
              color: theme('colors.gray.400'),
              borderLeftColor: theme('colors.gray.700'),
            },
            'figure figcaption': {
              color: theme('colors.gray.400'),
            },
            'a code': {
              color: theme('colors.primary.500'),
            },
            thead: {
              color: theme('colors.gray.100'),
              borderBottomColor: theme('colors.gray.600'),
            },
            'tbody tr': {
              borderBottomColor: theme('colors.gray.700'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.main-content': {
          padding: theme('spacing.3'),
        },
      })
    }),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-debug-screens'),
    require('tailwind-scrollbar'),
  ],
}
