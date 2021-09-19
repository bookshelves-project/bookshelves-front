export default function ({ $auth, redirect }) {
  if ($auth.$state.loggedIn) {
    if (!$auth.$state.user.data.isAdmin) {
      return redirect('/')
    }
  }
}
