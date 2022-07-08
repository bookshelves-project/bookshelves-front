const build = {
  postcss: {
    order: ['tailwindcss/nesting', 'tailwindcss', 'autoprefixer'],
    plugins: {
      'postcss-nested': false,
    },
  },
}

export default build
