<template>
  <div class="inline-block">
    <label
      v-if="!disable"
      for="rating"
      class="
        sr-only
        block
        text-sm
        font-medium
        text-gray-700
        dark:text-gray-100
        sm:mt-px sm:pt-2
      "
    >
      Rating
    </label>
    <div @mouseleave="disable ? '' : set(0)">
      <div
        id="rating"
        name="rating"
        class="flex items-center space-x-1y"
        :class="{ 'py-2': !disable }"
      >
        <div
          v-for="(star, id) in stars"
          :key="id"
          class="text-gray-400 dark:text-gray-300"
          :class="[
            {
              'text-yellow-300 dark:text-yellow-400': currentColor.includes(
                id + 1
              ),
            },
            { 'cursor-pointer': !disable },
          ]"
          @mouseover="disable ? '' : set(id + 1)"
          @click="disable ? '' : save(id + 1)"
        >
          <svg-icon
            :name="currentRating >= star ? 'star-full' : 'star'"
            :class="[
              currentRating >= star
                ? 'text-yellow-300 dark:text-yellow-400'
                : '',
              disable ? 'w-5 h-5' : 'w-8 h-8',
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FieldsRatingStar',
  props: {
    value: {
      type: Number,
      default: null
    },
    rating: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 5
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      stars: 0,
      current: 0,
      currentColor: [],
      currentRating: 0
    }
  },
  watch: {
    rating(newValue, oldValue) {
      this.currentRating = newValue
    },
    value(newValue, oldValue) {
      this.currentRating = newValue
    }
  },
  created() {
    this.stars = this.max
    this.currentRating = this.value || this.rating
  },
  methods: {
    starIcon(star) {
      //   return this.currentRating >= star
      //     ? 'star-full'
      //     : this.currentRating > star - 1
      //     ? 'star-half'
      //     : 'star'
    },
    set(id) {
      this.current = id
      let full = []
      switch (this.current) {
        case 5:
          full = [
            1,
            2,
            3,
            4,
            5
          ]
          break
        case 4:
          full = [
            1,
            2,
            3,
            4
          ]
          break
        case 3:
          full = [
            1,
            2,
            3
          ]
          break
        case 2:
          full = [
            1,
            2
          ]
          break
        case 1:
          full = [1]
          break
        default:
          break
      }
      this.currentColor = full
    },
    save(id) {
      this.currentRating = id
      this.$emit('input', id)
    }
  }
}
</script>
