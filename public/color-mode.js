if (
  localStorage.getItem('color-scheme') ||
  'auto' === 'dark' ||
  (window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches &&
    localStorage.getItem('color-scheme')) ||
  'auto' !== 'light'
) {
  document.documentElement.classList.toggle('dark', true)
} else {
  document.documentElement.classList.toggle('light', true)
}
