import { Author, Cover, Tag } from './shared'

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
  name?: string;
  size?: string;
  download?: string;
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
  publishDate?: null;
  cover?: Cover;
  volume?: number;
  serie?: BookSerie;
  description?: null;
  identifier?: Identifier;
  pageCount?: null;
  maturityRating?: null;
  publisher?: null;
  tags?: Tag[];
  genres?: any[];
  epub?: Epub;
  webreader?: string;
  googleBook?: GoogleBook;
  isFavorite?: boolean;
  comments?: any[];
}
