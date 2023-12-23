// {
//   "extends": "@antfu",
//   "rules": {
//     "prefer-const": "warn",
//     "no-unused-vars": "warn",
//     "no-console": [
//       "warn",
//       {
//         "allow": ["warn", "error"]
//       }
//     ],
//     "space-before-function-paren": "off",
//     "func-call-spacing": "off",
//     "vue/multi-word-component-names": "off",
//     "vue/no-unused-vars": "warn",
//     "vue/no-v-html": "off",
//     "@typescript-eslint/no-unused-vars": "warn"
//   }
// }eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    'node_modules',
    '*.log*',
    '.nuxt',
    '.nitro',
    '.cache',
    '.output',
    '.env',
    'dist',
  ],
}, {
  rules: {
    'no-console': 'warn',
    'node/prefer-global/process': 'off',
  },
})