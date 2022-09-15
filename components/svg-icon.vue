<script lang="ts" setup>
// import type { SvgLibrary } from '@/.nuxt/types/svg-library'

const props = defineProps<{
  name?: string
}>()

// const currentIcon = computed(() =>
//   defineAsyncComponent({
//     loader: () => import(`@/assets/svg/${props.name}.svg`),
//     loadingComponent: {
//       template: '<span></span>'
//     },
//     errorComponent: {
//       template: '<span>error</span>'
//     },
//     delay: 200,
//     timeout: 3000,
//     suspensible: true
//   })
// )
const attrs = useAttrs()

// console.log(svg)
//  return h('span', {...context.attrs, class: 'common-icon', }, [
//     h(svg, [h(svg)]),
//   ]);
// const Icon = computed(() => {
//   const svg = require(`../assets/icons/${props.name}.svg`).default
//   return h('span', { class: `common-icon ${attrs.class}` }, [
//     h(svg, { class: 'h-[inherit] w-[inherit]' }, [h(svg)])
//   ])
// })

const render = () => {
  return h('div', [])
}
// const jsxNode = () => {
//   return <div> text </div>
// }

const svg = ref()
// const svgRaw = await fetch(`../assets/icons/${props.name}.svg?raw`)
// console.log(svgRaw.body)

await fetch(`../assets/icons/${props.name}.svg?raw`)
  .then((response) => {
    console.log(response.json())

    // return response.json(); // As a function call
  })
  .then((data) => {
    console.log(data)
  })

// svg.value = svgRaw.data.value

onMounted(async () => {

  // const svg = require(`../assets/icons/${props.name}.svg`).default
  // svg.value = defineAsyncComponent(() => import(`../assets/icons/${props.name}.svg?raw`))
  // const svg = await import(`../assets/icons/${props.name}.svg`)
})

</script>

<template>
  <div>
    <i
      class="base-link__icon"
      v-html="svg"
    />
    <render />
    <!-- <jsxNode /> -->
  </div>
</template>
