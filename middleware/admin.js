export default function ({ $auth, redirect }) {
  if ($auth.$state.loggedIn) {
    if (!$auth.$state.user.isAdmin) {
      return redirect('/')
    }
  }
}
