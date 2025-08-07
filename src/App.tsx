import { Header } from './components/header';
import { Hero } from './components/hero';
import { NoFavoritesFound } from './components/no-favorites-found';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';

function App() {
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
          <Button>Save favorite</Button>
        </div>
      </div>

      <NoFavoritesFound />
    </div>
  );
}

export default App;
