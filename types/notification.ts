export enum NotificationType {
  success = 'success',
  warning = 'warning',
  error = 'error',
  information = 'information',
  default = 'default',
}

// export interface Notification {
//   title: string,
//   text: string,
//   type: NotificationType
// }

export class Notification {
  title: string
  text?: string
  type?: NotificationType
  date?: Date
  id?: string

  constructor(title: string, text?: string, type?: NotificationType, date?: Date, id?: string) {
    this.title = title
    this.text = text || ''
    this.type = type || NotificationType.default
    this.date = new Date()
    this.id = Math.random().toString(36).substr(2)
  }
}
