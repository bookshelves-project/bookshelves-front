<template>
  <div>
    <div
      class="fixed z-50 top-0 bg-gray-700 p-2 rounded-md text-white h-screen overflow-auto"
    >
      <app-button @click="prePage">Previous</app-button>
      <app-button @click="nextPage">Next</app-button>
      <input
        ref="progress"
        v-model="progress"
        type="range"
        max="100"
        min="0"
        step="1"
        :disabled="!bookAvailable"
        @change="onProgressChange(0, $event)"
        @input="onProgressInput(0, $event)"
      />
      <div>
        <div :style="{ fontSize: fontSizeList[0].fontSize + 'px' }">A</div>
        <div
          v-for="(item, index) in fontSizeList"
          :key="index"
          @click="setFontSize(item.fontSize)"
        >
          {{ item.fontSize }}
        </div>
      </div>
      <div>
        <div
          v-for="(item, index) of themeList"
          :key="index"
          @click="setTheme(index)"
        >
          <div
            class="h-16 w-20"
            :style="{ background: item.style.body.background }"
            :class="{ 'no-border': item.style.body.background !== '#fff' }"
          ></div>
          <div :class="{ selected: defaultTheme == index }">
            {{ item.name }}
          </div>
        </div>
      </div>
      <div>
        <span>{{ bookAvailable ? progress + '%' : 'load...' }}</span>
      </div>
      <reader-content
        v-if="bookAvailable"
        :navigation="navigation"
        :book-available="bookAvailable"
        @jumpTo="jumpTo"
      />
    </div>
    <div>
      <div id="read"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator'
import EpubjsEpub, {
  Book as EpubjsBook,
  Rendition as EpubjsRendition,
} from 'epubjs'
import type EpubjsNavigation from 'epubjs/types/navigation'
import type EpubjsLocations from 'epubjs/types/locations'
import type EpubjsThemes from 'epubjs/types/themes'
import { ApiEndpoint, Book } from '~/types'

@Component({
  async asyncData({ $repository, params }) {
    const api = await $repository(ApiEndpoint.Book).show<Book>([
      params.author,
      params.slug,
    ])

    return {
      bookEntity: api.data,
    }
  },
})
export default class ReaderAuthorSlug extends Vue {
  @Ref() readonly epubElement!: Element
  bookEntity!: Book
  bookFile!: any
  book!: EpubjsBook
  // ePub!: BookEpub
  rendition!: EpubjsRendition
  themes!: EpubjsThemes
  defaultFontSize = 16
  navigation!: EpubjsNavigation
  locations!: EpubjsLocations
  progress = 0
  jumpProgress = 0
  defaultTheme = 0
  showContent = true
  isTitleAndMenuShow = false
  bookAvailable = false
  themeList = [
    {
      name: 'default',
      style: {
        body: {
          color: '#000',
          background: '#fff',
          'column-count': 1,
        },
      },
    },
    {
      name: 'eye',
      style: {
        body: {
          color: '#000',
          background: '#ceeaba',
        },
      },
    },
    {
      name: 'night',
      style: {
        body: {
          color: '#fff',
          background: '#000',
        },
      },
    },
    {
      name: 'gold',
      style: {
        body: {
          color: '#000',
          background: 'rgb(241, 236, 226)',
        },
      },
    },
  ]

  fontSizeList = [
    { fontSize: 12 },
    { fontSize: 14 },
    { fontSize: 16 },
    { fontSize: 18 },
    { fontSize: 20 },
    { fontSize: 22 },
    { fontSize: 24 },
  ]

  async downloadEpub() {
    // this.bookFile = await this.$axios.$get(this.bookEntity.epub.download)
    // console.log(typeof this.bookFile)
  }

  tiggleShowTitleAndMenu() {
    this.isTitleAndMenuShow = !this.isTitleAndMenuShow
    // if (!this.isTitleAndMenuShow) {
    //   this.$refs.menubar.isSettingShow = false
    // }
  }

  setFontSize(fontSize: number) {
    this.defaultFontSize = fontSize
    if (this.themes) {
      this.themes.fontSize(fontSize + 'px')
    }
  }

  registerTheme() {
    this.themeList.forEach((theme) => {
      this.themes.register(theme.name, theme.style)
    })
  }

  setTheme(index: number) {
    this.defaultTheme = index
    this.themes.select(this.themeList[index].name)
  }

  async createEpub() {
    // const pathUrl = this.bookEntity.epub.path
    // const downloadUrl = '/books/2018_Book_AgileProcessesInSoftwareEngine.epub'
    const path =
      '/books/pierre_bottero_comme_association,_a_2_limites_obscures_de_la_magie,_les.epub'
    this.book = new EpubjsBook(path)
    this.rendition = this.book.renderTo('read', {
      width: window.innerWidth,
      height: window.innerHeight,
    })

    this.themes = this.rendition.themes
    this.setFontSize(this.defaultFontSize)
    this.registerTheme()
    this.setTheme(this.defaultTheme)

    await this.book.ready
    console.log('book ready')
    this.navigation = this.book.navigation
    this.locations = this.book.locations
    this.book.locations.generate(0)
    await this.rendition.display()
    this.onProgressChange(0)
    this.bookAvailable = true

    // this.book.ready
    //   .then(() => {
    //     this.navigation = this.book.navigation
    //     return this.book.locations.generate(0)
    //   })
    //   .then(() => {
    //     this.locations = this.book.locations
    //     this.rendition.display()
    //     this.bookAvailable = true
    //     this.onProgressChange(0)
    //   })
  }

  prePage() {
    if (this.rendition) {
      this.rendition.prev()
      this.refreshProgress()
    }
  }

  nextPage() {
    if (this.rendition) {
      this.rendition.next()
      this.refreshProgress()
    }
  }

  jumpTo(href: string) {
    this.rendition.display(href)
    this.refreshProgress()
  }

  async onProgressChange(progress = 0, event?: Event) {
    const value = event
      ? parseInt((event.target as HTMLInputElement).value)
      : progress

    const percentage = value / 100
    const location =
      percentage > 0 ? this.locations.cfiFromPercentage(percentage) : '0'

    if (this.rendition.location) {
      await this.rendition.display(location)
      // const cfi = this.rendition.location.start.cfi
      // const page = this.locations.locationFromCfi(cfi)
      // const currentProgress = page.toString()
      // const percentage = (progress / 100).toString()
      // console.log(percentage)
      // this.rendition.display(location.toString()).then(() => {
      //   this.refreshProgress()
      // })
    }
  }

  onProgressInput(progress = 0, event?: Event) {
    this.progress = event
      ? parseInt((event.target as HTMLInputElement).value)
      : progress
    if (this.$refs.progress instanceof HTMLElement) {
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
    }
  }

  refreshProgress() {
    if (this.rendition.location) {
      const cfi = this.rendition.location.start.cfi
      const page = this.locations.locationFromCfi(cfi)
      const progress = page.toString()
      const percentage = parseInt(progress) / 100
      console.log(percentage)
      this.progress = percentage
    }
  }

  created() {
    // this.downloadEpub()
    this.createEpub()
    // console.log(this.book)
  }
}
</script>

<style scoped></style>
