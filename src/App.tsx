import { SearchIcon } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

function App() {
  return (
    <div className="min-h-screen">
      <header className="px-4 py-8 container mx-auto">
        <h1 className="font-bold text-2xl cursor-pointer">✨ Asterism</h1>
      </header>

      <div>
        <main className="px-4 py-8 container mx-auto text-center">
          <div className="px-3 py-1 border mx-auto rounded-full inline-flex mb-4">
            <p className="text-sm font-medium">Version 1.0.b</p>
          </div>
          <h1 className="mx-auto text-5xl md:text-6xl">
            Capture the stars of the web.
            <br />
            Organize them into your own galaxy.
          </h1>
        </main>
      </div>

      <div className="px-4 py-8 container mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1/2">
            <SearchIcon className="h-4 w-4 absolute left-3 inset-y-0 my-auto text-muted-foreground" />
            <Input className="pl-10" placeholder="Search favorites..." />
          </div>
          <Button>Save favorite</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
