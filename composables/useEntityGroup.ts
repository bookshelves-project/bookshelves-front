import type { ApiData, Entity, SelectedEntities } from '~/types'

export function useEntityGroup(selection: SelectedEntities) {
  const isAvailable = ref(true)
  const isLoading = ref(true)

  const slides = ref<Entity[]>()

  const getData = async () => {
    isLoading.value = true

    const response = await useHttp<ApiData<Entity[]>>({
      name: selection.endpoint,
      params: selection.params ? selection.params : <any>[],
      auto: false,
    })

    if (response) {
      isLoading.value = false
      if (response.data.length === 0)
        isAvailable.value = false

      slides.value = response.data
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
