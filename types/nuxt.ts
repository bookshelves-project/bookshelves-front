import { Query } from '.'
type Dictionary<T> = { [key: string]: T }

export interface Route {
    name: string,
    params?: Dictionary<string|undefined>,
    query?: Query
}
