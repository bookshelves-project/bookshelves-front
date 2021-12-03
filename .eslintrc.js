// module.exports = {
//   // root: true,
//   // env: {
//   //   browser: true,
//   //   node: true,
//   // },
//   parser: 'vue-eslint-parser',
//   extends: [
//     '@nuxtjs/eslint-config-typescript',
//     'plugin:nuxt/recommended',
//     'prettier',
//     // '@nuxtjs/eslint-config-typescript',
//     // 'plugin:@typescript-eslint/recommended',
//     // 'plugin:vue/recommended',
//   ],
//   plugins: [],
//   // add your custom rules here
//   rules: {

//   },
// }

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    // '@typescript-eslint/explicit-function-return-type': ['error'],
    // 'lines-between-class-members': [
    //   'error',
    //   'always',
    //   { exceptAfterSingleLine: true },
    // ],
    // 'space-before-function-paren': ['error'],
    'vue/multi-word-component-names': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-v-html': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off',
  },
}
