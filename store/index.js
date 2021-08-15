export const state = () => ({
  sidebarOpened: false,
  layerVisible: false,
  layerOpacity: false,
  statistics: null,
})

export const mutations = {
  setStatistics(state, data) {
    state.statistics = data
  },
  toggleSidebar(state, data) {
    state.sidebarOpened = !state.sidebarOpened
  },
  setSidebar(state, data) {
    state.sidebarOpened = data
  },
  setLayer(state, data) {
    state.layerVisible = data
  },
  setLayerOpacity(state, data) {
    state.layerOpacity = data
  },
}
