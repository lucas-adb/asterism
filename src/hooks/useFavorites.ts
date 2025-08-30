import {
  createFavorite,
  deleteFavorite,
  editFavorite,
  getFavorites,
} from '@/api/favorites.api';
import type { FavoriteBody, FavoritesFilters } from '@/types/favorite.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useFavorites({ filters = {} }: { filters?: FavoritesFilters }) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['get-favorites', filters],
    queryFn: () => getFavorites(filters),
  });

  const createMutation = useMutation({
    mutationFn: createFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-favorites'] });
    },
  });

  const updatedMutation = useMutation({
    mutationFn: ({ id, favorite }: { id: string; favorite: FavoriteBody }) =>
      editFavorite(id, favorite),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-favorites'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteFavorite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-favorites'] });
    },
  });

  return {
    data: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    createMutation: createMutation.mutate,
    deleteMutation: deleteMutation.mutate,
    updateMutation: updatedMutation.mutate,
  };
}
