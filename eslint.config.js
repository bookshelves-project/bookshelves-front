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