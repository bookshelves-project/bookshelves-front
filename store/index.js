export const state = () => ({
  sidebarOpened: false,
  layerVisible: false,
  books: [],
  booksView: 'list',
})

export const mutations = {
  toggleSidebar(state, data) {
    state.sidebarOpened = !state.sidebarOpened
  },
  setBooksView(state, data) {
    state.booksView = data
  },
  setSidebar(state, data) {
    state.sidebarOpened = data
  },
  setLayer(state, data) {
    state.layerVisible = data
  },
  setBooks(state, data) {
    state.books = data
  },
  initializeStore() {
    // const bookView = localStorage.getItem('books-view')
    // console.log(bookView)
    // if (bookView) {
    //   state.bookView = 'grid'
    // }
  },
}
