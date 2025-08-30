import type { FavoriteBody, FavoritesFilters } from '@/types/favorite.types';
import { api } from './client';

export const favoritesApi = {
  getAll: async (filters: FavoritesFilters) => {
    const { type, ...otherFilters } = filters;

    const params = {
      ...otherFilters,
      ...(type && type !== 'ALL' && { type }),
    };

    const response = await api.get('/favorites', { params });
    return response.data;
  },
  create: async (favorite: FavoriteBody) => {
    const response = await api.post('/favorite', favorite);
    return response.data;
  },
  update: async (id: string, favorite: FavoriteBody) => {
    const response = await api.put(`/favorite/${id}`, favorite);
    return response.data;
  },
  delete: async (id: string) => await api.delete(`/favorite/${id}`),
};
