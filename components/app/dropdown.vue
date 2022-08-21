<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'

interface Props {
  align?: 'left' | 'right'
  arrow?: boolean
  autoClose?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  align: 'right',
  arrow: false,
  autoClose: false
})

type Platform = 'desktop' | 'mobile'
const platform = ref<Platform>('desktop')
const isMobile = ref(false)

const opened = ref(false)
const dropdown = ref(false)
const overlay = ref(false)

const target = ref<HTMLElement>()

const toggle = () => {
  if (opened.value) {
    closeDropdown()
  } else {
    openDropdown()
  }
}

const openDropdown = () => {
  opened.value = true
  setTimeout(() => {
    overlay.value = true
    dropdown.value = true
  }, 150)
}
const closeDropdown = () => {
  dropdown.value = false
  overlay.value = false
  setTimeout(() => {
    opened.value = false
  }, 150)
}

const alignmentClasses = computed((): string => {
  if (props.align === 'left') {
    return 'origin-top-left left-0'
  } else if (props.align === 'right') {
    return 'origin-top-right right-0'
  } else {
    return 'origin-top'
  }
})

onClickOutside(target, () => closeDropdown())

onMounted(() => {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile.value = true
    platform.value = 'mobile'
  }
})
</script>

<template>
  <div class="relative">
    <div class="cursor-pointer" @click="toggle()">
      <slot name="trigger" />
    </div>
    <div v-if="opened">
      <div v-if="isMobile">
        <Teleport to="body">
          <div>
            <Transition>
              <div
                v-if="overlay"
                class="fixed inset-0 z-40 bg-gray-500 dark:bg-gray-700 opacity-75"
                aria-hidden="true"
              />
            </Transition>
            <div ref="target" class="fixed bottom-0 z-50 w-full">
              <div
                :class="dropdown ? '-translate-y-0' : 'translate-y-full'"
                class="bg-gray-100 dark:bg-gray-800 mx-2 rounded-t-md pb-3 px-3 pt-3 shadow-xl transition duration-300 ease-in-out text-center font-semibold"
              >
                <slot name="content" />
              </div>
            </div>
          </div>
        </Teleport>
      </div>
      <div v-else>
        <Transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <div
            v-show="dropdown"
            ref="target"
            :class="[alignmentClasses]"
            class="bg-gray-50 dark:bg-gray-800 shadow w-max p-1.5 rounded-md absolute top-10 text-left dark:border-gray-700 border border-transparent"
            @click="autoClose ? closeDropdown() : ''"
          >
            <slot name="content" />
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
