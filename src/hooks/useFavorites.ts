import {
  createFavorite,
  deleteFavorite,
  editFavorite,
  getFavorites,
} from '@/api/favorites';
import type { CreateFavoriteBody } from '@/types/favorite';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useFavorites({ token }: { token?: string | null }) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['get-favorites'],
    queryFn: () => getFavorites(token ?? null),
    enabled: !!token,
  });

  const createMutation = useMutation({
    mutationFn: (favorite: CreateFavoriteBody) =>
      createFavorite(favorite, token ?? null),
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
    }) => editFavorite(id, favorite, token ?? null),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-favorites'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteFavorite(id, token ?? null),
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
