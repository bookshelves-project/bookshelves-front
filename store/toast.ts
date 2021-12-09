import type { GetterTree, ActionTree, MutationTree, Commit, Dispatch, Module } from 'vuex'
import type { RootState } from './index'
import { Toast } from '~/types'

export const namespace = 'toast'

export interface ToastState {
  toasts: Toast[]
}

export const state = () => ({
  toasts: [] as Toast[]
})

export const getterType = {
  GET_TOAST: 'getToast'
}

export const getters: GetterTree<Toast, RootState> = {
  [getterType.GET_TOAST]: state => state
}

export const mutationType = {
  DISPLAY_TOAST: 'displayToast',
  REMOVE_TOAST: 'removeToast',
  CLEAR_ALL_TOASTS: 'clearAllToasts'
}

export const mutations: MutationTree<ToastState> = {
  displayToast(state, payload: Toast) {
    state.toasts = [...state.toasts, { ...payload }]
  },
  removeToast(state, payload: Toast) {
    let toasts = [...state.toasts]
    toasts = toasts.filter(toast => toast.id !== payload.id)

    state.toasts = [...toasts]
  },
  clearAllToasts(state) {
    while (state.toasts.length) {
      state.toasts.pop()
    }
  }
}

export const actionType = {
  DISPLAY_TOAST: 'displayToast',
  REMOVE_TOAST: 'removeToast',
  CLEAR_ALL_TOASTS: 'clearAllToasts'
}

export const actions: ActionTree<Toast, RootState> = {
  async [actionType.DISPLAY_TOAST]({ dispatch, commit }: { dispatch: Dispatch, commit: Commit }, payload: Toast) {
    commit(mutationType.DISPLAY_TOAST, payload)
    await new Promise<void>(
      (resolve, reject) => setTimeout(() => resolve(), 4000))
    dispatch(mutationType.REMOVE_TOAST, payload)
  },
  [actionType.REMOVE_TOAST]({ commit }: { commit: Commit }, payload: Toast) {
    commit(mutationType.REMOVE_TOAST, payload)
  },
  [actionType.CLEAR_ALL_TOASTS]({ commit }: { commit: Commit }) {
    commit(mutationType.CLEAR_ALL_TOASTS)
  }
}
