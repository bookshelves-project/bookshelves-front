// export interface UserDataMeta {
//   type: string
//   entity: 'author' | 'book' | 'serie'
//   author: string
//   slug: string
// }

export interface UserData {
  meta: any // UserDataMeta
  title: string
  text?: string
  cover?: string
  color?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface Favoritable extends UserData { }

export interface Review extends UserData {
  id: number
  text: string
  rating?: number
  user: any // User
}
