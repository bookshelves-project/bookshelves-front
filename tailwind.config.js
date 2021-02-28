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
    container: {
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
        primary: {
          50: '#b3afe9',
          100: '#a19be4',
          200: '#8e87df',
          300: '#7b73d9',
          400: '#685fd4',
          500: '#554bcf',
          600: '#6C63FF',
          700: '#3c32b5',
          800: '#352ca1',
          900: '#2e278d',
        },
        cyan: colors.cyan,
      },
      fontFamily: {
        quicksand: ['Quicksand'],
        handlee: ['Handlee'],
      },
      maxWidth: {
        extra: '120rem',
      },
      backgroundImage: (theme) => ({
        library: "url('/images/background.jpg')",
      }),
    },
  },
  variants: {
    extend: {
      display: ['dark'],
      opacity: ['dark'],
      textColor: ['responsive', 'hover', 'focus', 'group-hover', 'dark'],
      scale: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      boxShadow: ['dark'],
      translate: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      backgroundColor: ['hover', 'focus', 'group-hover', 'dark'],
      backgroundOpacity: ['dark'],
      borderColor: ['hover', 'focus', 'group-hover'],
      borderRadius: ['dark'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-debug-screens'),
  ],
}
