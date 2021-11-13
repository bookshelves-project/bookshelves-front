export const state = () => ({
  modalOpened: false,
})

export const mutations = {
  setModalOpened(state, data) {
    state.modalOpened = data
  },
}
