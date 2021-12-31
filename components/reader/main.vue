<template>
  <div class="flex flex-col">
    <div class="flex absolute bottom z-50">
      <div id="prev" class="btn btn-sm">prev</div>
      <div id="next" class="btn btn-sm ml-2">NEXT</div>
    </div>
    <div id="area" class="text-white" />
  </div>
</template>

<script setup>
import ePub from 'epubjs'

const book = ref(null)
const DOWNLOAD_URL = 'https://s3.amazonaws.com/moby-dick/OPS/package.opf'

const showEpub = () => {
  const currentSectionIndex = 12
  const book = ePub(DOWNLOAD_URL)
  const rendition = book.renderTo('area', {
    // manager: 'continuous',
    flow: 'scrolled-doc',
    width: '100%',
    height: '100vh',
  })
  rendition.display(currentSectionIndex)
  rendition.themes.default({
    body: { 'column-count': 4 },
    h2: {
      'font-size': '32px',
      color: 'purple',
    },
    p: {
      margin: '10px',
      color: 'currentColor',
      'text-align': 'left',
    },
  })
  const keyListener = function (e) {
    // Left Key
    if ((e.keyCode || e.which) === 37) {
      rendition.prev()
    }

    // Right Key
    if ((e.keyCode || e.which) === 39) {
      rendition.next()
    }
  }
  rendition.on('keyup', keyListener)
  document.addEventListener('keyup', keyListener, false)

  rendition.on('rendered', function (section) {
    // const title = document.getElementById('title')

    const next = document.getElementById('next')
    next.addEventListener(
      'click',
      function (e) {
        rendition.next()
        e.preventDefault()
      },
      false
    )

    const prev = document.getElementById('prev')
    prev.addEventListener(
      'click',
      function (e) {
        rendition.prev()
        e.preventDefault()
      },
      false
    )

    // const nextSection = section.next()
    // const prevSection = section.prev()
    // const current = book.navigation.get(section.href)

    // if (current) {
    //   title.textContent = current.label
    // }

    // if (nextSection) {
    //   next.textContent = '›'
    // } else {
    //   next.textContent = ''
    // }
    //
    // if (prevSection) {
    //   prev.textContent = '‹'
    // } else {
    //   prev.textContent = ''
    // }
  })

  rendition.themes.register('dark', 'themes.css')
  rendition.themes.register('light', 'themes.css')

  rendition.themes.select('dark')
  rendition.themes.fontSize('100%')
}

onMounted(() => {
  showEpub()
})
</script>
