import Vue from 'vue'
// https://github.com/mercs600/vue2-perfect-scrollbar
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

const config = {
  options: {
    wheelSpeed: 2,
    useBothWheelAxes: true,
  },
}
Vue.use(PerfectScrollbar, config)
