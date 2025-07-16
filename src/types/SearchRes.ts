import type { Movie } from './Movie';

export interface SearchResult {
  Search: Movie[];
  totalResults: string;
  Response: string;
}
