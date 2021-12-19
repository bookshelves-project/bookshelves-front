import { CommentData } from './comment'
import { Cover } from '.'

export interface AuthorMeta {
  slug?: string;
  show?: string;
  books?: string;
  series?: string;
}

export interface Author {
  name?: string;
  meta: AuthorMeta;
  lastname?: string;
  firstname?: string;
  cover?: Cover;
  count?: number;
  description?: string;
  link?: string;
  size?: string;
  download?: string;
  isFavorite?: boolean;
  comments?: CommentData[];
}
