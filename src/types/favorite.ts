export interface Favorite {
  id: string;
  title: string;
  url: string;
  description: string;
  type: FavoriteType;
  tags: string[];
  createdAt: Date;
}

type FavoriteType = 'articles' | 'inspiration' | 'sites' | 'tutorials';
