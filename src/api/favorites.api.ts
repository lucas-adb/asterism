import type { FavoriteBody, FavoritesFilters } from '@/types/favorite.types';
import { api } from './client';

export async function getFavorites(filters: FavoritesFilters) {
  const { type, ...otherFilters } = filters;

  const params = {
    ...otherFilters,
    ...(type && type !== 'ALL' && { type }),
  };

  const { data } = await api.get('/favorites', { params });
  return data;
}

export async function createFavorite(favorite: FavoriteBody) {
  await api.post('/favorite', favorite);
}

export async function editFavorite(id: string, favorite: FavoriteBody) {
  await api.put(`/favorite/${id}`, favorite);
}

export async function deleteFavorite(id: string) {
  await api.delete(`/favorite/${id}`);
}
