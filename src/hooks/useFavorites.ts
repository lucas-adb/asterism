import {
  createFavorite,
  deleteFavorite,
  editFavorite,
  getFavorites,
} from '@/api/favorites';
import { fetchWithRefresh } from '@/api/fetch-with-refresh';
import type { CreateFavoriteBody, FavoritesFilters } from '@/types/favorite';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export function useFavorites({
  token,
  filters = {},
}: {
  token?: string;
  filters?: FavoritesFilters;
}) {
  const queryClient = useQueryClient();
  const [accessToken, setAccessToken] = useState(token);

  // const query = useQuery({
  //   queryKey: ['get-favorites', filters],
  //   queryFn: () => {
  //     if (!token) throw new Error('No token found');
  //     return getFavorites(token, filters);
  //   },
  //   enabled: !!token,
  // });

  const query = useQuery({
    queryKey: ['get-favorites', filters],
    queryFn: async () => {
      if (!accessToken) throw new Error('No token found');
      const res = await fetchWithRefresh(
        (token) => getFavorites(token, filters),
        accessToken,
        (newToken) => {
          setAccessToken(newToken);
          localStorage.setItem('token', newToken);
        }
      );
      if (!res.ok) throw new Error('Request Error');
      return res.json();
    },
    enabled: !!accessToken,
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
