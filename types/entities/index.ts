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

export interface EntityMeta {
  entity?: string;
  author?: string;
  slug?: string;
  show?: string;
}

export interface Entity {
  meta: EntityMeta;
  title?: string;
  name?: string;
  authors?: Author[];
  serie?: string;
  language?: string;
  volume?: number;
  cover?: Cover;
  firstChar?: null;
}
