export const useEntityGroup = (selection: SelectedEntities) => {
  const { nuxtAsyncData } = useFetchable()

  const isAvailable = ref(true)
  const isLoading = ref(true)

  const slides = ref<Entity[]>()

  const getData = async () => {
    isLoading.value = true
    slides.value = await nuxtAsyncData<Entity[]>(
      selection.endpoint,
      selection.paramsList ? selection.paramsList : [],
      {}
    ).then((e) => {
      if (e) {
        isLoading.value = false
        if (e.length === 0) {
          isAvailable.value = false
        }
        return e
      } else {
        isAvailable.value = false
      }
    })
  }

  return {
    isAvailable,
    isLoading,
    getData,
    slides,
  }
}
