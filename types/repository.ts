// import { NuxtAxiosInstance } from '@nuxtjs/axios'
// import { ApiResponse } from './ApiResponse'
// import { Book } fro./old/books/bookks/book'

// export enum RepositoryTypeEnum {
//   Book = <any>'Book',
//   Serie = <any>'Serie',
//   Author = <any>'Author',
// }

// export enum ModelEnum {
//   find = <any>'find',
//   findOne = <any>'findOne',
// }

// class Route {
//   endpoint?: string
//   param1?: string
//   param2?: string
//   constructor(endpoint = 'books', param1?: string, param2?: string) {
//     this.endpoint = endpoint
//     this.param1 = param1
//     this.param2 = param2
//   }
// }
// export abstract class Model {
//   endpoint: string
//   type: ModelEnum
//   http: NuxtAxiosInstance
//   query: string

//   constructor(endpoint: string, type: ModelEnum) {
//     this.endpoint = endpoint
//     this.type = type
//   }

//   public find() {}
// }

// export class BookRepository extends Model {
//   constructor(type: ModelEnum) {
//     super('/books', type)
//   }

//   public find(): Promise<any> {
//     return this.http
//       .$get(`${this.endpoint}?${this.query}`)
//       .then((e: ApiResponse) => e.data)
//   }
// }

// export const routes: Route[] = [new Route('books')]
