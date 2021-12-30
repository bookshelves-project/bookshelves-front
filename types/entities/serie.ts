import { Author } from '..'
import { CommentData } from './comment'
import { Cover, Tag } from '.'

export interface SerieMeta {
  entity: string
  slug: string;
  author: string;
  show: string;
  books?: string;
}

export interface Serie {
  title?: string;
  meta: SerieMeta;
  cover?: Cover;
  language: string;
  authors?: Author[];
  count?: number;
  description?: string;
  link: string;
  tags?: Tag[];
  genres?: Tag[];
  download?: string;
  size?: string;
  isFavorite?: boolean;
  comments?: CommentData[];
}
