const postcss = {
  postcssOptions: {
    plugins: {
      'postcss-import': true,
      'tailwindcss/nesting': {},
      'postcss-nested': {},
    }
  }
}

const build = {
  // postcss: postcss,
}

export default build