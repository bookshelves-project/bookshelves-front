import { BookMeta } from './book'
import { Author, Cover } from './shared'

export interface Entity {
  title?: string;
  name?: string;
  authors?: Author[];
  cover?: Cover;
  language?: string;
}
