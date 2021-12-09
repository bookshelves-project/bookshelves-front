<template>
  <div class="fr-input-group">
    <label v-if="label" :for="name" class="fr-label">
      {{ label }}
      <span v-if="required" class="text-red-marianne"> * </span>
      <span v-if="helper" class="fr-hint-text">
        {{ helper }} (fichiers multiples)
      </span>
    </label>
    <div class="fr-input-wrap">
      <input
        ref="file"
        type="file"
        style="display: none"
        :accept="accept"
        multiple
        @change="addFile"
      />
      <app-button type="button" @click="$refs.file.click()">
        {{ cta }}
      </app-button>
    </div>
    <!-- <fields-uploaded-files-list :files="uploadedFiles" @deleted="deleted" /> -->
    <div v-if="uploadedFiles.length" class="upload-files-list">
      <div>
        <h3>Fichiers à téléverser</h3>
        <app-button
          icon="close-circle-line"
          color="secondary"
          size="sm"
          @click="deleteAllPreviewFiles"
        >
          Tout supprimer
        </app-button>
      </div>
      <div class="fr-grid-row fr-grid-row--gutters">
        <div
          v-for="(file, id) in uploadedFiles"
          :key="id"
          class="fr-col-4 relative"
        >
          <elements-media-image :src="preview(file)">
            <div>
              {{ file.name }}
            </div>
            <div>
              {{ $humanFileSize(file.size) }}
            </div>
            <div>
              {{ $getFileType(file.type) }}
            </div>
          </elements-media-image>
          <app-button
            class="delete-button"
            size="sm"
            icon="close-circle-line"
            @click="deletePreviewFile(id)"
          >
            Supprimer
          </app-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'UploadFiles',
  props: {
    accept: {
      type: String,
      default: 'image/*'
    },
    value: {
      type: [Array, Object],
      default: () => {}
    },
    label: {
      type: String,
      default: ''
    },
    cta: {
      type: String,
      default: ''
    },
    helper: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      uploadedFiles: []
    }
  },
  computed: {
    ...mapGetters({
      // uploadedFiles: 'gallery/getUploadFiles',
    })
  },
  methods: {
    ...mapMutations({
      // setUploadFiles: 'gallery/setUploadFiles',
    }),
    addFile() {
      this.uploadedFiles.push(...this.$refs.file.files)
      this.$emit('upload', this.uploadedFiles)
    },
    deletePreviewFile(id) {
      this.uploadedFiles.splice(id, 1)
      this.$emit('upload', this.uploadedFiles)
    },
    deleteAllPreviewFiles() {
      this.uploadedFiles = []
      this.$emit('upload', this.uploadedFiles)
    },
    preview(newFile) {
      return URL.createObjectURL(newFile)
    }
  }
}
</script>

<style lang="postcss" scoped>
.preview-file {
  height: 15rem;
  width: 100%;
  object-fit: cover;
}
.upload-files-list {
  border: dashed 3px;
  border-color: $blue-france-200;
  padding: 2rem;
  margin: 1rem 0;
}
</style>
