export const state = () => ({
  visibleLayer: false,
  visibleOverlay: false
})

export const getters = {
  isVisibleLayer: state => state.visibleLayer,
  isVisibleOverlay: state => state.visibleOverlay
}

export const mutations = {
  setVisibleLayer(state, data) {
    state.visibleLayer = data
  },
  setVisibleOverlay(state, data) {
    state.visibleOverlay = data
  }
}
