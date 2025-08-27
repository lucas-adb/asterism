import { Header } from '@/components/header';
import { Hero } from '@/components/hero';

export function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <div className="px-4 py-8 container mx-auto">
        <h1 className="text-center">Home Page</h1>
      </div>
    </div>
  );
}
