<script setup lang="ts">
import SvgIcon from '@/components/svg-icon.vue'
import AppImg from '@/components/app/img.vue'
import FieldText from '@/components/field/text.vue'
import FieldRatingStars from '@/components/field/rating-stars.vue'

const form = ref({
  text: '',
  rating: 0,
})

const config = useRuntimeConfig()

const loggedIn = ref(false)
const emit = defineEmits(['refresh'])

const submit = async () => {
  // const { name, params } = useRoute()
  // const slug = params.slug
  // try {
  // const entity = name.split('-')[0].slice(0, -1)
  // await this.$axios.$post(`/reviews/store/${entity}/${slug}`, this.form)
  // form.value.text = ''
  // form.value.rating = 0
  // this.$nuxt.$emit('toast', {
  //   title: 'Success!',
  //   text: 'Thanks you for your review.',
  //   type: 'success',
  // })
  // } catch (error) {
  // this.$nuxt.$emit('toast', {
  //   title: 'Error',
  //   text: error.response.data.error,
  //   type: 'error',
  // })
  // }
  // emit('refresh', slug)
}
</script>

<template>
  <div class="p-2">
    <transition>
      <div v-if="loggedIn" class="flex space-x-3">
        <!-- <field-review /> -->
        <div class="shrink-0 hidden md:block">
          <!-- <app-img
            :src="$auth.$state.user.data.avatar"
            class="w-10 h-10 rounded-full"
            :alt="$auth.$state.user.data.username"
          /> -->
        </div>
        <div class="flex-1 min-w-0">
          <form @submit.prevent="submit">
            <field-text
              id="text"
              v-model="form.text"
              name="text"
              rows="3"
              :maxlength="1500"
              placeholder="Add a review*"
              multiline
            />
            <field-rating-stars
              v-if="config.moduleSocialRating"
              v-model="form.rating"
              class="mt-1 mb-1"
            />
            <div class="flex items-center justify-between mt-1">
              <a
                href="https://www.markdownguide.org/cheat-sheet/"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
              >
                <svg-icon
                  name="question-mark-circle"
                  class="shrink-0 w-5 h-5"
                />
                <span>You can use Markdown.</span>
              </a>
              <button
                type="submit"
                :class="
                  form.text === ''
                    ? 'bg-primary-400 text-gray-300 cursor-not-allowed'
                    : 'hover:bg-primary-600 bg-primary-600 text-white'
                "
                class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600"
                :disabled="form.text === ''"
              >
                Post a review
              </button>
            </div>
          </form>
        </div>
      </div>
      <div v-else class="text-gray-400 italic">
        You must be logged in to post a review.
      </div>
    </transition>
  </div>
</template>
