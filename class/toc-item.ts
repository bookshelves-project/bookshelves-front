export class TocItem {
  text?: string
  level?: number
  id?: string
  parent?: TocItem
  children?: TocItem[]

  constructor(
    text?: string,
    level?: number,
    id?: string,
    parent?: TocItem,
    children?: []
  ) {
    this.text = text
    this.level = level
    this.id = id
    this.parent = parent
    this.children = children
  }
}
