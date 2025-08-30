import type { FavoriteBody, FavoritesFilters } from '@/types/favorite.types';
import { api } from './client';

export const favoritesApi = {
  getAll: (filters: FavoritesFilters) => {
    const { type, ...otherFilters } = filters;

    const params = {
      ...otherFilters,
      ...(type && type !== 'ALL' && { type }),
    };

    return api.get('/favorites', { params });
  },
  create: (favorite: FavoriteBody) => api.post('/favorite', favorite),
  update: (id: string, favorite: FavoriteBody) =>
    api.put(`/favorite/${id}`, favorite),
  delete: (id: string) => api.delete(`/favorite/${id}`),
};
