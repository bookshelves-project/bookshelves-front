import type { Context } from '@nuxt/types'
import type { GetterTree, ActionTree, MutationTree, Commit, Dispatch, Module } from 'vuex'
import type { RootState } from './index'
import { Notification, NotificationType } from '~/types'

export const namespace = 'notification'

export interface NotificationState {
  notifications: Notification[]
}

export const state = () => ({
  notifications: [] as Notification[]
})

export const getterType = {
  GET_NOTIFICATION: 'getNotification'
}

export const getters: GetterTree<Notification, RootState> = {
  [getterType.GET_NOTIFICATION]: state => state
}

export const mutationType = {
  DISPLAY_NOTIFICATION: 'displayNotification',
  REMOVE_NOTIFICATION: 'removeNotification',
  CLEAR_ALL_NOTIFICATIONS: 'clearAllNotifications'
}

export const mutations: MutationTree<NotificationState> = {
  displayNotification(state, payload: Notification) {
    state.notifications = [...state.notifications, { ...payload }]
  },
  removeNotification(state, payload: Notification) {
    let notifications = [...state.notifications]
    notifications = notifications.filter(notification => notification.id !== payload.id)

    state.notifications = [...notifications]
  },
  clearAllNotifications(state) {
    while (state.notifications.length) {
      state.notifications.pop()
    }
  }
}

export const actionType = {
  DISPLAY_NOTIFICATION: 'displayNotification',
  REMOVE_NOTIFICATION: 'removeNotification',
  CLEAR_ALL_NOTIFICATIONS: 'clearAllNotifications'
}

export const actions: ActionTree<Notification, RootState> = {
  async [actionType.DISPLAY_NOTIFICATION]({ dispatch, commit }: { dispatch: Dispatch, commit: Commit }, payload: Notification) {
    commit(mutationType.DISPLAY_NOTIFICATION, payload)
    await new Promise<void>(
      (resolve, reject) => setTimeout(() => resolve(), 4000))
    dispatch(mutationType.REMOVE_NOTIFICATION, payload)
  },
  [actionType.REMOVE_NOTIFICATION]({ commit }: { commit: Commit }, payload: Notification) {
    commit(mutationType.REMOVE_NOTIFICATION, payload)
  },
  [actionType.CLEAR_ALL_NOTIFICATIONS]({ commit }: { commit: Commit }) {
    commit(mutationType.CLEAR_ALL_NOTIFICATIONS)
  }
}
