import { Header } from './components/header';
import { Hero } from './components/hero';
import { NoFavoritesFound } from './components/no-favorites-found';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { favoritesMock } from './mocks/favorites-mock';
import { useState } from 'react';
import { FavoriteCard } from './components/favorite-card';

function App() {
  const [favorites, setFavorites] = useState(favoritesMock);

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
          <Button className="cursor-pointer">Save favorite</Button>
        </div>
      </div>

      {favorites.length > 0 ? (
        <div className="px-4 py-8 container mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid gap-4 auto-rows-fr">
          {favorites.map((favorite) => {
            return <FavoriteCard favorite={favorite} />;
          })}
        </div>
      ) : (
        <NoFavoritesFound />
      )}
    </div>
  );
}

export default App;
