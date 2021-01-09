// export default function ({ store, route }) {
//   store.commit('initializeStore')

//   next()
// }

// router.beforeEach((to, from, next) => {
//   // Since `beforeEach` is invoked before `window.$nuxt` is
//   // initialized, use `setTimeout` without a timeout to wait
//   // until the next macro tick.

//   next()
// })

export default function ({ store, route }, next) {
  setTimeout(() => {
    store.commit('initializeStore')
  })

  next()
}
