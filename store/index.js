export const state = () => ({
  sidebarOpened: false,
  layerVisible: false,
  books: [],
  booksView: 'grid',
  navigation: [
    { label: 'Books', icon: 'book-open', route: 'books' },
    { label: 'Series', icon: 'book-open', route: 'series' },
    { label: 'Authors', icon: 'annotation', route: 'authors' },
    { label: 'Guides', icon: 'annotation', route: 'guides' },
  ],
  authNavigationTrue: [
    { label: 'Dashboard', icon: 'book-open', route: 'dashboard' },
  ],
  authNavigationFalse: [
    { label: 'Sign in', icon: 'book-open', route: 'sign-in' },
    { label: 'Sign up', icon: 'book-open', route: 'sign-up' },
  ],
  design: ['bibliophile', 'book-lover', 'bookmark'],
  showAlert: false,
  alert: {
    type: 'warning',
    title: 'Oops!',
    message: 'This action is not possible.',
  },
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
  setMetaDescription(state, data) {
    state.metaDescription = data
  },
  setMetaPicture(state, data) {
    state.metaPicture = data
  },
  toggleShowAlert(state) {
    state.showAlert = !state.showAlert
  },
  setShowAlert(state, data) {
    state.showAlert = data
  },
  setAlertMessage(state, data) {
    state.alert = data
  },
}
