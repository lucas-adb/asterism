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

export type CreateFavoriteBody = {
  title: string;
  description: string;
  url: string;
  type: FavoriteType;
  tags: string[];
};
