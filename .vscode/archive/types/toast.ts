declare type ToastAuto = 'success' | 'error'

declare type ToastType =
  | 'success'
  | 'warning'
  | 'error'
  | 'information'
  | 'default'

declare interface Toast {
  title: string
  text?: string
  type?: ToastType
  date?: Date
  id?: string
}
