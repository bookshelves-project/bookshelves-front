export const state = () => ({
  queries: {}
})

export const getters = {
  queries: state => state.queries
}

export const mutations = {
  setQueries(state, data) {
    state.queries = data
  }
}
