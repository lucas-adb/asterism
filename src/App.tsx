import { Header } from './components/header';
import { Hero } from './components/hero';
import { NoFavoritesFound } from './components/no-favorites-found';
import { Input } from './components/ui/input';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { favoritesMock } from './mocks/favorites-mock';
import { useState } from 'react';
import { FavoriteCard } from './components/favorite-card';
import type { Favorite } from './types/favorite';
import { AddFavorite } from './components/add-favorite';

function App() {
  const [favorites, setFavorites] = useState(favoritesMock);

  const addFavorite = (newFavorite: Omit<Favorite, 'id' | 'createdAt'>) => {
    const favorite: Favorite = {
      ...newFavorite,
      id: Date.now().toString(),
      createdAt: new Date(),
    };

    setFavorites((prev) => [favorite, ...prev]);
  };

  const deleteFavorite = (newFavoriteId: string) => {
    const favorite = favorites.find((f) => f.id === newFavoriteId);

    if (!favorite) {
      return;
    }

    setFavorites((prev) => prev.filter((f) => f.id !== favorite.id));
  };

  const editFavorite = (newFavorite: Omit<Favorite, 'createdAt'>) => {
    const newFavorites = favorites.map((f) => {
      if (f.id === newFavorite.id) {
        f = { ...f, ...newFavorite };
      }

      return f;
    });

    setFavorites(newFavorites);
  };

  return (
    <div className="min-h-screen">
      <Header />

      <Hero />

      <div className="px-4 py-8 container mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1/2">
            <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 inset-y-0 my-auto text-muted-foreground" />
            <Input className="pl-10" placeholder="Search favorites..." />
          </div>
          <AddFavorite onAdd={addFavorite} />
        </div>
      </div>

      {favorites.length > 0 ? (
        <div className="px-4 py-8 container mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid gap-4 auto-rows-fr">
          {favorites.map((favorite) => {
            return (
              <FavoriteCard
                key={favorite.id}
                favorite={favorite}
                onDelete={deleteFavorite}
                onEdit={editFavorite}
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

export default App;
