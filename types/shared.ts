export interface AuthorMeta {
  slug?: string
  show?: string
}

export interface Author {
  name?: string
  meta?: AuthorMeta
}

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
