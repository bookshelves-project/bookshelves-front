import { Author, Cover, Tag } from './shared'

export interface SerieMeta {
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
  genres?: any[];
  download?: string;
  size?: string;
  isFavorite?: boolean;
  comments?: any[];
}
