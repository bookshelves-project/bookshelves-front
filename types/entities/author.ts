import { CommentData } from './comment'
import { Cover } from '.'

export interface AuthorMeta {
  entity: string
  slug?: string;
  show?: string;
  books?: string;
  series?: string;
}

export interface AuthorCount {
  books?: number;
  series?: number;
}

export interface Author {
  name?: string;
  meta: AuthorMeta;
  lastname?: string;
  firstname?: string;
  cover?: Cover;
  count?: AuthorCount;
  description?: string;
  link?: string;
  size?: string;
  download?: string;
  isFavorite?: boolean;
  comments?: CommentData[];
}
