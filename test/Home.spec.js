import Vue from 'vue'
import { mount } from '@vue/test-utils'
import EntityCard from '@/components/blocks/entity-card'
// import { lazyload } from '@/plugins/test/vue-lazyload'
import Hero from '@/components/blocks/hero'
// import Home from '@/pages/index.vue'

// describe('Home', () => {
//   test('is a Vue instance', () => {
//     const wrapper = mount(Home, {
//       stubs: ['nuxt', 'nuxt-link', 'client-only', 'icon'],
//     })
//     expect(wrapper.vm).toBeTruthy()
//   })
// })

Vue.config.silent = true

describe('EntityCard', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(EntityCard, {
      // propsData: { temp },
      stubs: ['nuxt', 'nuxt-link', 'client-only'],
      directives: {
        // lazyload,
      },
    })

    expect(wrapper.vm).toBeTruthy()
  })
})

describe('Hero', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Hero, {
      // propsData: { temp },
      stubs: ['nuxt', 'nuxt-link', 'client-only'],
    })

    expect(wrapper.vm).toBeTruthy()
  })
})
