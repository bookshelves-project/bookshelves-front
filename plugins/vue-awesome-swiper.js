import Vue from 'vue'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'

import { Swiper as SwiperClass, Pagination, Mousewheel } from 'swiper/core'

// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'

SwiperClass.use([Pagination, Mousewheel])

Vue.use(getAwesomeSwiper(SwiperClass))
