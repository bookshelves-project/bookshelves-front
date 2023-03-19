export const useScroll = () => {
  const isScroll = ref(false)
  const show = ref(true)
  const lastScrollPosition = ref(0)

  const handleScroll = () => {
    const currentScrollPosition
      = window.pageYOffset || document.documentElement.scrollTop
    if (currentScrollPosition < 0)
      return
    // Stop executing this function if the difference between
    // current scroll position and last scroll position is less than some offset
    if (Math.abs(currentScrollPosition - lastScrollPosition.value) < 60)
      return

    show.value = currentScrollPosition < lastScrollPosition.value
    lastScrollPosition.value = currentScrollPosition
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    isScroll,
    handleScroll,
    show,
    lastScrollPosition,
  }
}
