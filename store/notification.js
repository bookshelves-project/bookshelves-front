export const state = () => ({
  isVisible: false,
  title: 'Successfully saved!',
  text: 'Anyone with a link can now view this file.',
  type: 'success', // information, success, warning, error
})

export const getters = {
  getIsVisible: (state) => state.isVisible,
  getTitle: (state) => state.title,
  getText: (state) => state.text,
  getType: (state) => state.type,
}

export const mutations = {
  setIsVisible(state, isVisible) {
    state.isVisible = isVisible
  },
  setTitle(state, title) {
    state.title = title
  },
  setText(state, text) {
    state.text = text
  },
  setType(state, type) {
    state.type = type
  },
}
