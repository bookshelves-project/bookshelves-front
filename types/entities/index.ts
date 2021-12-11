import { Author } from '..'

export interface Cover {
  thumbnail?: string;
  og?: string;
  simple?: string;
  original?: string;
  color?: string;
}

export interface TagMeta {
  slug?: string;
  author?: string;
  show?: string;
  books?: string;
}

export interface Tag {
  name?: string;
  type?: string;
  count?: null;
  firstChar?: null;
  meta?: TagMeta;
}

export interface Entity {
  title?: string;
  name?: string;
  authors?: Author[];
  cover?: Cover;
  language?: string;
}
