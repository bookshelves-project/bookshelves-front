<template>
  <div class="fr-input-group">
    <label v-if="label" :for="name" class="fr-label">
      {{ label }}
      <span v-if="required" class="text-red-marianne"> * </span>
      <span v-if="helper" class="fr-hint-text">{{ helper }}</span>
    </label>
    <section v-if="gallery.length" class="fr-grid-row fr-grid-row--gutters">
      <div
        v-for="picture in gallery"
        :key="picture.id"
        class="fr-col-12 fr-col-md-6 fr-col-lg-4 relative"
        :class="filesToDeleted.includes(picture.id) ? 'fr-hidden' : ''"
      >
        <div>
          <a
            :href="picture.url"
            target="_blank"
            rel="noopener noreferrer"
            download
            style="box-shadow: none"
          >
            <elements-media-image :src="picture.url">
              {{ picture.alternativeText }}
            </elements-media-image>
          </a>
          <app-button
            class="delete-button"
            size="sm"
            icon="close-circle-line"
            @click="deleteItem(picture.id)"
          >
            Supprimer
          </app-button>
        </div>
      </div>
    </section>
    <fields-upload-files
      v-model="filesList"
      :accept="accept.accept"
      label="Téléverser plusieurs images"
      cta="Téléverser"
      :helper="accept.helper"
      @upload="upload"
    />
  </div>
</template>

<script>
export default {
  name: 'Gallery',
  props: {
    value: {
      default: () => {}
    },
    gallery: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: ''
    },
    accept: {
      type: Object,
      default: () => {}
    },
    name: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    helper: {
      type: String,
      default: ''
    },
    // Example
    // { form: form, entity: post, route: 'posts', media: 'pictures' }
    delete: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      filesList: [],
      filesToDeleted: []
    }
  },
  watch: {
    gallery(newValue) {
      if (newValue) {
        this.filesList = newValue.media
      }
    }
  },
  created() {
    if (this.gallery) {
      this.filesList = this.gallery
    }
  },
  methods: {
    deleteItem(id) {
      try {
        this.filesToDeleted.push(id)
        // await deleteMultipleFilesEntity(this.$strapi, id, this.delete)
      } catch (error) {
        console.error(error)
      }
    },
    upload(files) {
      this.$emit('input', files)
    }
  }
}
</script>

<style lang="postcss" scoped>
a::after {
  content: '';
}
</style>
