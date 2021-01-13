import Vue from 'vue'

const global = require.context(
  '@/components/common/content',
  true,
  /[a-z]\w+\.(vue)$/
)

global.keys().forEach((fileName) => {
  const componentConfig = global(fileName)
  const componentName = fileName.split('/').pop().split('.')[0]

  Vue.component(componentName, componentConfig.default || componentConfig)
})

const layout = require.context('@/components/layout', true, /[a-z]\w+\.(vue)$/)

layout.keys().forEach((fileName) => {
  const componentConfig = layout(fileName)
  const componentName = fileName.split('/').pop().split('.')[0]

  Vue.component(componentName, componentConfig.default || componentConfig)
})
