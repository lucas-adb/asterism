export interface Favorite {
  id: string;
  title: string;
  url: string;
  description: string;
  type: FavoriteType;
  tags: Tag[];
  created_at: string;
  updated_at: string;
}

export interface Tag {
  name: string;
  id: string;
  created_at: string;
  updated_at: string;
}

export type FavoriteType =
  | 'ARTICLES'
  | 'INSPIRATIONS'
  | 'SITES'
  | 'TUTORIALS'
  | 'TOOLS';

export type FavoriteBody = {
  title: string;
  description: string;
  url: string;
  type: FavoriteType;
  tags: string[];
};

export type FavoritesFilters = {
  page?: number;
  limit?: number;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  type?: string;
  tags?: string[];
};
