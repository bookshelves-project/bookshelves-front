export const state = () => ({
  sidebarOpened: false,
  layerVisible: false,
  layerOpacity: false,
  books: [],
  booksView: 'grid',
  navigation: [
    { label: 'Books', icon: 'book-open', route: 'books' },
    { label: 'Series', icon: 'book-open', route: 'series' },
    { label: 'Authors', icon: 'annotation', route: 'authors' },
    { label: 'Guides', icon: 'annotation', route: 'guides' },
  ],
  authNavigationTrue: [
    {
      label: 'Dashboard',
      icon: 'template',
      route: 'dashboard',
      isAdmin: false,
    },
    {
      label: 'Profile',
      icon: 'cog',
      route: 'profile',
      isAdmin: false,
    },
    {
      label: 'Control panel',
      icon: 'control',
      route: 'admin',
      isAdmin: true,
    },
  ],
  authNavigationFalse: [
    { label: 'Sign in', icon: 'login', route: 'login' },
    { label: 'Sign up', icon: 'register', route: 'register' },
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
  setLayerOpacity(state, data) {
    state.layerOpacity = data
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
