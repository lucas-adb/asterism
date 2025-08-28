import {
  createFavorite,
  deleteFavorite,
  editFavorite,
  getFavorites,
} from '@/api/favorites';
import type { CreateFavoriteBody } from '@/types/favorite';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useFavorites({ token }: { token?: string }) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['get-favorites'],
    queryFn: () => {
      if (!token) throw new Error('No token found');
      return getFavorites(token);
    },
    enabled: !!token,
  });

  const createMutation = useMutation({
    mutationFn: (favorite: CreateFavoriteBody) => {
      if (!token) throw new Error('No token found');
      return createFavorite(favorite, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-favorites'] });
    },
  });

  const updatedMutation = useMutation({
    mutationFn: ({
      id,
      favorite,
    }: {
      id: string;
      favorite: CreateFavoriteBody;
    }) => {
      if (!token) throw new Error('No token found');
      return editFavorite(id, favorite, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-favorites'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      if (!token) throw new Error('No token found');
      return deleteFavorite(id, token);
    },
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
