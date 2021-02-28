export const state = () => ({
  isVisible: false,
})

export const mutations = {
  setIsVisible(state, data) {
    state.isVisible = data
  },
}
