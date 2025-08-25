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
  | 'articles'
  | 'inspirations'
  | 'sites'
  | 'tutorials'
  | 'tools';
