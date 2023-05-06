import type { ApiData, Entity, SelectedEntities } from '~/types'

export function useEntityGroup(selection: SelectedEntities) {
  const isAvailable = ref(true)
  const isLoading = ref(true)

  const slides = ref<Entity[]>()

  const getData = async () => {
    isLoading.value = true

    const response = await useHttp<ApiData<Entity[]>>({
      name: selection.name,
      params: selection.params ? selection.params : <any>[],
      // extractData: true,
    })

    if (response?.value?.ok) {
      isLoading.value = false
      if (response.value._data?.data.length === 0)
        isAvailable.value = false

      slides.value = response.value._data?.data
    }
    else {
      isAvailable.value = false
    }
  }

  return {
    isAvailable,
    isLoading,
    getData,
    slides,
  }
}
