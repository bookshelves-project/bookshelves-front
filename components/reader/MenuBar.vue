<template>
  <div class="fixed z-50 top-0 right-0">
    <transition name="slide-up">
      <div
        v-show="isTitleAndMenuShow"
        class="menu-wrapper"
        :class="{ 'hide-box-shadow': isSettingShow || !isTitleAndMenuShow }"
      >
        <div class="icon-wrapper">
          <span class="icon-menu icon" @click="showSetting(3)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress icon" @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright icon" @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-a icon" @click="showSetting(0)">A</span>
        </div>
      </div>
    </transition>

    <transition name="slide-up">
      <div v-show="isSettingShow" class="setting-wrapper">
        <div v-if="showTag == 0" class="setting-font-size">
          <div
            class="preview"
            :style="{ fontSize: fontSizeList[0].fontSize + 'px' }"
          >
            A
          </div>
          <div class="select">
            <div
              v-for="(item, index) in fontSizeList"
              :key="index"
              class="select-wrapper"
              @click="setFontSize(item.fontSize)"
            >
              <div class="line"></div>
              <div class="point-wrapper">
                <div v-show="defaultFontSize == item.fontSize" class="point">
                  <div class="small-point"></div>
                </div>
              </div>
              <div class="line"></div>
            </div>
          </div>
          <div
            class="preview"
            :style="{
              fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px',
            }"
          >
            A
          </div>
        </div>
        <div v-else-if="showTag == 1" class="setting-theme">
          <div
            v-for="(item, index) of themeList"
            :key="index"
            class="setting-theme-item"
            @click="setTheme(index)"
          >
            <div
              class="preview"
              :style="{ background: item.style.body.background }"
              :class="{ 'no-border': item.style.body.background !== '#fff' }"
            ></div>
            <div class="text" :class="{ selected: defaultTheme == index }">
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="setting-progress">
          <div class="progress-wrapper">
            <input
              ref="progress"
              type="range"
              class="progress"
              max="100"
              min="0"
              step="1"
              :value="progress"
              :disabled="!bookAvailable"
              @change="onProgressChange($event.target.value)"
              @input="onProgressInput($event.target.value)"
            />
            <!-- input拖动的时候-百分比变化 -->
            <!-- change-松手的时候 -->
          </div>
          <div class="text-wrapper">
            <span>{{ bookAvailable ? progress + '%' : '加载中...' }}</span>
          </div>
        </div>
      </div>
    </transition>

    <content-view
      v-show="showContent"
      :navigation="navigation"
      :book-available="bookAvailable"
      @jumpTo="jumpTo"
    >
    </content-view>

    <transition name="fade">
      <div v-show="showContent" class="content-mask" @click="hideContent"></div>
    </transition>
  </div>
</template>

<script>
import ContentView from './Content'
export default {
  name: 'MenuBar',
  components: {
    ContentView,
  },

  props: {
    isTitleAndMenuShow: {
      type: Boolean,
      default: false,
    },
    fontSizeList: Array,
    defaultFontSize: Number,
    themeList: Array,
    defaultTheme: Number,
    bookAvailable: Boolean,
    navigation: Object,
  },

  data() {
    return {
      isSettingShow: true,
      showTag: 0,
      progress: 0,
      showContent: true,
    }
  },

  methods: {
    showSetting(tag) {
      this.showTag = tag
      // 等于3要唤起目录面板
      if (tag === 3) {
        this.isSettingShow = false
        this.showContent = true
      } else {
        this.isSettingShow = true
      }
    },
    setFontSize(fontSize) {
      this.$emit('setFontSize', fontSize)
    },
    setTheme(index) {
      this.$emit('setTheme', index)
    },
    // 拖动进度条时触发事件
    onProgressInput(progress) {
      this.progress = progress
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
    },
    // 进度条松开后触发事件，根据进度条数值跳转到指定位置
    onProgressChange(progress) {
      this.$emit('onProgressChange', progress)
    },
    jumpTo(href) {
      this.$emit('jumpTo', href)
    },
    hideSetting() {
      // this.isSettingShow = false
    },
    hideContent() {
      // this.showContent = false
    },
  },
}
</script>
