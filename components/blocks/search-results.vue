<template>
  <div>
    <divider> {{ entities.length }} {{ $capitalize(entityType) }}s </divider>
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
        <template v-if="entityType !== 'author'" #secondary>
          {{ entity.author }}
        </template>
        <template #tertiary>
          <div v-if="entity.serie" class="mt-5">
            <div class="font-semibold">Serie &#8212;</div>
            <div class="italic break-all">
              {{ entity.serie.title }}
            </div>
            <div>Vol. {{ entity.serie.number }}</div>
          </div>
        </template>
      </entity-card>
    </div>
  </div>
</template>

<script>
import divider from '../special/divider.vue'
import EntityCard from './entity-card.vue'
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
}
</script>
