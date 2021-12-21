<template>
  <div class="fr-input-group">
    <div>
      <label v-if="label" :for="name" class="fr-label">
        {{ label }}
        <span v-if="required" class="text-red-marianne">*</span>
        <span v-if="helper" class="fr-hint-text">{{ helper }}</span>
      </label>
    </div>
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-4 relative">
        <elements-media-image v-if="!preview" :src="file.url">
          <div v-if="file && file.name" class="italic">
            <div>{{ file.name }}</div>
            <div>{{ file.size }}</div>
          </div>
        </elements-media-image>
        <elements-media-image v-if="preview" :src="preview">
          <div class="italic">
            <div v-if="file.fileType">
              {{ $getFileType(file.fileType.type) }}
            </div>
            <div>{{ file.name }}</div>
            <div>{{ file.size }}</div>
          </div>
        </elements-media-image>
        <app-button
          v-if="file && file.url"
          icon="close-circle-line"
          class="delete-button"
          :style="{ 'top: 0': !preview }"
          size="sm"
          @click="deleteFile()"
        >
          Supprimer
        </app-button>
        <app-button
          v-if="fileUpoaded"
          icon="close-circle-line"
          class="delete-button"
          size="sm"
          @click="deletePreview()"
        >
          Supprimer
        </app-button>
      </div>
    </div>
    <div class="fr-input-wrap">
      <input
        ref="file"
        type="file"
        style="display: none"
        :accept="accept"
        @change="fileUpload"
      />
      <div class="flex items-center fr-mt-2w">
        <app-button @click="$refs.file.click()">Téléverser</app-button>
        <app-button
          v-if="file && file.url"
          :href="file.url"
          target="_blank"
          rel="noopener noreferrer"
          class="fr-ml-1w"
          download
        >
          Télécharger le fichier existant
        </app-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadFile',
  props: {
    accept: {
      type: String,
      default: 'image/*',
    },
    label: {
      type: String,
      default: 'Attach a file',
    },
    // adding
    value: {
      default: '',
    },
    name: {
      type: String,
      default: 'name',
    },
    type: {
      type: String,
      default: 'text',
    },
    autocomplete: {
      type: String,
      default: 'name',
    },
    required: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    minlength: {
      type: [Number, String],
      default: 0,
    },
    maxlength: {
      type: [Number, String],
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    helper: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      fileUpoaded: false,
      file: {
        name: null,
        size: null,
        mime: null,
        url: null,
        type: null,
      },
      preview: null,
    }
  },
  watch: {
    value: {
      handler(newValue, oldValue) {
        if (newValue !== null) {
          this.file = {
            id: newValue.id,
            name: newValue.name,
            size: this.$humanFileSize(newValue.size),
            url: newValue.url,
            mime: newValue.mime,
            fileType: newValue,
          }
        }
      },
      deep: true,
    },
  },
  mounted() {
    if (this.value) {
      this.file = {
        id: this.value.id,
        name: this.value.name,
        size: this.$humanFileSize(this.value.size),
        url: this.value.url,
        mime: this.value.mime,
        fileType: this.value,
      }
    }
  },
  methods: {
    deleteFile() {
      try {
        // await this.$strapi.delete('upload/files', this.file.id)
        this.$emit('deleteFile')
        this.file = {
          name: '',
          size: '',
        }
        this.$toast({ preType: 'success' })
      } catch (error) {
        this.$toast({ preType: 'error' })
      }
    },
    deletePreview() {
      this.preview = null
      this.file = ''
      this.fileUpoaded = false
      this.$emit('input', null)
    },
    fileUpload(event) {
      try {
        const file = event.target.files[0]
        this.preview = URL.createObjectURL(file)
        this.fileUpoaded = true
        this.file = file
        this.$emit('input', file)
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.preview {
  height: 100%;
  width: 14rem;
  object-fit: cover;
}
</style>
