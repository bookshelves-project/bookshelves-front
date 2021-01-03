const colors = require('tailwindcss/colors')

module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  darkMode: 'class',
  purge: [
    'components/**/*.vue',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'plugins/**/*.js',
    'nuxt.config.js',
  ],
  theme: {
    screens: {
      sm: '320px',
      md: '500px',
      lg: '900px',
      xl: '1300px',
      '2xl': '1536px',
    },
    fontFamily: {},
    extend: {
      colors: {
        primary: {
          50: '#b3afe9',
          100: '#a19be4',
          200: '#8e87df',
          300: '#7b73d9',
          400: '#685fd4',
          500: '#554bcf',
          600: '#4338ca',
          700: '#3c32b5',
          800: '#352ca1',
          900: '#2e278d',
        },
        cyan: colors.cyan,
      },
    },
  },
  variants: {
    extend: {
      divideColor: ['group-hover'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
