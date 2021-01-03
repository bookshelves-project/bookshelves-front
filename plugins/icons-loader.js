import Vue from 'vue'

const components = require.context('@/assets/icons/.?inline', false, /\.svg$/)

components.keys().forEach((fileName) => {
  const componentConfig = components(fileName)
  const componentName = fileName.split('/').pop().split('.')[0]

  Vue.component(
    `icon-${componentName}`,
    componentConfig.default || componentConfig
  )
})
