<template>
  <div>
    <divider> {{ entities.length }} {{ capitalize(entityType) }}s </divider>
    <div class="space-y-6 display-grid sm:space-y-0">
      <entity-card
        v-for="entity in entities"
        :key="entity.id"
        :data="entity"
        :cover="entity.picture.base"
        :color="entity.picture.color"
        :title="entity.title"
        :limited-height="false"
        :route="{
          name: `${entity.meta.entity}s-slug`,
          params: {
            author: entity.meta.author,
            slug: entity.meta.slug,
          },
        }"
      >
        <template #primary>
          {{ $overflow(entity.title, 50) }}
        </template>
        <template #secondary>
          <div>
            <div>{{ capitalize(entity.meta.entity) }}</div>
            <div>
              <div v-if="entity.authors" class="mt-3">
                {{ formatAuthors(entity.authors) }}
              </div>
              <div v-if="entity.language" class="mt-3">
                {{ formatLanguage(entity.language) }}
              </div>
            </div>
          </div>
        </template>
        <template #tertiary>
          <div v-if="entity.serie" class="mt-5">
            <div class="font-semibold">Serie &#8212;</div>
            <div class="italic break-all">
              {{ entity.serie }}
            </div>
            <div>Vol. {{ entity.volume }}</div>
          </div>
        </template>
      </entity-card>
    </div>
  </div>
</template>

<script>
import divider from '../special/divider.vue'
import EntityCard from './entity-card.vue'
import {
  capitalize,
  formatLanguage,
  formatAuthors,
} from '~/plugins/utils/methods'

export default {
  name: 'SearchResults',
  components: { divider, EntityCard },
  props: {
    entityType: {
      type: String,
      default: 'book',
      validator: (val) => ['book', 'serie', 'author'].includes(val),
    },
    entities: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      capitalize,
      formatLanguage,
      formatAuthors,
    }
  },
}
</script>
