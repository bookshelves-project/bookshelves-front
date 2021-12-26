import { Author } from '..'
import { CommentData } from './comment'
import { Cover, Tag } from '.'

export interface BookMeta {
  slug: string
  author: string
  show: string
}

export interface BookSerie {
  title: string
  meta: BookMeta
}

export interface Epub {
  name: string;
  size: string;
  path: string;
  download: string;
}

export interface GoogleBook {
  previewLink?: null;
  buyLink?: null;
  createdAt?: Date;
}

export interface Identifier {
  isbn?: null;
  isbn13?: string;
  doi?: null;
  amazon?: null;
  google?: string;
}

export interface Book {
  title: string;
  meta: BookMeta;
  authors: Author[];
  summary?: string;
  language: string;
  publishDate?: Date;
  cover?: Cover;
  volume?: number;
  serie?: BookSerie;
  description?: string;
  identifier?: Identifier;
  pageCount?: string;
  maturityRating?: string;
  publisher?: string;
  tags?: Tag[];
  genres?: Tag[];
  epub: Epub;
  webreader?: string;
  googleBook?: GoogleBook;
  isFavorite?: boolean;
  comments?: CommentData[];
}
