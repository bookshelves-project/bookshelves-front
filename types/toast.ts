export type ToastAuto = 'success' | 'error'

export type ToastType =
  | 'success'
  | 'warning'
  | 'error'
  | 'information'
  | 'default'

export interface Toast {
  title: string
  text?: string
  type?: ToastType
  date?: Date
  id?: string
}
