import { Header } from '../components/header';
import { Hero } from '../components/hero';
import { NoFavoritesFound } from '../components/no-favorites-found';
import { Input } from '../components/ui/input';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { FavoriteCard } from '../components/favorite-card';
import type {
  CreateFavoriteBody,
  Favorite,
  FavoriteType,
} from '../types/favorite';
import { AddFavorite } from '../components/add-favorite';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from '../components/ui/select';
import { SelectValue } from '@radix-ui/react-select';
import { useNavigate } from 'react-router';
import { useFavorites } from '@/hooks/useFavorites';
import { useDebounce } from '@/hooks/useDebounce';

export function Favorites() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // todo: add buttons to manipulate pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // filter
  const [type, setType] = useState<FavoriteType | 'ALL'>('ALL');
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  // todo: add tags filter

  const {
    data,
    error,
    isLoading,
    createMutation,
    deleteMutation,
    updateMutation,
  } = useFavorites({
    token: token ?? undefined,
    filters: {
      page,
      limit,
      sortOrder,
      search: debouncedQuery,
      type,
    },
  });

  const handleAddFavorite = (newFavorite: CreateFavoriteBody) => {
    createMutation(newFavorite);
  };

  const handleDeleteFavorite = (id: string) => {
    deleteMutation(id);
  };

  const handleEditFavorite = (id: string, favorite: CreateFavoriteBody) => {
    updateMutation({ id, favorite });
  };

  useEffect(() => {
    if (error) {
      navigate('/login');
    }
  }, [error, navigate]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <div className="min-h-screen">
      <Header />

      <Hero />

      <div className="px-4 py-8 container mx-auto">
        <div className="flex flex-col sm:flex-row gap-2 mb-8">
          <div className="flex-1/2 flex gap-2">
            <div className="relative w-full">
              <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 inset-y-0 my-auto text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Search favorites..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
            </div>
            <Select
              onValueChange={(value) => setType(value as FavoriteType | 'ALL')}
              value={type}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Type</SelectLabel>
                  <SelectItem value="ALL">All</SelectItem>
                  <SelectItem value="SITES">Sites</SelectItem>
                  <SelectItem value="ARTICLES">Articles</SelectItem>
                  <SelectItem value="INSPIRATIONS">Inspiration</SelectItem>
                  <SelectItem value="TUTORIALS">Tutorials</SelectItem>
                  <SelectItem value="TOOLS">Tools</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <AddFavorite onAdd={handleAddFavorite} />
        </div>
      </div>

      {data?.favorites.length > 0 ? (
        <div className="px-4 py-8 container mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid gap-4 auto-rows-fr">
          {data?.favorites.map((favorite: Favorite) => {
            return (
              <FavoriteCard
                key={favorite.id}
                favorite={favorite}
                onDelete={handleDeleteFavorite}
                onEdit={handleEditFavorite}
              />
            );
          })}
        </div>
      ) : (
        <NoFavoritesFound />
      )}
    </div>
  );
}
