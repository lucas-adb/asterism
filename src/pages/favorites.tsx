import { Header } from '../components/layout/header';
import { Hero } from '../components/layout/hero';
import { NoFavoritesFound } from '../components/favorites/no-favorites-found';
import { Input } from '../components/ui/input';
import { MagnifyingGlassIcon, SpinnerGapIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { FavoriteCard } from '../components/favorites/favorite-card';
import type {
  FavoriteBody,
  Favorite,
  FavoriteType,
} from '../types/favorite.types';
import { AddFavorite } from '../components/favorites/add-favorite';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from '../components/ui/select';
import { SelectValue } from '@radix-ui/react-select';
import { useFavorites } from '@/hooks/useFavorites';
import { useDebounce } from '@/hooks/useDebounce';

function LoadingState() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <div className="flex justify-center">
        <SpinnerGapIcon className="h-8 w-8 animate-spin" />
      </div>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <div className="flex justify-center">
        <h1 className="text-center">Ops, something bad happened 😔</h1>
      </div>
    </div>
  );
}

export function Favorites() {
  // todo: use states instead o pure variables
  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(10);
  // const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const page = 1;
  const limit = 10;
  const sortOrder = 'desc';

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
    filters: {
      page,
      limit,
      sortOrder,
      search: debouncedQuery,
      type,
    },
  });

  const handleAddFavorite = (newFavorite: FavoriteBody) => {
    createMutation(newFavorite);
  };

  const handleDeleteFavorite = (id: string) => {
    deleteMutation(id);
  };

  const handleEditFavorite = (id: string, favorite: FavoriteBody) => {
    updateMutation({ id, favorite });
  };

  // useEffect(() => {
  //   if (!user && !token) {
  //     navigate('/login');
  //   }
  // }, [navigate, token, user]);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;

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
