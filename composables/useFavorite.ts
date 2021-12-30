import { ApiEndpoint, Entity, ToastAuto, ToastType } from '~/types'

const useFavorite = (entity: Entity) => {
  const { $repository, params, $toast } = useContext()
  const isFavorite = ref(false)
  const favoritesList = ref([])

  const checkFavorite = () => {
    isFavorite.value = entity ? (entity?.isFavorite as boolean) : false
  }
  const toggleFavorite = async () => {
    isFavorite.value = !isFavorite.value
    const data = await $repository(ApiEndpoint.FavoriteToggle, false).update({}, [
      entity.meta.entity as string,
      params.value.slug
    ])

    if (data.status === 200) {
      $toast(
        'Success',
        'Your favorites has been updated!',
        ToastType.success
      )
    } else {
      $toast(
        'Error',
        'Oops! Sorry, we will fix this soon.',
        ToastType.error
      )
    }
  }

  onMounted(() => {
    checkFavorite()
  })

  return {
    isFavorite: readonly(isFavorite),
    favoritesList: readonly(favoritesList),
    checkFavorite,
    toggleFavorite,
  }
}

export default useFavorite
