import { Header } from '../components/header';
import { Hero } from '../components/hero';
import { NoFavoritesFound } from '../components/no-favorites-found';
import { Input } from '../components/ui/input';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { useEffect, useMemo, useState } from 'react';
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

export function Favorites() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const {
    data,
    error,
    isLoading,
    createMutation,
    deleteMutation,
    updateMutation,
  } = useFavorites({
    token: token ?? undefined,
  });

  const [type, setType] = useState<FavoriteType | 'all'>('all');
  const [query, setQuery] = useState('');

  const handleAddFavorite = (newFavorite: CreateFavoriteBody) => {
    createMutation(newFavorite);
  };

  const handleDeleteFavorite = (id: string) => {
    deleteMutation(id);
  };

  const handleEditFavorite = (id: string, favorite: CreateFavoriteBody) => {
    updateMutation({ id, favorite });
  };

  // todo: remove to use the fetch with params
  const filteredFavorites = useMemo(() => {
    let result: Favorite[] = data?.favorites;

    if (query.length >= 3) {
      result = result.filter(
        (f) =>
          f.title.toLowerCase().includes(query.toLowerCase()) ||
          f.description.toLowerCase().includes(query.toLowerCase()) ||
          f.tags.some((t) => t.name.toLowerCase().includes(query.toLowerCase()))
      );
    }

    if (type !== 'all') {
      result = result.filter((f) => f.type === type);
    }

    return result;
  }, [data, query, type]);

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
          <div className="relative flex-1/2">
            <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 inset-y-0 my-auto text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder="Search favorites..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <AddFavorite onAdd={handleAddFavorite} />
          <Select
            onValueChange={(value) => setType(value as FavoriteType | 'all')}
            value={type}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Type</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="sites">Sites</SelectItem>
                <SelectItem value="articles">Articles</SelectItem>
                <SelectItem value="inspiration">Inspiration</SelectItem>
                <SelectItem value="tutorials">Tutorials</SelectItem>
                <SelectItem value="tools">Tools</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredFavorites.length > 0 ? (
        <div className="px-4 py-8 container mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid gap-4 auto-rows-fr">
          {filteredFavorites.map((favorite: Favorite) => {
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
