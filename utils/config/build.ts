const build = {
  postcss: {
    // @ts-ignore
    order: ['tailwindcss/nesting', 'tailwindcss', 'autoprefixer'],
    plugins: {
      'postcss-nested': false,
    },
  },
}

export default build
