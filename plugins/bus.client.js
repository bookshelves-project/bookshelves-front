/* eslint-disable no-unused-vars */
// import Vue from 'vue'
// import { mapGetters, mapMutations } from 'vuex'

// export default (ctx, inject) => {
//   /**
//    *
//    * @param {{title: string, text: string, type: string}} notifEntity
//    */
//   // const notification = (notifEntity) => {
//   //   const types = {
//   //     SUCCESS: 'success',
//   //     WARNING: 'warning',
//   //     ERROR: 'error',
//   //     INFORMATION: 'information',
//   //     DEFAULT: 'information',
//   //   }
//   //   const currentType = notifEntity.type.toUpperCase()
//   //   const type = types[currentType] || types.DEFAULT
//   //   const key = () => Math.random(0).toString(36).substr(2)

//   //   const list = [...store.state.notification.list]
//   //   const notification = {
//   //     title: `${notifEntity.title} ${key()}`,
//   //     text: notifEntity.text,
//   //     type,
//   //     key: key(),
//   //   }
//   //   list.push(notification)
//   //   store.commit('notification/setList', list)
//   // }
//   // Vue.prototype.$notification = notification
//   inject('bus', new Vue())
// }

import Vue from 'vue'
export const EventBus = new Vue()

// Use Prototype Pattern
/**
Object.defineProperties(Vue.prototype, {
    $eventBus: {
        get: function () {
            return EventBus;
        }
    }
}
export default {
  created() {
    this.$EventBus.$on('open-alert', this.openAlert)
  }
}
**/
