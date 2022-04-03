export class Toast {
  title: string
  text?: string
  type?: ToastType
  date?: Date
  id?: string

  constructor(
    title: string,
    text?: string,
    type?: ToastType,
    date?: Date,
    id?: string
  ) {
    this.title = title
    this.text = text || ''
    this.type = type || 'default'
    this.date = new Date()
    this.id = Math.random().toString(36).substr(2)
  }
}
